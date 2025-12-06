'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Tabs } from '@mantine/core';
import { TrendingUp, Users, Calendar, FileText } from 'lucide-react';

export default function HRLayout({
                                   children,
                                 }: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Определяем активную вкладку из URL
  const getActiveTab = () => {
    if (pathname === '/cabinet/hr') return 'dashboard';
    if (pathname.includes('/employees')) return 'employees';
    if (pathname.includes('/planning')) return 'planning';
    if (pathname.includes('/reports')) return 'reports';
    return 'dashboard';
  };

  const handleTabChange = (value: string | null) => {
    if (value === 'dashboard') {
      router.push('/cabinet/hr');
    } else {
      router.push(`/cabinet/hr/${value}`);
    }
  };

  return (
    <Tabs value={getActiveTab()} onChange={handleTabChange}>
      <Tabs.List>
        <Tabs.Tab value="dashboard" leftSection={<TrendingUp size={16} />}>
          Панель управления
        </Tabs.Tab>
        <Tabs.Tab value="employees" leftSection={<Users size={16} />}>
          Сотрудники
        </Tabs.Tab>
        <Tabs.Tab value="planning" leftSection={<Calendar size={16} />}>
          Планирование
        </Tabs.Tab>
        <Tabs.Tab value="reports" leftSection={<FileText size={16} />}>
          Отчеты
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value={getActiveTab()} pt="xl">
        {children}
      </Tabs.Panel>
    </Tabs>
  );
}
