'use client';

import { Stack, Title, Accordion, Card, Text, Badge, Group, Button } from '@mantine/core';
import { mockCourses } from '@/lib/mockData';

export default function CoursesPage() {
  return (
    <Stack gap="lg">
      <Title order={3}>Доступные курсы</Title>

      <Accordion defaultValue="available">
        <Accordion.Item value="available">
          <Accordion.Control>Рекомендуемые курсы ({mockCourses.length})</Accordion.Control>
          <Accordion.Panel>
            <Stack gap="md">
              {mockCourses.map(course => (
                <Card key={course.id} withBorder>
                  <Group justify="space-between" mb="xs">
                    <Text fw={500} size="lg">{course.name}</Text>
                    {course.hasLMS && <Badge color="green">Доступно в СДО</Badge>}
                  </Group>
                  <Group gap="xl" mb="md">
                    <div>
                      <Text size="sm" c="dimmed">Формат</Text>
                      <Text size="sm">{course.format}</Text>
                    </div>
                    <div>
                      <Text size="sm" c="dimmed">Продолжительность</Text>
                      <Text size="sm">{course.duration}</Text>
                    </div>
                    <div>
                      <Text size="sm" c="dimmed">Начало</Text>
                      <Text size="sm">{course.startDate}</Text>
                    </div>
                  </Group>
                  <Group justify="space-between">
                    <Text fw={700} size="lg" c="blue">{course.price}</Text>
                    <Group>
                      <Button variant="light">В избранное</Button>
                      <Button>Записаться</Button>
                    </Group>
                  </Group>
                </Card>
              ))}
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="favorites">
          <Accordion.Control>Избранные курсы (0)</Accordion.Control>
          <Accordion.Panel>
            <Text c="dimmed" ta="center" py="xl">Нет избранных курсов</Text>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="completed">
          <Accordion.Control>Завершенные курсы (3)</Accordion.Control>
          <Accordion.Panel>
            <Text c="dimmed" ta="center" py="xl">История обучения</Text>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Stack>
  );
}
