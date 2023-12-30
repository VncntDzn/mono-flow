import { Button, Card, TextInput } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';

export const Signin = () => {
  return (
    <Card m="xs" component="form" shadow="sm">
      <TextInput
        rightSectionPointerEvents="none"
        rightSection={<IconAt />}
        variant="filled"
        label="Your email"
        size="md"
        placeholder="Your email"
        mx="md"
      />
      <TextInput
        rightSectionPointerEvents="none"
        rightSection={<IconAt />}
        variant="filled"
        label="Password"
        size="md"
        placeholder="Your password"
        m="md"
        type="password"
        autoComplete="current-password"
      />
      <Button mx="md" type="submit">
        Sign in
      </Button>
    </Card>
  );
};
