import { Box, Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { BudgetTable } from './components/budget.table';
import { EntryModal } from './components/entry.modal';
import styles from './styles/entry.modal.module.css';

export const BudgetTracker = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  return (
    <Box>
      <Button onClick={toggle}>Add Entry</Button>
      <BudgetTable />

      <Modal
        classNames={{
          title: styles.title,
        }}
        opened={opened}
        onClose={close}
        title="New Entry"
        centered
      >
        <EntryModal />
      </Modal>
    </Box>
  );
};
