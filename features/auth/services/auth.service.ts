import { apiClient } from '@/shared/api';
import { 
  ApiResponse, 
  AuthUser, 
  LoginPayload, 
  RegisterPayload 
} from '@/shared/api/api-types';

/**
 * Servicio encargado de las peticiones de autenticación.
 */
export const AuthService = {
  /**
   * Registra un nuevo usuario.
   */
  async register(payload: RegisterPayload): Promise<ApiResponse<AuthUser>> {
    const response = await apiClient.post<ApiResponse<AuthUser>>('/auth/register', payload);
    return response.data;
  },

  /**
   * Inicia sesión.
   */
  async login(payload: LoginPayload): Promise<ApiResponse<AuthUser>> {
    const response = await apiClient.post<ApiResponse<AuthUser>>('/auth/login', payload);
    return response.data;
  },

  /**
   * Cierra la sesión.
   */
  async logout(): Promise<ApiResponse<void>> {
    const response = await apiClient.post<ApiResponse<void>>('/auth/logout');
    return response.data;
  },

  /**
   * Obtiene la información del usuario actual (basado en cookies).
   */
  async getMe(): Promise<ApiResponse<AuthUser>> {
    const response = await apiClient.get<ApiResponse<AuthUser>>('/auth/me');
    return response.data;
  },

  /**
   * Verifica el estado del servidor.
   */
  async checkHealth(): Promise<ApiResponse<{ status: string }>> {
    const response = await apiClient.get<ApiResponse<{ status: string }>>('/health');
    return response.data;
  }
};
