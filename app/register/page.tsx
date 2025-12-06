'use client';

import { useState, FormEvent } from 'react';
import { Container, Card, Stack, Title, Text, TextInput, PasswordInput, Button, Divider, Anchor, Group, Box, Grid, Checkbox } from '@mantine/core';
import { Ship } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { RegisterFormData } from '@/types';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [formData, setFormData] = useState<RegisterFormData>({
    login: '',
    password: '',
    passwordRepeat: '',
    email: '',
    firstName: '',
    lastName: '',
    middleName: '',
    captcha: '',
    agreeMarketing: false,
    agreePersonalData: true
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (formData.password === formData.passwordRepeat && formData.agreePersonalData) {
      register(formData);
    }
  };

  return (
    <Box style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Container size="sm" py={40}>
        <Card shadow="xl" padding="xl" radius="md">
          <Stack gap="md">
            <Group justify="center" mb="md">
              <Ship size={40} color="#667eea" />
            </Group>
            <Title order={2} ta="center">Регистрация</Title>
            <Text size="sm" c="dimmed" ta="center">
              Создайте учетную запись для доступа к платформе
            </Text>

            <form onSubmit={handleSubmit}>
              <Stack gap="md">
                <TextInput
                  label="Логин"
                  placeholder="Придумайте логин"
                  required
                  value={formData.login}
                  onChange={(e) => setFormData({...formData, login: e.target.value})}
                />
                <PasswordInput
                  label="Пароль"
                  placeholder="Придумайте пароль"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <PasswordInput
                  label="Повтор пароля"
                  placeholder="Повторите пароль"
                  required
                  value={formData.passwordRepeat}
                  onChange={(e) => setFormData({...formData, passwordRepeat: e.target.value})}
                  error={formData.password !== formData.passwordRepeat && formData.passwordRepeat ? 'Пароли не совпадают' : null}
                />
                <TextInput
                  label="Email"
                  placeholder="example@mail.com"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />

                <Divider label="Персональные данные" />

                <Grid>
                  <Grid.Col span={12}>
                    <TextInput
                      label="Фамилия"
                      placeholder="Иванов"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <TextInput
                      label="Имя"
                      placeholder="Иван"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <TextInput
                      label="Отчество"
                      placeholder="Иванович"
                      value={formData.middleName}
                      onChange={(e) => setFormData({...formData, middleName: e.target.value})}
                    />
                  </Grid.Col>
                </Grid>

                <TextInput
                  label="Защитный код (captcha)"
                  placeholder="Введите код с картинки"
                  required
                  value={formData.captcha}
                  onChange={(e) => setFormData({...formData, captcha: e.target.value})}
                />

                <Checkbox
                  label="Согласие на получение информационных и рекламных рассылок"
                  checked={formData.agreeMarketing}
                  onChange={(e) => setFormData({...formData, agreeMarketing: e.currentTarget.checked})}
                />

                <Checkbox
                  label="Даю свое согласие на обработку моих персональных данных"
                  checked={formData.agreePersonalData}
                  onChange={(e) => setFormData({...formData, agreePersonalData: e.currentTarget.checked})}
                  required
                />

                <Button type="submit" fullWidth size="md" disabled={!formData.agreePersonalData}>
                  Зарегистрироваться
                </Button>
              </Stack>
            </form>

            <Divider />

            <Group justify="center">
              <Text size="sm">Уже есть аккаунт?</Text>
              <Anchor size="sm" onClick={() => router.push('/login')}>
                Войти
              </Anchor>
            </Group>

            <Button variant="subtle" fullWidth onClick={() => router.push('/')}>
              Вернуться на главную
            </Button>
          </Stack>
        </Card>
      </Container>
    </Box>
  );
}
