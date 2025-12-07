'use client';

import { Container, Stack, Group, Title, Button, Card, Text, Grid, Box, Center } from '@mantine/core';
import { Ship, Award, BookOpen, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from '@mantine/hooks';

export default function LandingPage() {
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Box style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Container size="xl" py={isMobile ? 'md' : 'xl'}>
        <Stack gap={isMobile ? 'md' : 'xl'}>
          {/* Header */}
          <Group justify="space-between" py="md">
            <Group gap={isMobile ? 'xs' : 'md'}>
              <Ship size={isMobile ? 28 : 40} color="white" />
              {!isMobile && <Title order={2} c="white">Личный кабинет моряка</Title>}
            </Group>
            <Group gap={isMobile ? 'xs' : 'sm'}>
              <Button
                variant="white"
                onClick={() => router.push('/login')}
                size={isMobile ? 'xs' : 'sm'}
              >
                Вход
              </Button>
              <Button
                variant="outline"
                c="white"
                style={{ borderColor: 'white' }}
                onClick={() => router.push('/register')}
                size={isMobile ? 'xs' : 'sm'}
              >
                {isMobile ? 'Регистр.' : 'Регистрация'}
              </Button>
            </Group>
          </Group>

          {/* Hero Section */}
          <Center py={isMobile ? 40 : 80}>
            <Stack gap={isMobile ? 'md' : 'xl'} align="center" maw={800}>
              <Title order={1} c="white" ta="center" size={isMobile ? 28 : 48}>
                Единая платформа управления документами и обучением моряков
              </Title>
              <Text size={isMobile ? 'md' : 'xl'} c="white" ta="center">
                Контролируйте сроки действия дипломов и сертификатов, записывайтесь на курсы, управляйте обучением персонала
              </Text>
              <Group>
                <Button
                  size={isMobile ? 'md' : 'lg'}
                  variant="white"
                  onClick={() => router.push('/register')}
                >
                  Начать работу
                </Button>
                {!isMobile && (
                  <Button size="lg" variant="outline" c="white" style={{ borderColor: 'white' }}>
                    Подробнее
                  </Button>
                )}
              </Group>
            </Stack>
          </Center>

          {/* Features */}
          <Grid py={isMobile ? 20 : 40}>
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
              <Card shadow="lg" padding={isMobile ? 'md' : 'xl'} radius="md">
                <Stack align="center" gap="md">
                  <Award size={isMobile ? 36 : 48} color="#667eea" />
                  <Title order={isMobile ? 4 : 3} ta="center">Управление документами</Title>
                  <Text size="sm" c="dimmed" ta="center">
                    Отслеживайте сроки действия всех дипломов и сертификатов. Получайте уведомления о необходимости продления.
                  </Text>
                </Stack>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
              <Card shadow="lg" padding={isMobile ? 'md' : 'xl'} radius="md">
                <Stack align="center" gap="md">
                  <BookOpen size={isMobile ? 36 : 48} color="#667eea" />
                  <Title order={isMobile ? 4 : 3} ta="center">Обучение</Title>
                  <Text size="sm" c="dimmed" ta="center">
                    Записывайтесь на курсы от ведущих морских учебных заведений. Интеграция с системой дистанционного обучения.
                  </Text>
                </Stack>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
              <Card shadow="lg" padding={isMobile ? 'md' : 'xl'} radius="md">
                <Stack align="center" gap="md">
                  <Users size={isMobile ? 36 : 48} color="#667eea" />
                  <Title order={isMobile ? 4 : 3} ta="center">HR-управление</Title>
                  <Text size="sm" c="dimmed" ta="center">
                    Планируйте обучение сотрудников, контролируйте сроки документов, формируйте отчеты.
                  </Text>
                </Stack>
              </Card>
            </Grid.Col>
          </Grid>

          {/* Stats */}
          <Card shadow="lg" padding={isMobile ? 'md' : 'xl'} radius="md">
            <Grid>
              <Grid.Col span={{ base: 6, sm: 3 }}>
                <Stack align="center" gap="xs">
                  <Text size={isMobile ? 'lg' : 'xl'} fw={700} c="blue">5000+</Text>
                  <Text size="sm" c="dimmed" ta="center">Пользователей</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 6, sm: 3 }}>
                <Stack align="center" gap="xs">
                  <Text size={isMobile ? 'lg' : 'xl'} fw={700} c="blue">15</Text>
                  <Text size="sm" c="dimmed" ta="center">Учебных заведений</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 6, sm: 3 }}>
                <Stack align="center" gap="xs">
                  <Text size={isMobile ? 'lg' : 'xl'} fw={700} c="blue">200+</Text>
                  <Text size="sm" c="dimmed" ta="center">Курсов</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 6, sm: 3 }}>
                <Stack align="center" gap="xs">
                  <Text size={isMobile ? 'lg' : 'xl'} fw={700} c="blue">98%</Text>
                  <Text size="sm" c="dimmed" ta="center">Удовлетворенность</Text>
                </Stack>
              </Grid.Col>
            </Grid>
          </Card>

          {/* Footer */}
          <Group justify="center" py="xl">
            <Text c="white" size={isMobile ? 'xs' : 'sm'} ta="center">
              © 2025 Личный кабинет моряка. Все права защищены.
            </Text>
          </Group>
        </Stack>
      </Container>
    </Box>
  );
}
