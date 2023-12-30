import {
  ActionIcon,
  Button,
  Card,
  Divider,
  Text,
  TextInput,
} from '@mantine/core';
import {
  IconBrandFacebookFilled,
  IconBrandGoogleFilled,
  IconBrandTwitterFilled,
} from '@tabler/icons-react';

export const Signup = () => {
  return (
    <Card h="100vh" component="form" shadow="sm">
      <Text my="lg" size="xl" fw={500} ta="center">
        Mono Flow
      </Text>
      <TextInput
        variant="filled"
        label="Full name"
        size="md"
        placeholder="Full name"
        mx="md"
        autoCapitalize="word"
      />
      <TextInput
        variant="filled"
        label="Your email"
        size="md"
        placeholder="Your email"
        autoComplete="email"
        m="md"
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
      <Button m="md" type="submit">
        Sign up
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
