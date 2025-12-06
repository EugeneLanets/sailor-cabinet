'use client';

import { Stack, Title, Accordion, Card, Text, Badge, Group, Button, Grid } from '@mantine/core';
import { mockOrders } from '@/lib/mockData';

export default function OrdersPage() {
  return (
    <Stack gap="lg">
      <Title order={3}>Мои заказы</Title>

      <Accordion defaultValue="current">
        <Accordion.Item value="current">
          <Accordion.Control>Текущие заказы ({mockOrders.length})</Accordion.Control>
          <Accordion.Panel>
            <Stack gap="md">
              {mockOrders.map(order => (
                <Card key={order.id} withBorder>
                  <Group justify="space-between" mb="md">
                    <div>
                      <Text fw={500} size="lg">Заказ {order.id}</Text>
                      <Text size="sm" c="dimmed">{order.date}</Text>
                    </div>
                    <Button>Оплатить</Button>
                  </Group>
                  <Grid>
                    <Grid.Col span={4}>
                      <Text size="sm" c="dimmed">Статус заказа</Text>
                      <Badge color="blue">{order.status}</Badge>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Text size="sm" c="dimmed">Оплата</Text>
                      <Badge color="yellow">{order.paymentStatus}</Badge>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Text size="sm" c="dimmed">Сумма</Text>
                      <Text fw={700}>{order.total}</Text>
                    </Grid.Col>
                  </Grid>
                  <Text size="sm" mt="md">Курсы: {order.courses.join(', ')}</Text>
                </Card>
              ))}
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="completed">
          <Accordion.Control>Завершенные заказы (0)</Accordion.Control>
          <Accordion.Panel>
            <Text c="dimmed" ta="center" py="xl">Нет завершенных заказов</Text>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Stack>
  );
}
