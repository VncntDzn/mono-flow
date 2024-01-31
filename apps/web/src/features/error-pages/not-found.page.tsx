import { Button, Container, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const router = useNavigate();
  return (
    <Container>
      <Text variant="h1">Missing page</Text>

      <Button onClick={() => router(-1)}>
        Click here to return to previous page
      </Button>
    </Container>
  );
};
