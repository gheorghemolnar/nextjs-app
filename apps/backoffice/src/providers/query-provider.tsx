import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const displayReactQueryDevtools = () => {
    if (import.meta.env.NODE_ENV === 'development') {
        return <ReactQueryDevtools />;
    }
};

export const queryClient = new QueryClient();

export const ReactQueryClientProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {displayReactQueryDevtools()}
        </QueryClientProvider>
    );
};
