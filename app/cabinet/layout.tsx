'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell, Container, Group, Title, Text, Menu, UnstyledButton, Avatar, Box, Burger } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Ship, User, Bell, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function CabinetLayout({
                                        children,
                                      }: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div>Загрузка...</div>;
  }

  return (
    <AppShell
      header={{ height: isMobile ? 60 : 70 }}
      padding={isMobile ? 'xs' : 'md'}
      styles={(theme) => ({
        main: { backgroundColor: theme.colors.gray[0] }
      })}
    >
      <AppShell.Header>
        <Container size="xl" h="100%">
          <Group justify="space-between" h="100%">
            <Group gap={isMobile ? 'xs' : 'md'}>
              <Ship size={isMobile ? 24 : 32} color="#1971c2" />
              {!isMobile && (
                <div>
                  <Title order={3}>Личный кабинет моряка</Title>
                  <Text size="xs" c="dimmed">
                    {user.role === 'hr' ? 'Режим: Служба управления персоналом' : 'Режим: Моряк'}
                  </Text>
                </div>
              )}
            </Group>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <UnstyledButton>
                  <Group gap="xs">
                    <Avatar color="blue" radius="xl" size={isMobile ? 'sm' : 'md'}>
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    {!isMobile && (
                      <>
                        <div style={{ flex: 1 }}>
                          <Text size="sm" fw={500}>{user.name}</Text>
                          <Text size="xs" c="dimmed">
                            {user.role === 'hr' ? 'HR-специалист' : 'Моряк'}
                          </Text>
                        </div>
                        <ChevronDown size={16} />
                      </>
                    )}
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>{user.name}</Menu.Label>
                <Menu.Item leftSection={<User size={14} />}>
                  Профиль
                </Menu.Item>
                <Menu.Item leftSection={<Bell size={14} />}>
                  Уведомления
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item leftSection={<LogOut size={14} />} color="red" onClick={logout}>
                  Выход
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="xl">
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
