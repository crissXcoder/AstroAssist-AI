'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminUsersService } from '../services/admin-users.service';
import type { CreateCustomerPayload, UpdateCustomerPayload } from '../types/admin.types';

export const ADMIN_USERS_KEY = ['admin', 'users'] as const;

/**
 * Hook centralizado para la gestión de usuarios administrativos usando TanStack Query.
 * Implementa cache, revalidación y optimizaciones de estado del servidor.
 */
export function useAdminUsers(params: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  const queryClient = useQueryClient();

  // Query: Listado de usuarios
  const usersQuery = useQuery({
    queryKey: [...ADMIN_USERS_KEY, params],
    queryFn: () => AdminUsersService.getUsers(params),
    staleTime: 1000 * 60, // 1 minuto
  });

  // Mutation: Crear cliente
  const createMutation = useMutation({
    mutationFn: (payload: CreateCustomerPayload) => AdminUsersService.createUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_USERS_KEY });
    },
  });

  // Mutation: Actualizar cliente
  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateCustomerPayload }) =>
      AdminUsersService.updateUser(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_USERS_KEY });
    },
  });

  // Mutation: Cambiar estado (Activo/Inactivo)
  const statusMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      AdminUsersService.updateUserStatus(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_USERS_KEY });
    },
  });

  return {
    // Data
    users: Array.isArray(usersQuery.data?.data) ? usersQuery.data.data : [],
    meta: usersQuery.data?.meta,
    isLoading: usersQuery.isLoading,
    isError: usersQuery.isError,
    error: usersQuery.error,

    // Actions
    createCustomer: createMutation.mutateAsync,
    isCreating: createMutation.isPending,

    updateCustomer: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,

    toggleStatus: statusMutation.mutateAsync,
    isChangingStatus: statusMutation.isPending,

    // Helpers
    refetch: usersQuery.refetch,
  };
}
