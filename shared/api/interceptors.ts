import { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { mapApiError } from './api-errors';
import { ApiErrorResponse } from './api-types';

/**
 * Flag para evitar múltiples llamadas de refresco concurrentes.
 */
let isRefreshing = false;

/**
 * Cola de peticiones esperando a que el token se refresque.
 */
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason: unknown) => void;
}> = [];

/**
 * Procesa la cola de peticiones una vez que el refresco ha terminado.
 */
const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

/**
 * Configura los interceptores en una instancia de Axios.
 */
export const setupInterceptors = (
  instance: AxiosInstance,
  onLogout: () => void
): void => {
  // Interceptor de Request (Opcional, por ahora solo loguea en dev)
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Si el backend requiere algo específico en cada request, se añade aquí.
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  // Interceptor de Response (Corazón del manejo de 401 y Refresh)
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError<ApiErrorResponse>) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      // Caso 1: Error 401 (No autorizado) y no es un reintento
      if (error.response?.status === 401 && !originalRequest._retry) {
        
        // Si ya estamos refrescando, encolamos la petición
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => instance(originalRequest))
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          // Intentamos refrescar la sesión (el backend usa cookies HttpOnly)
          await instance.post('/auth/refresh');
          
          isRefreshing = false;
          processQueue(null);
          
          return instance(originalRequest);
        } catch (refreshError: unknown) {
          isRefreshing = false;
          processQueue(refreshError instanceof Error ? refreshError : new Error('Refresh failed'));
          
          // Si el refresco falla, cerramos sesión
          onLogout();
          return Promise.reject(refreshError);
        }
      }

      // Caso 2: Cualquier otro error de API, lo mapeamos a nuestras clases personalizadas
      if (error.response?.data) {
        return Promise.reject(mapApiError(error.response.data));
      }

      return Promise.reject(error);
    }
  );
};
