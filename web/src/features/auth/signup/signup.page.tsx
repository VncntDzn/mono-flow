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
import { useSignup } from '../hooks/use-auth';
import { signupSchema } from '../schema/auth.schema';
import { ISignup } from '../types/auth.types';

export const Signup = () => {
  const { mutate, isLoading } = useSignup();
  const { isValid, onSubmit, getInputProps } = useForm({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    },
    validate: zodResolver(signupSchema),
  });

  const handleSignup = ({
    first_name,
    last_name,
    password,
    email,
  }: ISignup) => {
    mutate({
      first_name,
      last_name,
      password,
      email,
    });
  };
  return (
    <>
      <Helmet>
        <title>Flow | Sign-up</title>
      </Helmet>
      <Card
        component="form"
        h="100vh"
        shadow="md"
        style={{ display: 'flex', justifyContent: 'center' }}
        onSubmit={onSubmit(handleSignup)}
      >
        <Text my="lg" size="xl" fw={500} ta="center">
          Mono Flow
        </Text>
        <Flex
          w={{ md: '100%' }}
          p={{ base: 'md', md: 'sm' }}
          gap="md"
          direction={{ base: 'column', md: 'row' }}
        >
          <TextInput
            variant="filled"
            label="First name"
            size="md"
            placeholder="First name"
            autoCapitalize="word"
            withAsterisk
            {...getInputProps('first_name')}
            w="inherit"
          />
          <TextInput
            variant="filled"
            w="inherit"
            label="Last name"
            size="md"
            placeholder="Last name"
            autoCapitalize="word"
            withAsterisk
            {...getInputProps('last_name')}
          />
        </Flex>
        <TextInput
          variant="filled"
          label="Your email"
          size="md"
          placeholder="Your email"
          autoComplete="email"
          mx="md"
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

        <Flex display="flex" justify="flex-end" m="sm">
          <Text size="xs" component={Link} to="/sign-in">
            Sign in
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
            Sign up
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
          <ActionIcon
            variant="light"
            mx="xs"
            aria-label="Sign in with Facebook"
          >
            <IconBrandFacebookFilled />
          </ActionIcon>
          <ActionIcon variant="light" mx="xs" aria-label="Sign in with Twitter">
            <IconBrandTwitterFilled />
          </ActionIcon>
        </ActionIcon.Group>
      </Card>
    </>
  );
};
