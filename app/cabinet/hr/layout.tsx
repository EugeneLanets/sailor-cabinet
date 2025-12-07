'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Tabs, Drawer, NavLink, Group, Burger, Box, Stack } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { TrendingUp, Users, Calendar, FileText } from 'lucide-react';

const menuItems = [
  { value: 'dashboard', label: 'Панель управления', icon: TrendingUp, path: '/cabinet/hr' },
  { value: 'employees', label: 'Сотрудники', icon: Users, path: '/cabinet/hr/employees' },
  { value: 'planning', label: 'Планирование', icon: Calendar, path: '/cabinet/hr/planning' },
  { value: 'reports', label: 'Отчеты', icon: FileText, path: '/cabinet/hr/reports' },
];

export default function HRLayout({
                                   children,
                                 }: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [opened, { toggle, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const getActiveTab = () => {
    const item = menuItems.find(item => item.path === pathname);
    return item?.value || 'dashboard';
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    close();
  };

  if (isMobile) {
    return (
      <>
        <Box mb="md">
          <Group justify="space-between">
            <Burger opened={opened} onClick={toggle} size="sm" />
            <Box fw={500}>
              {menuItems.find(item => item.path === pathname)?.label || 'Панель управления'}
            </Box>
            <Box w={30} />
          </Group>
        </Box>

        <Drawer
          opened={opened}
          onClose={close}
          title="Навигация HR"
          padding="md"
          size="xs"
        >
          <Stack gap="xs">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.value}
                  label={item.label}
                  leftSection={<Icon size={20} />}
                  active={pathname === item.path}
                  onClick={() => handleNavigation(item.path)}
                  style={{ borderRadius: '8px' }}
                />
              );
            })}
          </Stack>
        </Drawer>

        <Box>{children}</Box>
      </>
    );
  }

  return (
    <Tabs value={getActiveTab()} onChange={(value) => {
      const item = menuItems.find(i => i.value === value);
      if (item) router.push(item.path);
    }}>
      <Tabs.List>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Tabs.Tab
              key={item.value}
              value={item.value}
              leftSection={<Icon size={16} />}
            >
              {item.label}
            </Tabs.Tab>
          );
        })}
      </Tabs.List>

      <Tabs.Panel value={getActiveTab()} pt="xl">
        {children}
      </Tabs.Panel>
    </Tabs>
  );
}
