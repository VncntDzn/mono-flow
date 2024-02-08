import { useGetWallets } from '@/services/wallets.service';
import { Button, Card, Flex, Modal, Skeleton, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Suspense } from 'react';
import { NewWallet } from './components/new-wallet.modal';
import { IWallet } from '@shared/wallet.type';

export const Wallet = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data } = useGetWallets();

  if (!data?.data) {
    return <div>No Wallet available. Create one</div>;
  }
  return (
    <Suspense fallback={<Skeleton height={200} />}>
      <div>
        <Button onClick={open}>Create one</Button>

        <Flex wrap="wrap" gap="sm" justify="center">
          {data?.data.map(
            ({ balance, name, provider }: IWallet, id: number) => (
              <Card
                key={id}
                radius="md"
                w="20rem"
                withBorder
                shadow="md"
                h="13rem"
              >
                <Text>{provider}</Text>
                <Text>{balance}</Text>
                <Text>{name}</Text>
              </Card>
            ),
          )}
        </Flex>
        <Modal opened={opened} onClose={close} title="Wallet" centered>
          <NewWallet onClose={close} />
        </Modal>
      </div>
    </Suspense>
  );
};
