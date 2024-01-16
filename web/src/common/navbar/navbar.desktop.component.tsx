import {
    ActionIcon,
    Avatar,
    Group,
    Paper,
    TextInput
} from '@mantine/core';
import { IconBell, IconSearch } from '@tabler/icons-react';

export const NavbarDesktop = () => {
  return (
    <Paper radius={0} withBorder p="md">
      <Group>
        <TextInput
          placeholder="Search here..."
          rightSection={<IconSearch tabIndex={1} />}
          style={{ flexGrow: 1 }}
          size="md"
        />
        <Group preventGrowOverflow flex={1} justify="flex-end" align="center">
          <ActionIcon
            title="Notifications"
            bg="transparent"
            c="black"
            size="lg"
          >
            <IconBell />
          </ActionIcon>

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
        </Group>
      </Group>
    </Paper>
  );
};
