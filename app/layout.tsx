import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { AuthProvider } from '@/context/AuthContext';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Личный кабинет моряка',
  description: 'Единая платформа управления документами и обучением моряков',
};

// Создаем тему без colorScheme (удалено в Mantine v7)
const theme = createTheme({
  primaryColor: 'blue',
});

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
    <body>
    <MantineProvider theme={theme}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </MantineProvider>
    </body>
    </html>
  );
}
