import { Button, Card, Flex, Stack, Text } from '@mantine/core';

interface Props {
  onClose: () => void;
}
export const NewWallet = ({ onClose }: Props) => {
  return (
    <Stack>
      <Card radius="md" withBorder shadow="md" h="13rem">
        <Text>Wallet Type</Text>
        <Text>1000.00</Text>
        <Text>Expiry: Jan. 29, 2023</Text>
        <Text>Metrobank</Text>
      </Card>

      <Flex gap="sm" justify="flex-end">
        <Button color="red" onClick={onClose}>Close</Button>
        <Button>Save</Button>
      </Flex>
    </Stack>
  );
};
