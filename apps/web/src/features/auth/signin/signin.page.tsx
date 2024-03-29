import {
  ActionIcon,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  IconBrandFacebookFilled,
  IconBrandGoogleFilled,
  IconBrandTwitterFilled,
} from '@tabler/icons-react';
import { zodResolver } from 'mantine-form-zod-resolver';
import { Link, useNavigate } from 'react-router-dom';
import { useSignin } from '../hooks/use-auth';
import { signinSchema } from '../schema/auth.schema';
import { ISignin } from '../types/auth.types';
import { useEffect } from 'react';
import { useLocalStorage } from '@mantine/hooks';

export const Signin = () => {
  const [, setAccessToken] = useLocalStorage({
    key: 'access_token',
    defaultValue: '',
  });
  const { mutate, isLoading, data, isSuccess } = useSignin();
  const { isValid, onSubmit, getInputProps } = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: zodResolver(signinSchema),
  });

  const handleSignin = ({ password, email }: ISignin) => {
    mutate({
      password,
      email,
    });
  };
  const router = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      setAccessToken(data.data.include.access_token);
      router('/dashboard');
    }
  }, [data, isSuccess, router, setAccessToken]);
  return (
    <Card
      component="form"
      h="100vh"
      shadow="md"
      onSubmit={onSubmit(handleSignin)}
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <Text size="xl" fw={500} ta="center" my="lg">
        Mono Flow
      </Text>
      <TextInput
        variant="filled"
        label="Your email"
        size="md"
        placeholder="Your email"
        mx="md"
        autoComplete="email"
        withAsterisk
        {...getInputProps('email')}
      />
      <PasswordInput
        mx="md"
        size="md"
        label="Password"
        placeholder="Your password"
        autoComplete="current-password"
        withAsterisk
        {...getInputProps('password')}
      />
      <Flex display="flex" justify="space-between" m="sm">
        <Text size="xs" component={Link} to="/forgot-password">
          Forgot password?
        </Text>
        <Text size="xs" component={Link} to="/sign-up">
          Sign up
        </Text>
      </Flex>
      <Group>
        <Button
          fullWidth
          m="md"
          type="submit"
          disabled={!isValid}
          loading={isLoading}
        >
          Sign in
        </Button>
      </Group>
      <Divider m="md" label="or" labelPosition="center" />
      <ActionIcon.Group
        m="md"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <ActionIcon variant="light" mx="xs" aria-label="Sign in with Google">
          <IconBrandGoogleFilled />
        </ActionIcon>
        <ActionIcon variant="light" mx="xs" aria-label="Sign in with Facebook">
          <IconBrandFacebookFilled />
        </ActionIcon>
        <ActionIcon variant="light" mx="xs" aria-label="Sign in with Twitter">
          <IconBrandTwitterFilled />
        </ActionIcon>
      </ActionIcon.Group>
    </Card>
  );
};
