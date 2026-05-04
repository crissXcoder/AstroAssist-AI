'use client';

import React, { useState, useTransition } from 'react';
import { useAdminUsers } from '../hooks/useAdminUsers';
import { UsersTable } from './UsersTable';
import { CreateCustomerDialog } from './CreateCustomerDialog';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Search, Users, AlertCircle, RefreshCw } from 'lucide-react';

/**
 * Página principal de gestión de clientes para el panel admin.
 * Implementa TanStack Query para el estado del servidor y evita efectos secundarios manuales.
 */
export const AdminUsersPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [, startTransition] = useTransition();

  const {
    users,
    meta,
    isLoading,
    isError,
    error,
    refetch,
    createCustomer,
    updateCustomer,
    toggleStatus,
  } = useAdminUsers({
    page,
    limit: 10,
    search: search.trim() || undefined,
  });

  // Manejo de búsqueda con transición para no bloquear el UI
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    
    startTransition(() => {
      setSearch(value);
      setPage(1);
    });
  };

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <Users className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Gestión de Clientes</h1>
            <p className="text-sm text-zinc-500">
              {isLoading ? 'Cargando...' : meta ? `${meta.total} clientes registrados` : '—'}
            </p>
          </div>
        </div>
        <CreateCustomerDialog onCreateCustomer={async (payload) => { await createCustomer(payload); }} />
      </div>

      {/* ── Search + Refresh ── */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
          <Input
            id="admin-search-users"
            placeholder="Buscar por nombre, email o cédula..."
            value={searchInput}
            onChange={handleSearch}
            className="pl-10 bg-white/3 border-white/6 text-white placeholder:text-zinc-600"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => refetch()}
          disabled={isLoading}
          className="border-white/6 text-zinc-400 hover:text-white hover:bg-white/5 shrink-0"
          aria-label="Refrescar lista"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      {/* ── Error Global ── */}
      {isError && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-sm text-red-400">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <p>
            {error instanceof Error 
              ? error.message 
              : (error as unknown as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Error al cargar los usuarios'}
          </p>
        </div>
      )}

      {/* ── Tabla ── */}
      <UsersTable
        users={users}
        meta={meta}
        isLoading={isLoading}
        page={page}
        onPageChange={setPage}
        onToggleStatus={async (id, isActive) => { await toggleStatus({ id, isActive }); }}
        onUpdate={async (id, payload) => {
          try {
            await updateCustomer({ id, payload });
            return { success: true };
          } catch (err: unknown) {
            return { 
              success: false, 
              error: (err as unknown as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Error al actualizar el cliente' 
            };
          }
        }}
      />
    </div>
  );
};
