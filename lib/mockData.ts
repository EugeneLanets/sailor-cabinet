import { Certificate, Course, Document, Order, Employee, EmployeeCertificate } from '@/types';

export const mockCertificates: Certificate[] = [
  {
    id: 1,
    name: 'Диплом механика',
    institution: 'ГУМРФ им. адм. С.О. Макарова',
    issueDate: '15.03.2020',
    expiryDate: '15.03.2025',
    status: 'active',
    daysLeft: 120
  },
  {
    id: 2,
    name: 'Сертификат ПБМТП',
    institution: 'ЦМАК',
    issueDate: '10.06.2021',
    expiryDate: '10.06.2024',
    status: 'expiring',
    daysLeft: 45
  },
  {
    id: 3,
    name: 'Сертификат по оказанию первой помощи',
    institution: 'ГУМРФ им. адм. С.О. Макарова',
    issueDate: '20.01.2019',
    expiryDate: '20.01.2024',
    status: 'expired',
    daysLeft: -180
  }
];

export const mockCourses: Course[] = [
  {
    id: 1,
    name: 'Переподготовка механиков',
    duration: '120 часов (15 дней)',
    format: 'Смешанный',
    institution: 'ГУМРФ',
    direction: 'Судовые механики',
    price: '45000 руб.',
    startDate: '01.05.2025',
    hasLMS: true
  },
  {
    id: 2,
    name: 'Курс английского языка для моряков',
    duration: '80 часов (10 дней)',
    format: 'Дистанционно',
    institution: 'ЦМАК',
    direction: 'Языковая подготовка',
    price: '25000 руб.',
    startDate: '15.04.2025',
    hasLMS: true
  },
  {
    id: 3,
    name: 'Управление судном в штормовых условиях',
    duration: '40 часов (5 дней)',
    format: 'Очно',
    institution: 'ГУМРФ',
    direction: 'Судовождение',
    price: '35000 руб.',
    startDate: '10.04.2025',
    hasLMS: false
  }
];

export const mockDocuments: Document[] = [
  {
    id: 1,
    name: 'Паспорт (разворот с фото)',
    uploadDate: '12.02.2025',
    status: 'accepted',
    comment: 'Документ принят'
  },
  {
    id: 2,
    name: 'Диплом (лицевая сторона)',
    uploadDate: '12.02.2025',
    status: 'pending',
    comment: null
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-2025-001',
    date: '01.03.2025',
    status: 'В обработке',
    paymentStatus: 'Ожидает оплаты',
    total: '45000 руб.',
    courses: ['Переподготовка механиков']
  }
];

// Хелпер для создания сертификатов сотрудников с правильной типизацией
const createEmployeeCertificate = (
  name: string,
  expiryDate: string,
  daysLeft: number,
  status: 'active' | 'expiring' | 'expired'
): EmployeeCertificate => ({
  name,
  expiryDate,
  daysLeft,
  status
});

export const mockEmployees: Employee[] = [
  {
    id: 1,
    name: 'Петров Петр Петрович',
    position: 'Старший механик',
    department: 'Машинное отделение',
    vessel: 'СЕВ "Арктика"',
    phone: '+7 (999) 111-22-33',
    email: 'petrov@example.com',
    certificates: [
      createEmployeeCertificate('Диплом механика', '15.01.2025', 42, 'expiring'),
      createEmployeeCertificate('Сертификат ПБМТП', '20.12.2024', 16, 'expiring')
    ]
  },
  {
    id: 2,
    name: 'Сидоров Сергей Сергеевич',
    position: 'Второй механик',
    department: 'Машинное отделение',
    vessel: 'СЕВ "Арктика"',
    phone: '+7 (999) 222-33-44',
    email: 'sidorov@example.com',
    certificates: [
      createEmployeeCertificate('Диплом механика', '10.11.2024', -24, 'expired')
    ]
  },
  {
    id: 3,
    name: 'Михайлов Михаил Михайлович',
    position: 'Капитан',
    department: 'Командный состав',
    vessel: 'СЕВ "Север"',
    phone: '+7 (999) 333-44-55',
    email: 'mikhailov@example.com',
    certificates: [
      createEmployeeCertificate('Диплом капитана', '15.06.2025', 193, 'active'),
      createEmployeeCertificate('Сертификат ПБМТП', '30.01.2025', 57, 'expiring')
    ]
  },
  {
    id: 4,
    name: 'Николаев Николай Николаевич',
    position: 'Старший помощник капитана',
    department: 'Командный состав',
    vessel: 'СЕВ "Север"',
    phone: '+7 (999) 444-55-66',
    email: 'nikolaev@example.com',
    certificates: [
      createEmployeeCertificate('Диплом штурмана', '20.03.2025', 106, 'active')
    ]
  },
  {
    id: 5,
    name: 'Александров Александр Александрович',
    position: 'Электромеханик',
    department: 'Электротехническое отделение',
    vessel: 'СЕВ "Арктика"',
    phone: '+7 (999) 555-66-77',
    email: 'alexandrov@example.com',
    certificates: [
      createEmployeeCertificate('Диплом электромеханика', '05.02.2025', 62, 'expiring'),
      createEmployeeCertificate('Сертификат по электробезопасности', '15.12.2024', 11, 'expiring')
    ]
  }
];
