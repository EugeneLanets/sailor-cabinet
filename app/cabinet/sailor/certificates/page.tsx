'use client';

import { Stack, Title, Group, Button, Card, Text, Badge, Grid, Progress, Box } from '@mantine/core';
import { Award, Bell, GraduationCap } from 'lucide-react';
import { mockCertificates } from '@/lib/mockData';
import { getStatusColor, getStatusText } from '@/lib/utils';

export default function CertificatesPage() {
  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Title order={3}>Мои документы и сертификаты</Title>
        <Button leftSection={<Bell size={16} />}>Настроить уведомления</Button>
      </Group>

      {mockCertificates.map(cert => (
        <Card key={cert.id} shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="md">
            <Group>
              <Award size={32} color="#1971c2" />
              <div>
                <Text fw={500} size="lg">{cert.name}</Text>
                <Text size="sm" c="dimmed">{cert.institution}</Text>
              </div>
            </Group>
            <Badge size="lg" color={getStatusColor(cert.status)}>
              {getStatusText(cert.status, cert.daysLeft)}
            </Badge>
          </Group>

          <Grid>
            <Grid.Col span={6}>
              <Text size="sm" c="dimmed">Дата выдачи</Text>
              <Text fw={500}>{cert.issueDate}</Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="sm" c="dimmed">Действителен до</Text>
              <Text fw={500}>{cert.expiryDate}</Text>
            </Grid.Col>
          </Grid>

          {cert.status === 'expiring' && (
            <Box mt="md">
              <Group justify="space-between" mb="xs">
                <Text size="sm" c="dimmed">Осталось времени</Text>
                <Text size="sm" fw={500}>{cert.daysLeft} дней</Text>
              </Group>
              <Progress
                value={Math.max(0, (cert.daysLeft / 365) * 100)}
                color="yellow"
                size="sm"
              />
            </Box>
          )}

          {(cert.status === 'expiring' || cert.status === 'expired') && (
            <Group mt="md">
              <Button variant="light" leftSection={<GraduationCap size={16} />}>
                Найти курс продления
              </Button>
              <Button variant="outline">Подать заявление</Button>
            </Group>
          )}
        </Card>
      ))}
    </Stack>
  );
}
