import { RegisterDto } from '@/src/types/dtos/register.dto';
import { LoginDto } from '@/src/types/dtos/login.dto';

/**
 * Estructura estándar de respuesta del servidor.
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data: T;
  timestamp: string;
}

/**
 * Estructura estándar de error del servidor.
 */
export interface ApiErrorResponse {
  success: false;
  message: string;
  error: string;
  statusCode: number;
  errors?: Record<string, string[]>;
  timestamp: string;
  path: string;
}

export interface AuthProfile {
  cedula: string;
  fullName: string;
  birthDate: string;
  phone: string;
}

export interface AuthAddress {
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

/**
 * Tipos de Auth
 */
export interface AuthUser {
  id: string;
  email: string;
  role: 'CUSTOMER' | 'ADMIN';
  isActive: boolean;
  emailVerified: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
  profile: AuthProfile;
  addresses: AuthAddress[];
}

export interface Session {
  id: string;
  userId: string;
  userAgent?: string;
  ipAddress?: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface LoginResponse {
  user: AuthUser;
  // Tokens se manejan via cookies httpOnly, pero el backend podría retornar info básica
}

export type RegisterPayload = RegisterDto;

export type LoginPayload = LoginDto;
