'use client';

import React, { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
  UserCheck,
  UserX,
  Users,
  ChevronLeft,
  ChevronRight,
  Edit2,
} from 'lucide-react';
import type { AdminUser, PaginationMeta } from '../types/admin.types';
import { format } from 'date-fns';
import { EditCustomerDialog } from './EditCustomerDialog';

interface UsersTableProps {
  users: AdminUser[];
  meta?: PaginationMeta;
  isLoading: boolean;
  page: number;
  onPageChange: (page: number) => void;
  onToggleStatus: (id: string, isActive: boolean) => Promise<any>;
  onUpdate: (id: string, data: { fullName?: string; phone?: string }) => Promise<any>;
}

/** Skeleton para la tabla mientras carga */
function TableSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={`skeleton-${i}`} className="flex items-center gap-4 p-4 rounded-lg bg-white/2">
          <div className="h-10 w-10 rounded-full bg-white/5 animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 bg-white/5 rounded animate-pulse" />
            <div className="h-3 w-48 bg-white/5 rounded animate-pulse" />
          </div>
          <div className="h-6 w-16 bg-white/5 rounded-full animate-pulse" />
          <div className="h-8 w-20 bg-white/5 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}

/** Estado vacío cuando no hay clientes */
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="p-4 bg-white/3 rounded-2xl border border-white/6 mb-4">
        <Users className="w-10 h-10 text-zinc-500" />
      </div>
      <h3 className="text-lg font-semibold text-zinc-300 mb-1">Sin clientes registrados</h3>
      <p className="text-sm text-zinc-500 max-w-xs">
        Aún no hay clientes en el sistema. Usa el botón &quot;Crear Cliente&quot; para añadir el primero.
      </p>
    </div>
  );
}

export const UsersTable: React.FC<UsersTableProps> = ({
  users,
  meta,
  isLoading,
  page,
  onPageChange,
  onToggleStatus,
  onUpdate,
}) => {
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const columns = useMemo<ColumnDef<AdminUser>[]>(
    () => [
      {
        header: 'Cliente',
        accessorKey: 'profile.fullName',
        cell: ({ row }) => (
          <div>
            <p className="font-medium text-zinc-100">{row.original.profile?.fullName ?? '—'}</p>
            <p className="text-xs text-zinc-500">{row.original.email}</p>
          </div>
        ),
      },
      {
        header: 'Cédula',
        accessorKey: 'profile.cedula',
        cell: ({ row }) => (
          <span className="font-mono text-xs text-zinc-300">
            {row.original.profile?.cedula ?? '—'}
          </span>
        ),
      },
      {
        header: 'Estado',
        accessorKey: 'isActive',
        cell: ({ row }) => (
          <Badge
            variant={row.original.isActive ? 'default' : 'destructive'}
            className={
              row.original.isActive
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/15'
                : 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/15'
            }
          >
            {row.original.isActive ? 'Activo' : 'Inactivo'}
          </Badge>
        ),
      },
      {
        header: 'Registro',
        accessorKey: 'createdAt',
        cell: ({ row }) => (
          <span className="text-xs text-zinc-400">
            {format(new Date(row.original.createdAt), 'dd/MM/yyyy')}
          </span>
        ),
      },
      {
        id: 'actions',
        header: () => <div className="text-right">Acciones</div>,
        cell: ({ row }) => (
          <div className="flex justify-end gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setEditingUser(row.original);
                setIsEditDialogOpen(true);
              }}
              className="text-zinc-400 hover:text-white hover:bg-white/5"
              aria-label={`Editar ${row.original.profile?.fullName}`}
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleStatus(row.original.id, !row.original.isActive)}
              className="text-zinc-400 hover:text-white hover:bg-white/5"
              aria-label={
                row.original.isActive
                  ? `Desactivar ${row.original.profile?.fullName}`
                  : `Activar ${row.original.profile?.fullName}`
              }
            >
              {row.original.isActive ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
            </Button>
          </div>
        ),
      },
    ],
    [onToggleStatus]
  );

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <TableSkeleton />;
  if (users.length === 0) return <EmptyState />;

  return (
    <div className="space-y-4">
      {/* ── Tabla Desktop ── */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-white/6 bg-white/2">
        <table className="w-full text-sm text-left">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-white/6 bg-white/2">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-4 text-xs font-medium text-zinc-400 uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-white/4">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-white/2 transition-colors duration-150">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Cards Mobile (Se mantiene manual para control UX específico) ── */}
      <div className="md:hidden space-y-3">
        {Array.isArray(users) && users.map((user) => (
          <div key={user.id} className="p-4 rounded-xl bg-white/2 border border-white/6 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-zinc-100">{user.profile?.fullName ?? '—'}</p>
                <p className="text-xs text-zinc-500">{user.email}</p>
              </div>
              <Badge variant={user.isActive ? 'default' : 'destructive'} className={
                user.isActive 
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-red-500/10 text-red-400 border-red-500/20'
              }>
                {user.isActive ? 'Activo' : 'Inactivo'}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span className="font-mono">{user.profile?.cedula ?? '—'}</span>
              <span>{format(new Date(user.createdAt), 'dd/MM/yyyy')}</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingUser(user);
                  setIsEditDialogOpen(true);
                }}
                className="flex-1 border-white/10 text-zinc-300 hover:bg-white/5"
              >
                <Edit2 className="w-3.5 h-3.5 mr-2" /> Editar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onToggleStatus(user.id, !user.isActive)}
                className="flex-1 border-white/10 text-zinc-300 hover:bg-white/5"
              >
                {user.isActive ? (
                  <><UserX className="w-3.5 h-3.5 mr-2" /> Desactivar</>
                ) : (
                  <><UserCheck className="w-3.5 h-3.5 mr-2" /> Activar</>
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Paginación ── */}
      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-zinc-500">
            Mostrando {users.length} de {meta.total} clientes
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
              className="text-zinc-400 hover:text-white"
              aria-label="Página anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-xs text-zinc-400 tabular-nums">
              {page} / {meta.totalPages}
            </span>
            <Button
              variant="ghost"
              size="sm"
              disabled={page >= meta.totalPages}
              onClick={() => onPageChange(page + 1)}
              className="text-zinc-400 hover:text-white"
              aria-label="Página siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
      
      <EditCustomerDialog
        user={editingUser}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onUpdate={onUpdate}
      />
    </div>
  );
};
