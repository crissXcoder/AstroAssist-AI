'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Guardia que protege rutas para usuarios autenticados.
 * Si el usuario es 'guest', redirige al login.
 * Si está 'checking', puede mostrar un fallback (spinner/skeleton).
 */
export const AuthGuard: React.FC<AuthGuardProps> = ({ children, fallback }) => {
  const { status, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === 'guest') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'checking' || status === 'idle') {
    return <>{fallback || null}</>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
