import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NewWallet } from './components/new-wallet.modal';

export const Wallet = () => {
  const [opened, { open, close }] = useDisclosure(false);
  if (false) {
    return <div>No Wallet available. Create one</div>;
  }
  return (
    <div>
      No Wallet available. <button onClick={open}>Create one</button>
      <Modal opened={opened} onClose={close} title="Wallet" centered>
        <NewWallet onClose={close} />
      </Modal>
    </div>
  );
};
