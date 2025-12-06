'use client';

import { Stack, Title, Card, Select, FileInput, Textarea, Button, Table, Group, Text, Badge } from '@mantine/core';
import { Upload, FileText } from 'lucide-react';
import { mockDocuments } from '@/lib/mockData';
import { getDocumentStatusColor, getDocumentStatusText } from '@/lib/utils';

export default function DocumentsPage() {
  return (
    <Stack gap="lg">
      <Title order={3}>Загрузка документов</Title>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <Select
            label="Тип документа"
            placeholder="Выберите тип документа"
            data={[
              'Скан-копия паспорта (разворот с фотографией)',
              'Скан-копия паспорта (разворот с пропиской)',
              'Скан-копия рабочего диплома (лицевая сторона)',
              'Скан-копия рабочего диплома (оборотная сторона)',
              'Скан-копия заграничного паспорта',
              'Гарантийное письмо от организации'
            ]}
            required
          />
          <FileInput
            label="Выберите файл"
            placeholder="Выберите файл (PDF, JPG, PNG, TIFF, DJVU)"
            leftSection={<Upload size={14} />}
            required
          />
          <Textarea
            label="Комментарий"
            placeholder="Дополнительная информация..."
            maxLength={255}
          />
          <Button leftSection={<Upload size={16} />}>Загрузить документ</Button>
        </Stack>
      </Card>

      <Title order={4} mt="xl">Загруженные документы</Title>

      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Документ</Table.Th>
            <Table.Th>Дата загрузки</Table.Th>
            <Table.Th>Статус</Table.Th>
            <Table.Th>Комментарий</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {mockDocuments.map(doc => (
            <Table.Tr key={doc.id}>
              <Table.Td>
                <Group gap="xs">
                  <FileText size={16} />
                  <Text size="sm">{doc.name}</Text>
                </Group>
              </Table.Td>
              <Table.Td>
                <Text size="sm">{doc.uploadDate}</Text>
              </Table.Td>
              <Table.Td>
                <Badge color={getDocumentStatusColor(doc.status)}>
                  {getDocumentStatusText(doc.status)}
                </Badge>
              </Table.Td>
              <Table.Td>
                <Text size="sm" c="dimmed">{doc.comment || '—'}</Text>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Stack>
  );
}
