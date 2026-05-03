'use client';

import React from 'react';
import { useAuth } from '@/features/auth';

interface AdminGuardProps {
  children: React.ReactNode;
}

/**
 * Guardia que restringe el acceso solo a usuarios con rol ADMIN.
 */
export const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
  const { isAdmin, status } = useAuth();

  if (status === 'checking' || status === 'idle') {
    return null; // O un spinner
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Acceso Denegado</h1>
        <p className="text-muted-foreground">
          No tienes permisos suficientes para acceder a esta sección.
        </p>
      </div>
    );
  }

  return <>{children}</>;
};
