'use client';

import { useState, FormEvent } from 'react';
import { Container, Card, Stack, Title, Text, TextInput, PasswordInput, Checkbox, Button, Divider, Anchor, Alert, Group, Box } from '@mantine/core';
import { Ship, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { LoginFormData } from '@/types';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState<LoginFormData>({
    login: '',
    password: '',
    remember: false
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (formData.login && formData.password) {
      const userRole = formData.login.toLowerCase().includes('hr') ? 'hr' : 'sailor';

      login({
        name: userRole === 'hr' ? 'Козлова Анна Ивановна' : 'Иванов Иван Иванович',
        email: formData.login + '@example.com',
        phone: '+7 (999) 123-45-67',
        role: userRole
      });
    }
  };

  return (
    <Box style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Container size="xs" py={80}>
        <Card shadow="xl" padding="xl" radius="md">
          <Stack gap="md">
            <Group justify="center" mb="md">
              <Ship size={40} color="#667eea" />
            </Group>
            <Title order={2} ta="center">Вход в систему</Title>
            <Text size="sm" c="dimmed" ta="center">
              Введите свои учетные данные для доступа к личному кабинету
            </Text>

            <form onSubmit={handleSubmit}>
              <Stack gap="md">
                <TextInput
                  label="Логин"
                  placeholder="Введите логин"
                  required
                  value={formData.login}
                  onChange={(e) => setFormData({...formData, login: e.target.value})}
                />
                <PasswordInput
                  label="Пароль"
                  placeholder="Введите пароль"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <Checkbox
                  label="Запомнить меня на этом компьютере"
                  checked={formData.remember}
                  onChange={(e) => setFormData({...formData, remember: e.currentTarget.checked})}
                />
                <Button type="submit" fullWidth size="md">
                  Войти
                </Button>
              </Stack>
            </form>

            <Divider label="или" labelPosition="center" />

            <Group justify="space-between">
              <Anchor size="sm" onClick={() => router.push('/register')}>
                Регистрация
              </Anchor>
              <Anchor size="sm">
                Забыли пароль?
              </Anchor>
            </Group>

            <Button variant="subtle" fullWidth onClick={() => router.push('/')}>
              Вернуться на главную
            </Button>

            <Alert icon={<Info size={16} />} color="blue" mt="md">
              <Text size="xs">
                Для демонстрации: используйте логин &quot;hr&quot; для входа как HR-специалист или любой другой логин для входа как моряк
              </Text>
            </Alert>
          </Stack>
        </Card>
      </Container>
    </Box>
  );
}
