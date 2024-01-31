import { Button, Container, Flex, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export const UnderMaintenance = () => {
  const router = useNavigate();
  return (
    <Container>
      <Text variant="h1">We&rsquo;ll be back soon!</Text>
      <Flex>
        <Text variant="h6">
          Sorry for the inconvenience but we&rsquo;re performing some
          maintenance at the moment. We&rsquo;ll be back online shortly!
        </Text>
        <p>&mdash; The Team</p>
      </Flex>
      <Button onClick={() => router(-1)}>
        Click here to return to previous page
      </Button>
    </Container>
  );
};
