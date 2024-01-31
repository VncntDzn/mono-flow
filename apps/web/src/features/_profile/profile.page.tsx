import { Box, Group, Text, TextInput } from '@mantine/core';

export const Profile = () => {
  return (
    <Box>
      <Text size="lg">Profile</Text>
      <Group>
        <TextInput placeholder="Enter first name" label="First Name" />
        <TextInput placeholder="Enter last name" label="Last Name" />
      </Group>
      <Group>
        <TextInput label="Password" placeholder="Enter password" />
        <TextInput label="Password" placeholder="Enter password" />
      </Group>
    </Box>
  );
};
