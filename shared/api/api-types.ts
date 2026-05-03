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

/**
 * Tipos de Auth
 */
export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  cedula: string;
  role: 'CUSTOMER' | 'ADMIN';
  isAdmin?: boolean;
  isEmailVerified: boolean;
  avatarUrl?: string;
  district?: string;
  canton?: string;
  province?: string;
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

export interface RegisterPayload {
  email: string;
  password?: string;
  cedula: string;
  fullName: string;
  birthDate: string;
  phone: string;
  province: string;
  canton: string;
  district: string;
  city: string;
  exactAddress: string;
  postalCode?: string;
}

export interface LoginPayload {
  email: string;
  password?: string;
}
