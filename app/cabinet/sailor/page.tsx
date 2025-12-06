'use client';

import { Stack, Alert, Grid, Card, Text, Title, Timeline, Button, Group, Badge } from '@mantine/core';
import { Info, CheckCheck, AlertCircle, GraduationCap } from 'lucide-react';
import { mockCertificates, mockCourses } from '@/lib/mockData';

export default function SailorDashboard() {
  return (
    <Stack gap="lg">
      <Alert icon={<Info size={16} />} title="Внимание!" color="yellow">
        У вас есть документы, срок действия которых скоро истекает. Пожалуйста, проверьте раздел "Документы".
      </Alert>

      <Grid>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="sm" c="dimmed" mb="xs">Активные документы</Text>
            <Text size="xl" fw={700}>{mockCertificates.filter(c => c.status === 'active').length}</Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="sm" c="dimmed" mb="xs">Истекают скоро</Text>
            <Text size="xl" fw={700} c="yellow">{mockCertificates.filter(c => c.status === 'expiring').length}</Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="sm" c="dimmed" mb="xs">Истекшие</Text>
            <Text size="xl" fw={700} c="red">{mockCertificates.filter(c => c.status === 'expired').length}</Text>
          </Card>
        </Grid.Col>
      </Grid>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={4} mb="md">Последние обновления</Title>
        <Timeline active={2} bulletSize={24} lineWidth={2}>
          <Timeline.Item bullet={<CheckCheck size={12} />} title="Документ загружен">
            <Text c="dimmed" size="sm">Паспорт (разворот с фото) успешно загружен</Text>
            <Text size="xs" mt={4}>12.02.2025</Text>
          </Timeline.Item>
          <Timeline.Item bullet={<AlertCircle size={12} />} title="Требуется продление">
            <Text c="dimmed" size="sm">Сертификат ПБМТП истекает через 45 дней</Text>
            <Text size="xs" mt={4}>10.02.2025</Text>
          </Timeline.Item>
          <Timeline.Item title="Курс завершен" bullet={<GraduationCap size={12} />}>
            <Text c="dimmed" size="sm">Курс английского языка успешно завершен</Text>
            <Text size="xs" mt={4}>05.02.2025</Text>
          </Timeline.Item>
        </Timeline>
      </Card>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={4} mb="md">Рекомендуемые курсы</Title>
        <Stack gap="md">
          {mockCourses.slice(0, 2).map(course => (
            <Card key={course.id} withBorder>
              <Group justify="space-between" mb="xs">
                <Text fw={500}>{course.name}</Text>
                <Badge color="blue">{course.format}</Badge>
              </Group>
              <Text size="sm" c="dimmed" mb="xs">{course.institution}</Text>
              <Group justify="space-between" mt="md">
                <Text size="sm" fw={500}>{course.price}</Text>
                <Button size="xs" variant="light">Подробнее</Button>
              </Group>
            </Card>
          ))}
        </Stack>
      </Card>
    </Stack>
  );
}
