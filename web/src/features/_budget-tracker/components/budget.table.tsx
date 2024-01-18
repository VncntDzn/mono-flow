import { Checkbox, Table } from '@mantine/core';
import { useState } from 'react';
import styles from '../styles/table.module.css';
const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];
export const BudgetTable = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const rows = elements.map((element) => (
    <Table.Tr
      key={element.name}
      bg={
        selectedRows.includes(element.position)
          ? 'var(--mantine-color-blue-light)'
          : undefined
      }
    >
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          checked={selectedRows.includes(element.position)}
          onChange={(event) =>
            setSelectedRows(
              event.currentTarget.checked
                ? [...selectedRows, element.position]
                : selectedRows.filter(
                    (position) => position !== element.position,
                  ),
            )
          }
        />
      </Table.Td>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
    </Table.Tr>
  ));
  return (
    <Table
      classNames={{
        th: styles.th,
        tbody: styles.tbody,
      }}
      highlightOnHover
      withTableBorder
      withColumnBorders
      stickyHeader
      style={{ marginTop: '1rem' }}
    >
      <Table.Thead>
        <Table.Tr>
          <Table.Th>#</Table.Th>
          <Table.Th>Element position</Table.Th>
          <Table.Th>Element name</Table.Th>
          <Table.Th>Symbol</Table.Th>
          <Table.Th>Atomic mass</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};