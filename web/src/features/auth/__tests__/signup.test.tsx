import { MantineProvider } from '@mantine/core';
import { act, render, renderHook } from '@testing-library/react';
import nock from 'nock';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { useSignup } from '../hooks/use-auth';
import { Signup } from '../signup/signup.page';

describe('Sign up page', () => {
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

  it('sign up success', () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          // ✅ turns retries off
          retry: false,
        },
      },
    });
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    const { result, waitFor } = renderHook(() => useSignup(), {
      wrapper: wrapper,
    });
    nock('http://localhost:3000/api')
      .post(`/auth/signup`)
      // Mocking the response with status code = 200
      .reply(201, {});

    act(() => {
      result.current.mutate({
        first_name: 'fTest',
        last_name: 'lTest',
        email: 'eTest@test.com',
        password: 'Sample@11',
      });
    });
  });
  it('sign up error', () => {});
});
