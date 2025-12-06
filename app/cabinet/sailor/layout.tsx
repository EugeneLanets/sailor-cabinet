'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Tabs } from '@mantine/core';
import { User, Award, BookOpen, Upload, FileText } from 'lucide-react';

export default function SailorLayout({
                                       children,
                                     }: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Определяем активную вкладку из URL
  const getActiveTab = () => {
    if (pathname === '/cabinet/sailor') return 'dashboard';
    if (pathname.includes('/certificates')) return 'certificates';
    if (pathname.includes('/courses')) return 'courses';
    if (pathname.includes('/profile')) return 'profile';
    if (pathname.includes('/documents')) return 'documents';
    if (pathname.includes('/orders')) return 'orders';
    return 'dashboard';
  };

  const handleTabChange = (value: string | null) => {
    if (value === 'dashboard') {
      router.push('/cabinet/sailor');
    } else {
      router.push(`/cabinet/sailor/${value}`);
    }
  };

  return (
    <Tabs value={getActiveTab()} onChange={handleTabChange}>
      <Tabs.List>
        <Tabs.Tab value="dashboard" leftSection={<User size={16} />}>
          Главная
        </Tabs.Tab>
        <Tabs.Tab value="certificates" leftSection={<Award size={16} />}>
          Документы
        </Tabs.Tab>
        <Tabs.Tab value="courses" leftSection={<BookOpen size={16} />}>
          Курсы
        </Tabs.Tab>
        <Tabs.Tab value="profile" leftSection={<User size={16} />}>
          Анкета
        </Tabs.Tab>
        <Tabs.Tab value="documents" leftSection={<Upload size={16} />}>
          Загрузка
        </Tabs.Tab>
        <Tabs.Tab value="orders" leftSection={<FileText size={16} />}>
          Заказы
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value={getActiveTab()} pt="xl">
        {children}
      </Tabs.Panel>
    </Tabs>
  );
}
