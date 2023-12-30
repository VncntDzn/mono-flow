import {
  ActionIcon,
  Button,
  Card,
  Divider,
  Flex,
  Text,
  TextInput,
} from '@mantine/core';
import {
  IconBrandFacebookFilled,
  IconBrandGoogleFilled,
  IconBrandTwitterFilled,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export const Signin = () => {
  return (
    <Card component="form" h="100vh" shadow="sm">
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
      />
      <TextInput
        variant="filled"
        label="Password"
        size="md"
        placeholder="Your password"
        mx="md"
        type="password"
        autoComplete="current-password"
      />
      <Flex display="flex" justify="space-between" m="sm">
        <Text size="xs" component={Link} to="/forgot-password">
          Forgot password?
        </Text>
        <Text size="xs" component={Link} to="/sign-up">
          Sign up
        </Text>
      </Flex>
      <Button mx="md" type="submit">
        Sign in
      </Button>

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
  );
};
