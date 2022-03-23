import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api } from "../services/apiClient";

type User = {
    name: string;
    email: string;
    permissions: string[];
    roles: string[];
}

type SignIngCredentials = {
    email: string;
    password: string;
}

type AuthContextData = {
    signIn: (credentials: SignIngCredentials) => Promise<void>;
    signOut: () => void;
    user: User;
    isAuthenticated: boolean;
}

type AuthProviderProps = {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut() {
    authChannel = new BroadcastChannel('auth');

    destroyCookie({}, 'dashgo.token');
    destroyCookie({}, 'dashgo.refreshToken');

    authChannel.postMessage({
        type: 'signOut'
    });

    Router.push('/');
}

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>(null);
    const isAuthenticated = !!user;

    useEffect(() => {
        authChannel = new BroadcastChannel('auth');

        authChannel.onmessage = (event) => {
            switch (event.data.type) {
                case 'signOut':
                    Router.push('/');
                    authChannel.close();
                    break;
                case 'signIn':
                    Router.push('/dashboard');
                    authChannel.close();
                default:
                    break;
            }
        }
    }, []);

    useEffect(() => {
        const { 'dashgo.token': token } = parseCookies();

        if (token) {

            api.get('/me').then(response => {

                const {
                    email,
                    name,
                    roles,
                    permissions
                } = response.data;

                setUser({
                    name,
                    email,
                    permissions,
                    roles
                });
            })
                .catch(() => {

                    signOut();
                });
        }

    }, [])

    const signIn = useCallback(async ({ email, password }: SignIngCredentials) => {
        try {
            const { data } = await api.post('/sessions', {
                email,
                password
            });

            const {
                token,
                refreshToken,
                name,
                roles,
                permissions
            } = data;

            setCookie(undefined, 'dashgo.token', token, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/'
            })

            setCookie(undefined, 'dashgo.refreshToken', refreshToken, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/'
            })

            setUser({
                name,
                email,
                permissions,
                roles
            });

            api.defaults.headers["Authorization"] = `Bearer ${token}`;

            Router.push('/dashboard');

            authChannel.postMessage({
                type: 'signIn'
            });
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            signIn,
            user,
            signOut,
            isAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export {
    AuthProvider,
    useAuth
};

