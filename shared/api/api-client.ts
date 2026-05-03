import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

/**
 * Instancia central de Axios para todas las peticiones al backend.
 * Configurada para manejar cookies httpOnly de forma automática.
 */
export const apiClient = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Nota: Los interceptores se configuran en un archivo aparte para evitar ciclos de dependencia.
