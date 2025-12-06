import { CertificateStatus, DocumentStatus } from '@/types';

export function getStatusColor(status: CertificateStatus): string {
  switch (status) {
    case 'active':
      return 'green';
    case 'expiring':
      return 'yellow';
    case 'expired':
      return 'red';
    default:
      return 'gray';
  }
}

export function getStatusText(status: CertificateStatus, daysLeft: number): string {
  if (status === 'expired') return 'Истек';
  if (status === 'expiring') return `Истекает через ${daysLeft} дн.`;
  return 'Активен';
}

export function getDocumentStatusColor(status: DocumentStatus): string {
  switch (status) {
    case 'accepted':
      return 'green';
    case 'pending':
      return 'yellow';
    case 'rejected':
      return 'red';
    default:
      return 'gray';
  }
}

export function getDocumentStatusText(status: DocumentStatus): string {
  switch (status) {
    case 'accepted':
      return 'Принят';
    case 'pending':
      return 'На проверке';
    case 'rejected':
      return 'Отклонен';
    case 'expired':
      return 'Истек срок действия';
    default:
      return 'Неизвестно';
  }
}
