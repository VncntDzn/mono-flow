import { BarChart as Chart } from '@mantine/charts';
import styles from '../styles/bar.chart.module.css';
export const data = [
  { month: 'January', Expenses: 120, Income: 80 },
  { month: 'February', Expenses: 90, Income: 120 },
  { month: 'March', Expenses: 40, Income: 100 },
  { month: 'April', Expenses: 100, Income: 20 },
  { month: 'May', Expenses: 80, Income: 140 },
  { month: 'June', Expenses: 75, Income: 60 },
];
export const BarChart = () => {
  return (
    <Chart
      classNames={{
        tooltip: styles.bar,
        tooltipItem: 'red',
      }}
      textColor="red"
      h={300}
      data={data}
      dataKey="month"
      series={[
        { name: 'Expenses', color: 'violet.6' },
        { name: 'Income', color: 'blue.6' },
      ]}
      tickLine="xy"
    />
  );
};
