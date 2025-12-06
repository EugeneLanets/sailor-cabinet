'use client';

import { Stack, Title, Card, Grid, TextInput, Select, Button } from '@mantine/core';
import { useAuth } from '@/context/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <Stack gap="lg">
      <Title order={3}>Анкета пользователя</Title>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <Grid>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput label="Фамилия" placeholder="Иванов" required defaultValue="Иванов" />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput label="Имя" placeholder="Иван" required defaultValue="Иван" />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput label="Отчество" placeholder="Иванович" defaultValue="Иванович" />
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput label="Фамилия на английском" placeholder="Ivanov" />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput label="Имя на английском" placeholder="Ivan" />
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput label="Дата рождения" placeholder="01.01.1990" type="date" required />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Select
                label="Гражданство"
                placeholder="Выберите гражданство"
                data={['Гражданство РФ', 'Другое']}
                required
                defaultValue="Гражданство РФ"
              />
            </Grid.Col>
          </Grid>

          <Title order={5} mt="md">Паспортные данные</Title>

          <Grid>
            <Grid.Col span={{ base: 12, md: 3 }}>
              <TextInput label="Серия" placeholder="1234" required />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 3 }}>
              <TextInput label="Номер" placeholder="567890" required />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput label="Дата выдачи" type="date" required />
            </Grid.Col>
          </Grid>

          <TextInput label="Кем выдан" placeholder="Отделом УФМС..." required />
          <TextInput label="СНИЛС" placeholder="123-456-789 00" required />
          <TextInput label="Адрес регистрации" placeholder="г. Москва, ул..." required />
          <TextInput label="Телефон" placeholder="+7 (999) 123-45-67" required defaultValue={user?.phone} />

          <Title order={5} mt="md">Образование</Title>

          <TextInput label="Учебное заведение" placeholder="ГУМРФ..." required />
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput label="Дата окончания" type="date" required />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput label="Специальность" placeholder="Судовой механик" required />
            </Grid.Col>
          </Grid>

          <Button mt="md">Сохранить изменения</Button>
        </Stack>
      </Card>
    </Stack>
  );
}
