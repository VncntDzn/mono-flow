import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Flex,
  NumberInput,
  TextInput,
  Textarea,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { readLocalStorageValue } from '@mantine/hooks';
import { ITransactions } from '@shared/transaction.type';
import { IconChevronDown } from '@tabler/icons-react';
import { zodResolver } from 'mantine-form-zod-resolver';
import { usePostTransaction } from '../hooks/use-transactions';
import { transactionSchema } from '../schema/transaction.schema';
interface Props {
  onClose: () => void;
}
export const EntryModal = ({ onClose }: Props) => {
  const user_id: string = readLocalStorageValue({ key: 'user_id' });
  const { mutate, isLoading } = usePostTransaction();
  const { isValid, onSubmit, getInputProps } = useForm({
    initialValues: {
      amount: 0,
      transaction_name: '',
      description: '',
      category: '',
      type: undefined,
      is_recurring: false,
      time_created_at: '',
    },
    validate: zodResolver(transactionSchema),
  });
  const handleOnSubmit = (param: Omit<ITransactions, 'user_id'>) => {
    mutate({ ...param, user_id });
  };

  return (
    <Box py="sm" component="form" onSubmit={onSubmit(handleOnSubmit)}>
      <Flex gap="sm">
        <TextInput
          label="Transaction name"
          placeholder="Gaming chair..."
          my="sm"
          autoCapitalize="word"
          withAsterisk
          {...getInputProps('transaction_name')}
        />
        <NumberInput
          label="Enter amount"
          placeholder="0.00"
          allowNegative={false}
          thousandSeparator=","
          my="sm"
          withAsterisk
          {...getInputProps('amount')}
        />
      </Flex>
      <Textarea
        label="Enter description"
        placeholder="Reward for gaming chair..."
        my="sm"
        autosize
        minRows={2}
        maxRows={5}
        {...getInputProps('description')}
      />

      <Flex gap="sm">
        <Autocomplete
          rightSection={<IconChevronDown />}
          my="sm"
          required
          label="Your wallets"
          placeholder="Choose a wallet"
          withAsterisk
          {...getInputProps('category')}
          data={['React', 'Angular', 'Vue', 'Svelte']}
        />
        <Autocomplete
          rightSection={<IconChevronDown />}
          my="sm"
          required
          label="Transaction type"
          placeholder="Choose type of transaction"
          withAsterisk
          {...getInputProps('type')}
          data={['INCOME', 'EXPENSE', 'SAVINGS', 'OTHER']}
        />
      </Flex>
      <Flex gap="sm">
        <DateInput
          {...getInputProps('time_created_at')}
          label="Transaction Date"
          placeholder="Choose a date"
        />
        <Checkbox
          {...getInputProps('is_recurring')}
          labelPosition="left"
          label="Recurring Bill"
          my="sm"
        />
      </Flex>

      <Flex justify="flex-end" gap="sm">
        <Button color="red" onClick={onClose}>
          Close
        </Button>
        <Button disabled={!isValid} loading={isLoading} type="submit">
          Save
        </Button>
      </Flex>
    </Box>
  );
};
