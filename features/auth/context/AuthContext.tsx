'use client';

import React, { 
  createContext, 
  useContext, 
  useEffect, 
  useState, 
  useCallback,
  useMemo
} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AuthUser, LoginPayload, RegisterPayload } from '@/shared/api/api-types';
import { AuthService } from '../services/auth.service';
import { setupInterceptors } from '@/shared/api/interceptors';
import { apiClient } from '@/shared/api/api-client';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export type AuthStatus = 'idle' | 'checking' | 'authenticated' | 'guest';

interface AuthContextType {
  user: AuthUser | null;
  status: AuthStatus;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isCustomer: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: (options?: { localOnly?: boolean }) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_CHANNEL_NAME = 'astroassist_auth_channel';
const PROTECTED_ROUTES = ['/dashboard', '/profile', '/settings', '/checkout', '/admin'];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  // ── Sincronización Cross-Tab ──────────────────────────────────────────
  const authChannel = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return new BroadcastChannel(AUTH_CHANNEL_NAME);
  }, []);

  // ── Sesión con TanStack Query ─────────────────────────────────────────
  const { 
    data: sessionResponse, 
    status: queryStatus,
    fetchStatus,
    refetch 
  } = useQuery({
    queryKey: ['auth', 'session'],
    queryFn: () => AuthService.getMe(),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutos de validez
  });

  const user = sessionResponse?.data || null;
  
  // Derivación de estado para compatibilidad
  const status = useMemo((): AuthStatus => {
    if (queryStatus === 'pending' && fetchStatus === 'fetching') return 'checking';
    if (user) return 'authenticated';
    return 'guest';
  }, [queryStatus, fetchStatus, user]);

  const logout = useCallback(async (options?: { localOnly?: boolean }) => {
    try {
      if (!options?.localOnly) {
        await AuthService.logout();
        authChannel?.postMessage({ type: 'LOGOUT' });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      queryClient.setQueryData(['auth', 'session'], null);
      
      const isProtected = PROTECTED_ROUTES.some(route => pathname.includes(route));
      if (isProtected) {
        router.push('/');
      }
    }
  }, [authChannel, pathname, router, queryClient]);

  const login = async (payload: LoginPayload) => {
    const response = await AuthService.login(payload);
    queryClient.setQueryData(['auth', 'session'], response);
    authChannel?.postMessage({ type: 'LOGIN' });
    router.push('/');
  };

  const register = async (payload: RegisterPayload) => {
    const response = await AuthService.register(payload);
    queryClient.setQueryData(['auth', 'session'], response);
    authChannel?.postMessage({ type: 'LOGIN' });
    router.push('/');
  };

  const refreshUser = useCallback(async () => {
    await refetch();
  }, [refetch]);

  // ── SSE: Eventos de Seguridad ─────────────────────────────────────────
  useEffect(() => {
    if (status !== 'authenticated' || !user) return;

    const streamUrl = `${apiClient.defaults.baseURL}/sessions/stream`;
    const eventSource = new EventSource(streamUrl, { withCredentials: true });

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'FORCE_LOGOUT' || data.type === 'SESSION_REVOKED') {
          console.warn(`⚠️ [Auth] Sesión invalidada por el servidor: ${data.type}`);
          logout({ localOnly: true });
        }
      } catch (err) {
        console.error('Error parsing SSE message:', err);
      }
    };

    eventSource.onerror = (err) => {
      console.error('SSE Error:', err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [status, user, logout]);

  // ── Inicialización ──────────────────────────────────────────────────
  useEffect(() => {
    setupInterceptors(apiClient, logout);

    if (authChannel) {
      authChannel.onmessage = (event) => {
        if (event.data.type === 'LOGOUT') {
          logout({ localOnly: true });
        } else if (event.data.type === 'LOGIN') {
          refetch();
        }
      };
    }

    return () => {
      authChannel?.close();
    };
  }, [logout, refetch, authChannel]);

  const value = useMemo(() => ({
    user,
    status,
    isAuthenticated: status === 'authenticated',
    isAdmin: user?.role === 'ADMIN',
    isCustomer: user?.role === 'CUSTOMER',
    login,
    register,
    logout,
    refreshUser,
  }), [user, status, login, register, logout, refreshUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
