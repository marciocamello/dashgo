import decode from 'jwt-decode';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { destroyCookie, parseCookies } from "nookies";
import { AuthTokenError } from "../services/errors/AuthTokenError";
import { validateUserPermissions } from './validateUserPermissions';

type WithSSRAuthOptions = {
    permissions?: string[];
    roles?: string[];
}

export function withSSRAuth<P>(fn: GetServerSideProps<P>, options?: WithSSRAuthOptions): GetServerSideProps<P> {

    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

        const cookies = parseCookies(ctx);

        if (!cookies['dashgo.token']) {

            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }

        if (options) {

            const user = decode<{ permissions: string[], roles: string[] }>(cookies['dashgo.token']);
            const { roles, permissions } = options;

            const useHasValiderPermissions = validateUserPermissions({ user, roles, permissions });

            if (!useHasValiderPermissions) {
                return {
                    redirect: {
                        destination: '/dashboard',
                        permanent: false
                    }
                }
            }
        }

        try {
            
            return await fn(ctx);
        } catch (error) {

            if (error instanceof AuthTokenError) {

                destroyCookie(ctx, 'dashgo.token');
                destroyCookie(ctx, 'dashgo.refreshToken');

                return {
                    redirect: {
                        destination: '/',
                        permanent: false
                    }
                }
            }
        }
    }
}