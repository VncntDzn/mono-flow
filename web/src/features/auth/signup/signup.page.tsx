import { Button, Card, TextInput } from '@mantine/core';
import { IconAt, IconLock, IconUser } from '@tabler/icons-react';

export const Signup = () => {
  return (
    <Card m="xs" component="form" shadow="sm">
      <TextInput
        leftSectionPointerEvents="none"
        leftSection={<IconUser />}
        variant="filled"
        label="Full name"
        size="md"
        placeholder="Full name"
        mx="md"
        autoCapitalize="word"
      />
      <TextInput
        leftSectionPointerEvents="none"
        leftSection={<IconAt />}
        variant="filled"
        label="Your email"
        size="md"
        placeholder="Your email"
        autoComplete='email'
        m="md"
      />
      <TextInput
        leftSectionPointerEvents="none"
        leftSection={<IconLock />}
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
    </Card>
  );
};
