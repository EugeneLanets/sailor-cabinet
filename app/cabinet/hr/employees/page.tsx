'use client';

import { useState } from 'react';
import { Stack, Title, Group, Button, TextInput, Table, Text, Badge, ActionIcon, Modal, Divider, Grid, Card } from '@mantine/core';
import { Download, Search, Eye } from 'lucide-react';
import { mockEmployees } from '@/lib/mockData';
import { Employee } from '@/types';
import { getStatusColor, getStatusText } from '@/lib/utils';

export default function EmployeesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [modalOpened, setModalOpened] = useState(false);

  const filteredEmployees = mockEmployees.filter(emp =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.vessel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openEmployeeDetail = (employee: Employee) => {
    setSelectedEmployee(employee);
    setModalOpened(true);
  };

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Title order={3}>Сотрудники</Title>
        <Group>
          <TextInput
            placeholder="Поиск сотрудников..."
            leftSection={<Search size={16} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: 300 }}
          />
          <Button leftSection={<Download size={16} />} variant="light">
            Экспорт
          </Button>
        </Group>
      </Group>

      <Table highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ФИО</Table.Th>
            <Table.Th>Должность</Table.Th>
            <Table.Th>Судно</Table.Th>
            <Table.Th>Контакты</Table.Th>
            <Table.Th>Документы</Table.Th>
            <Table.Th>Действия</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {filteredEmployees.map(emp => {
            const expiringCount = emp.certificates.filter(c => c.status === 'expiring').length;
            const expiredCount = emp.certificates.filter(c => c.status === 'expired').length;

            return (
              <Table.Tr key={emp.id}>
                <Table.Td>
                  <Text size="sm" fw={500}>{emp.name}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{emp.position}</Text>
                  <Text size="xs" c="dimmed">{emp.department}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{emp.vessel}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="xs">{emp.phone}</Text>
                  <Text size="xs" c="dimmed">{emp.email}</Text>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    {expiredCount > 0 && (
                      <Badge color="red" size="sm">
                        {expiredCount} просрочено
                      </Badge>
                    )}
                    {expiringCount > 0 && (
                      <Badge color="yellow" size="sm">
                        {expiringCount} истекает
                      </Badge>
                    )}
                    {expiredCount === 0 && expiringCount === 0 && (
                      <Badge color="green" size="sm">
                        Все в порядке
                      </Badge>
                    )}
                  </Group>
                </Table.Td>
                <Table.Td>
                  <ActionIcon
                    variant="light"
                    onClick={() => openEmployeeDetail(emp)}
                  >
                    <Eye size={16} />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Детальная информация о сотруднике"
        size="lg"
      >
        {selectedEmployee && (
          <Stack gap="md">
            <div>
              <Text size="lg" fw={700}>{selectedEmployee.name}</Text>
              <Text size="sm" c="dimmed">{selectedEmployee.position}</Text>
              <Text size="sm" c="dimmed">{selectedEmployee.department}</Text>
            </div>

            <Divider />

            <Grid>
              <Grid.Col span={6}>
                <Text size="sm" c="dimmed">Судно</Text>
                <Text size="sm">{selectedEmployee.vessel}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size="sm" c="dimmed">Телефон</Text>
                <Text size="sm">{selectedEmployee.phone}</Text>
              </Grid.Col>
              <Grid.Col span={12}>
                <Text size="sm" c="dimmed">Email</Text>
                <Text size="sm">{selectedEmployee.email}</Text>
              </Grid.Col>
            </Grid>

            <Divider />

            <Title order={5}>Документы</Title>
            {selectedEmployee.certificates.map((cert, idx) => (
              <Card key={idx} withBorder>
                <Group justify="space-between" mb="xs">
                  <Text fw={500}>{cert.name}</Text>
                  <Badge color={getStatusColor(cert.status)}>
                    {getStatusText(cert.status, cert.daysLeft)}
                  </Badge>
                </Group>
                <Group>
                  <Text size="sm" c="dimmed">Истекает: {cert.expiryDate}</Text>
                  <Text size="sm" c="dimmed">•</Text>
                  <Text size="sm" c="dimmed">Осталось: {cert.daysLeft} дн.</Text>
                </Group>
              </Card>
            ))}

            <Button fullWidth mt="md">
              Назначить обучение
            </Button>
          </Stack>
        )}
      </Modal>
    </Stack>
  );
}
