import { apiClient } from '@/shared/api';
import { ApiResponse } from '@/shared/api/api-types';
import type {
  AdminUser,
  PaginatedUsersResponse,
  CreateCustomerPayload,
  UpdateCustomerPayload,
} from '../types/admin.types';

/**
 * Servicio HTTP para endpoints administrativos de gestión de usuarios.
 * Todas las peticiones requieren cookies de sesión con rol ADMIN.
 */
export const AdminUsersService = {
  /** Obtiene listado paginado de clientes con búsqueda opcional. */
  async getUsers(params: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<PaginatedUsersResponse> {
    const { page = 1, limit = 10, search } = params;
    const queryParams = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    if (search && search.trim().length > 0) {
      queryParams.set('search', search.trim());
    }
    const response = await apiClient.get<PaginatedUsersResponse>(
      `/admin/users?${queryParams.toString()}`
    );
    return response.data;
  },

  /** Obtiene un cliente por su ID. */
  async getUser(id: string): Promise<ApiResponse<AdminUser>> {
    const response = await apiClient.get<ApiResponse<AdminUser>>(`/admin/users/${id}`);
    return response.data;
  },

  /** Crea un nuevo cliente (siempre CUSTOMER). */
  async createUser(payload: CreateCustomerPayload): Promise<ApiResponse<AdminUser>> {
    const response = await apiClient.post<ApiResponse<AdminUser>>('/admin/users', payload);
    return response.data;
  },

  /** Actualiza datos básicos de un cliente. */
  async updateUser(id: string, payload: UpdateCustomerPayload): Promise<ApiResponse<AdminUser>> {
    const response = await apiClient.patch<ApiResponse<AdminUser>>(`/admin/users/${id}`, payload);
    return response.data;
  },

  /** Activa o desactiva un cliente. */
  async updateUserStatus(id: string, isActive: boolean): Promise<ApiResponse<AdminUser>> {
    const response = await apiClient.patch<ApiResponse<AdminUser>>(
      `/admin/users/${id}/status`,
      { isActive }
    );
    return response.data;
  },
};
