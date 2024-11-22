import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import React from 'react';
import {ErrorBoundary} from "react-error-boundary";
import {HelmetProvider} from "react-helmet-async";
import {ToastContainer} from "react-toastify";


type AppProviderProps = {
    children: React.ReactNode
}

const queryClient = new QueryClient()


export const AppProvider = ({children}: AppProviderProps) => {
    return (
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <HelmetProvider>
                <QueryClientProvider client={queryClient}>
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                    {children}
                </QueryClientProvider>
            </HelmetProvider>
        </ErrorBoundary>
    )
}