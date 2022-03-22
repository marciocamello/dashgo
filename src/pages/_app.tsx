import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from "next/app"
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { AuthProvider } from '../contexts/AuthContext'
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContent'
import { queryClient } from '../services/queryClient'
import { theme } from '../styles/theme'

if (process.env.NODE_ENV === 'development') {
    //makeServer();
}

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ChakraProvider theme={theme}>
                    <SidebarDrawerProvider>
                        <Component {...pageProps} />
                    </SidebarDrawerProvider>
                </ChakraProvider>

                <ReactQueryDevtools initialIsOpen={false} />
            </AuthProvider>
        </QueryClientProvider>
    )
}

export default MyApp
