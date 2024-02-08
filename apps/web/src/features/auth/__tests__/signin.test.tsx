/*

  Please see links why this was written like this.
  references:
  https://tkdodo.eu/blog/testing-react-query
  https://www.js-howto.com/react-query-usemutation-with-jest-testing/


*/

import { ChildrenProps } from '@/types';
import { MantineProvider } from '@mantine/core';
import { act, render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import nock from 'nock';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { useSignin } from '@/services/auth.service';
import { Signin } from '../signin/signin.page';
describe('Sign ip page', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // ✅ turns retries off
        retry: false,
      },
    },
  });
  const wrapper = ({ children }: ChildrenProps) => (
    <HelmetProvider>
      <MantineProvider>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </BrowserRouter>
      </MantineProvider>
    </HelmetProvider>
  );
  it('sign in snapshot', () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          // ✅ turns retries off
          retry: false,
        },
      },
    });

    const { container } = render(
      <HelmetProvider>
        <MantineProvider>
          <BrowserRouter>
            <QueryClientProvider client={queryClient}>
              <Signin />
            </QueryClientProvider>
          </BrowserRouter>
        </MantineProvider>
      </HelmetProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('sign in success', async () => {
    const { result, waitFor } = renderHook(() => useSignin(), {
      wrapper: wrapper,
    });
    nock(import.meta.env.VITE_API)
      .post(`/auth/signin`)
      // Mocking the response with status code = 200
      .reply(201, {
        message: 'success',
      });

    act(() => {
      result.current.mutate({
        email: 'eTest@test.com',
        password: 'Sample@11',
      });
    });
    await waitFor(() => {
      return result.current.isSuccess;
    });

    // Make sure the request status resolved to true
    expect(result.current.isSuccess).toBe(true);
  });
  it('sign in error', async () => {
    const { result, waitFor } = renderHook(() => useSignin(), {
      wrapper: wrapper,
    });
    nock(import.meta.env.VITE_API)
      .post(`/auth/signin`)
      // Mocking the response with status code = 200
      .reply(404, {});

    act(() => {
      result.current.mutate({
        email: 'eTest@test.com',
        password: 'Sample@11',
      });
    });
    await waitFor(() => {
      return result.current.isError;
    });

    expect(result.current.isError).toBe(true);
  });
});
