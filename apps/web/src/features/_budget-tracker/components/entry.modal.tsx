import { Box, Button, Flex } from '@mantine/core';

interface Props {
  onClose: () => void;
}
export const EntryModal = ({ onClose }: Props) => {
  return (
    <Box py="sm">
      <Flex justify="flex-end" gap="sm">
        <Button>Save</Button>
        <Button onClick={onClose}>Close</Button>
      </Flex>
    </Box>
  );
};
