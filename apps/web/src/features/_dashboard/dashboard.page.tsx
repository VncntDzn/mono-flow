import { Box, Card, Flex, Paper, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { BudgetTable } from '../_budget-tracker/components/budget.table';
import { BarChart } from './components/bar.chart';

export const Dashboard = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <Box>
      <Title order={3} my="sm">
        Financial Overview
      </Title>
      <Box style={{ overflow: 'auto', width: '100%' }}>
        <Flex gap="sm" align="center" justify="space-between">
          {['Income', 'Expenses', 'Savings'].map((v) => (
            <Card
              radius="md"
              withBorder
              shadow="lg"
              p="sm"
              w="16rem"
              key={v}
              h={{ xs: '5rem', md: '7rem' }}
              style={{
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flex: isMobile ? '0 0 50%' : '',
              }}
            >
              <Text>{v}</Text>
            </Card>
          ))}
        </Flex>
      </Box>
      <Box my="lg">
        <Title order={3} my="sm">
          Visual Overview
        </Title>
        <BarChart />
      </Box>
      <Box my="lg">
        <Title order={3} my="sm">
          Upcoming Payments
        </Title>
        <BudgetTable />
      </Box>
    </Box>
  );
};
