// Типы пользователя
export type UserRole = 'sailor' | 'hr';

export interface User {
  id?: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string | null;
}

// Типы документов и сертификатов
export type CertificateStatus = 'active' | 'expiring' | 'expired';

export interface Certificate {
  id: number;
  name: string;
  institution: string;
  issueDate: string;
  expiryDate: string;
  status: CertificateStatus;
  daysLeft: number;
}

// Типы курсов
export type CourseFormat = 'Очно' | 'Дистанционно' | 'Смешанный';

export interface Course {
  id: number;
  name: string;
  duration: string;
  format: CourseFormat;
  institution: string;
  direction: string;
  price: string;
  startDate: string;
  hasLMS: boolean;
}

// Типы документов для загрузки
export type DocumentStatus = 'accepted' | 'pending' | 'rejected' | 'expired';

export interface Document {
  id: number;
  name: string;
  uploadDate: string;
  status: DocumentStatus;
  comment?: string | null;
}

// Типы заказов
export type OrderStatus = 'В обработке' | 'Завершен' | 'Отменен';
export type PaymentStatus = 'Ожидает оплаты' | 'Оплачен' | 'Отменен';

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  total: string;
  courses: string[];
}

// Типы для HR
export interface EmployeeCertificate {
  name: string;
  expiryDate: string;
  daysLeft: number;
  status: CertificateStatus;
}

export interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  vessel: string;
  phone: string;
  email: string;
  certificates: EmployeeCertificate[];
}

export interface ExpiringCertificate extends EmployeeCertificate {
  employeeName: string;
  position: string;
  employeeId: number;
}

// Типы форм
export interface LoginFormData {
  login: string;
  password: string;
  remember: boolean;
}

export interface RegisterFormData {
  login: string;
  password: string;
  passwordRepeat: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  captcha: string;
  agreeMarketing: boolean;
  agreePersonalData: boolean;
}

export interface ProfileFormData {
  lastName: string;
  firstName: string;
  middleName?: string;
  lastNameEn?: string;
  firstNameEn?: string;
  birthDate: string;
  citizenship: string;
  passportSeries: string;
  passportNumber: string;
  passportIssueDate: string;
  passportIssuedBy: string;
  snils: string;
  address: string;
  phone: string;
  institution: string;
  graduationDate: string;
  specialty: string;
}
