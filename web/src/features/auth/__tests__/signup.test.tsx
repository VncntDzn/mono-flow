/*

  Please see links why this was written like this.
  references:
  https://tkdodo.eu/blog/testing-react-query
  https://www.js-howto.com/react-query-usemutation-with-jest-testing/


*/

import { MantineProvider } from '@mantine/core';
import { act, render } from '@testing-library/react';
import nock from 'nock';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { useSignup } from '../hooks/use-auth';
import { Signup } from '../signup/signup.page';
import { renderHook } from '@testing-library/react-hooks';
import { ChildrenProps } from '@/types';
describe('Sign up page', () => {
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
  it('sign up snapshot', () => {
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
              <Signup />
            </QueryClientProvider>
          </BrowserRouter>
        </MantineProvider>
      </HelmetProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('sign up success', async () => {
    const { result, waitFor } = renderHook(() => useSignup(), {
      wrapper: wrapper,
    });
    nock(import.meta.env.VITE_API)
      .post(`/auth/signup`)
      // Mocking the response with status code = 200
      .reply(201, {
        message: 'success',
      });

    act(() => {
      result.current.mutate({
        first_name: 'fTest',
        last_name: 'lTest',
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
  it('sign up error', async () => {
    const { result, waitFor } = renderHook(() => useSignup(), {
      wrapper: wrapper,
    });
    nock(import.meta.env.VITE_API)
      .post(`/auth/signup`)
      // Mocking the response with status code = 200
      .reply(404, {});

    act(() => {
      result.current.mutate({
        first_name: 'fTest',
        last_name: 'lTest',
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
