import {
  ActionIcon,
  Avatar,
  Group,
  Paper,
  Text,
  TextInput,
} from '@mantine/core';
import { IconBell, IconChevronDown, IconSearch } from '@tabler/icons-react';

export const NavbarDesktop = () => {
  return (
    <Paper p="md" radius={0} shadow="xs">
      <Group display="flex" justify="space-between">
        <Group w="20rem">
          <TextInput
            placeholder="Search here..."
            rightSection={<IconSearch tabIndex={1} />}
            size="md"
            style={{ flex: 1 }}
          />
        </Group>
        <Group flex={1} justify="flex-end" align="center">
          <ActionIcon
            title="Notifications"
            bg="transparent"
            c="black"
            size="lg"
          >
            <IconBell />
          </ActionIcon>

          <Group p={0} gap="sm" align="center">
            <Avatar
              tabIndex={1}
              title="Avatar"
              color="cyan"
              radius="xl"
              size="md"
              style={{ cursor: 'pointer' }}
            >
              VD
            </Avatar>
            <Text>Vincent Dizon</Text>
          </Group>
        </Group>
      </Group>
    </Paper>
  );
};
