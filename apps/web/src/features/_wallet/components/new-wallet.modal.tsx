import { usePostWallet } from '@/services/wallets.service';
import { Button, Card, Flex, Stack, TextInput } from '@mantine/core';
import { IWallet } from '@shared/wallet.type';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from '../styles/new-wallet.module.css';
interface Props {
  onClose: () => void;
}
export const NewWallet = ({ onClose }: Props) => {
  const { mutate, isSuccess } = usePostWallet();
  const [info, setInfo] = useState<IWallet | undefined>(undefined);

  const handleOnChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    setInfo({
      ...info,
      [name]: value,
    } as IWallet);
  };

  const handlePostWallet = () => {
    mutate(info!);
  };

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, onClose]);
  return (
    <Stack>
      <Card radius="md" withBorder shadow="md" h="13rem">
        <TextInput
          classNames={{
            input: styles.input,
          }}
          defaultValue="My Wallet"
          name="name"
          onChange={handleOnChange}
        />
        <TextInput
          onChange={handleOnChange}
          name="balance"
          classNames={{
            input: styles.input,
          }}
          fw="bold"
          step="0.01"
          type="number"
          defaultValue="0.00"
        />
        <TextInput
          classNames={{
            input: styles.input,
          }}
          defaultValue="Metrobank"
          name="provider"
          onChange={handleOnChange}
        />
      </Card>

      <Flex gap="sm" justify="flex-end">
        <Button color="red" onClick={onClose}>
          Close
        </Button>
        <Button onClick={handlePostWallet}>Save</Button>
      </Flex>
    </Stack>
  );
};
