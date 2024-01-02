import { ChildrenProps } from '@/types';
import { Button, MantineProvider } from '@mantine/core';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const ErrorFallback = () => {
  return (
    <div role="alert">
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <Button
        className="mt-4"
        onClick={() => window.location.assign(window.location.origin)}
      >
        Refresh
      </Button>
    </div>
  );
};
const queryClient = new QueryClient();

export const MainProvider = ({ children }: ChildrenProps) => {
  return (
    <Suspense fallback="loading">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <MantineProvider>{children}</MantineProvider>
            <ReactQueryDevtools initialIsOpen />
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </Suspense>
  );
};