/**
 * Tipos para el módulo administrativo de gestión de clientes.
 */

export interface AdminUserProfile {
  cedula: string;
  fullName: string;
  birthDate: string;
  phone: string;
}

export interface AdminUserAddress {
  id: string;
  province: string;
  canton: string;
  district: string;
  town: string;
  exactAddress: string;
  postalCode?: string;
  country: string;
  isDefault: boolean;
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'CUSTOMER' | 'ADMIN';
  isActive: boolean;
  emailVerified: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
  profile: AdminUserProfile;
  addresses: AdminUserAddress[];
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedUsersResponse {
  data: AdminUser[];
  meta: PaginationMeta;
}

export interface CreateCustomerPayload {
  email: string;
  password: string;
  confirmPassword: string;
  cedula: string;
  fullName: string;
  birthDate: string;
  phone: string;
  address: {
    province: string;
    canton: string;
    district: string;
    town: string;
    exactAddress: string;
    postalCode?: string;
  };
}

export interface UpdateCustomerPayload {
  email?: string;
  password?: string;
  fullName?: string;
  phone?: string;
  isActive?: boolean;
}
