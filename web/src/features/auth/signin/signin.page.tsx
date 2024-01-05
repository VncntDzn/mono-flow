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
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ISignin } from '../types/auth.types';
import { useSignin } from '../hooks/use-auth';
import { signinSchema } from '../schema/auth.schema';

export const Signin = () => {
  const { mutate, isLoading } = useSignin();
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
  return (
    <>
      <Helmet>
        <title>Flow | Sign-in</title>
      </Helmet>
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
          <ActionIcon variant="light" mx="xs">
            <IconBrandGoogleFilled />
          </ActionIcon>
          <ActionIcon variant="light" mx="xs">
            <IconBrandFacebookFilled />
          </ActionIcon>
          <ActionIcon variant="light" mx="xs">
            <IconBrandTwitterFilled />
          </ActionIcon>
        </ActionIcon.Group>
      </Card>
    </>
  );
};
