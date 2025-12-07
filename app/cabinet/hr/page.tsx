'use client';

import { useState } from 'react';
import {Stack, Title, Group, Button, Alert, Grid, Card, Text, Select, Table, Badge, Paper, Box} from '@mantine/core';
import { Download, TrendingUp, AlertCircle, Users, Filter } from 'lucide-react';
import { mockEmployees } from '@/lib/mockData';
import { getStatusColor } from '@/lib/utils';
import { ExpiringCertificate, Employee } from '@/types';

export default function HRDashboard() {
  const [filterPeriod, setFilterPeriod] = useState<string>('90');

  const getExpiringEmployees = (days: number): Employee[] => {
    return mockEmployees.filter(emp =>
      emp.certificates.some(cert => cert.daysLeft <= days && cert.daysLeft >= 0)
    );
  };

  const getExpiredEmployees = (): Employee[] => {
    return mockEmployees.filter(emp =>
      emp.certificates.some(cert => cert.daysLeft < 0)
    );
  };

  const getAllExpiringCertificates = (days: number): ExpiringCertificate[] => {
    const certs: ExpiringCertificate[] = [];

    mockEmployees.forEach(emp => {
      emp.certificates.forEach(cert => {
        if (cert.daysLeft <= days && cert.daysLeft >= 0) {
          certs.push({
            ...cert,
            employeeName: emp.name,
            position: emp.position,
            employeeId: emp.id
          });
        }
      });
    });

    return certs.sort((a, b) => a.daysLeft - b.daysLeft);
  };

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Title order={3}>Панель управления персоналом</Title>
        <Group>
          <Button leftSection={<Download size={16} />} variant="light">
            Экспорт отчета
          </Button>
          <Button leftSection={<TrendingUp size={16} />}>
            Планирование обучения
          </Button>
        </Group>
      </Group>

      <Alert icon={<AlertCircle size={16} />} title="Требуется внимание" color="red">
        {getExpiredEmployees().length} сотрудников с истекшими документами.
        {getExpiringEmployees(30).length} сотрудников требуют продления в ближайшие 30 дней.
      </Alert>

      <Grid>
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
              <Text size="sm" c="dimmed">Всего сотрудников</Text>
              <Users size={20} color="#1971c2" />
            </Group>
            <Text size="xl" fw={700}>{mockEmployees.length}</Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
              <Text size="sm" c="dimmed">Истекают до 30 дн.</Text>
              <AlertCircle size={20} color="#f59f00" />
            </Group>
            <Text size="xl" fw={700} c="orange">{getExpiringEmployees(30).length}</Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
              <Text size="sm" c="dimmed">Истекают до 90 дн.</Text>
              <AlertCircle size={20} color="#fab005" />
            </Group>
            <Text size="xl" fw={700} c="yellow">{getExpiringEmployees(90).length}</Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
              <Text size="sm" c="dimmed">Просрочены</Text>
              <AlertCircle size={20} color="#fa5252" />
            </Group>
            <Text size="xl" fw={700} c="red">{getExpiredEmployees().length}</Text>
          </Card>
        </Grid.Col>
      </Grid>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          <Title order={4}>Ближайшие истечения документов</Title>
          <Select
            value={filterPeriod}
            onChange={(value) => setFilterPeriod(value || '90')}
            data={[
              { value: '30', label: '30 дней' },
              { value: '60', label: '60 дней' },
              { value: '90', label: '90 дней' },
              { value: '180', label: '180 дней' }
            ]}
            leftSection={<Filter size={16} />}
          />
        </Group>

        <Box style={{overflowX: 'auto'}}><Table highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Сотрудник</Table.Th>
              <Table.Th>Должность</Table.Th>
              <Table.Th>Документ</Table.Th>
              <Table.Th>Дата истечения</Table.Th>
              <Table.Th>Осталось дней</Table.Th>
              <Table.Th>Статус</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {getAllExpiringCertificates(parseInt(filterPeriod)).map((cert, idx) => (
              <Table.Tr key={idx}>
                <Table.Td>
                  <Text size="sm" fw={500}>{cert.employeeName}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{cert.position}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{cert.name}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{cert.expiryDate}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge color={cert.daysLeft <= 30 ? 'red' : cert.daysLeft <= 60 ? 'orange' : 'yellow'}>
                    {cert.daysLeft} дн.
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Badge color={getStatusColor(cert.status)}>
                    {cert.status === 'expiring' ? 'Требует продления' : 'Активен'}
                  </Badge>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table></Box>
      </Card>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={4} mb="md">Планирование обучения</Title>
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper withBorder p="md">
              <Text size="sm" c="dimmed" mb="xs">Требуется обучение в течение 30 дней</Text>
              <Text size="xl" fw={700} mb="md">{getExpiringEmployees(30).length} чел.</Text>
              <Text size="sm" mb="xs">Рекомендуемые действия:</Text>
              <Text size="xs" c="dimmed">• Заключить договор с ГУМРФ на 2 места</Text>
              <Text size="xs" c="dimmed">• Заключить договор с ЦМАК на 1 место</Text>
            </Paper>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper withBorder p="md">
              <Text size="sm" c="dimmed" mb="xs">Требуется обучение в течение 90 дней</Text>
              <Text size="xl" fw={700} mb="md">{getExpiringEmployees(90).length} чел.</Text>
              <Text size="sm" mb="xs">Планируемые договоры:</Text>
              <Text size="xs" c="dimmed">• ГУМРФ: 3 места</Text>
              <Text size="xs" c="dimmed">• ЦМАК: 2 места</Text>
            </Paper>
          </Grid.Col>
        </Grid>
      </Card>
    </Stack>
  );
}
