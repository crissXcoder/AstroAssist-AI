import { ApiErrorResponse } from './api-types';

/**
 * Clase base para errores de API.
 */
export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly error: string;
  public readonly errors?: Record<string, string[]>;
  public readonly path?: string;

  constructor(data: ApiErrorResponse) {
    super(data.message);
    this.name = 'ApiError';
    this.statusCode = data.statusCode;
    this.error = data.error;
    this.errors = data.errors;
    this.path = data.path;
  }
}

/**
 * Error de Validación (400)
 */
export class ValidationError extends ApiError {
  constructor(data: ApiErrorResponse) {
    super(data);
    this.name = 'ValidationError';
  }
}

/**
 * Error de Autenticación/Autorización (401, 403)
 */
export class AuthError extends ApiError {
  constructor(data: ApiErrorResponse) {
    super(data);
    this.name = 'AuthError';
  }
}

/**
 * Error de No Encontrado (404)
 */
export class NotFoundError extends ApiError {
  constructor(data: ApiErrorResponse) {
    super(data);
    this.name = 'NotFoundError';
  }
}

/**
 * Error de Conflicto (409)
 */
export class ConflictError extends ApiError {
  constructor(data: ApiErrorResponse) {
    super(data);
    this.name = 'ConflictError';
  }
}

/**
 * Mapeador de respuestas de error a instancias de clases de error.
 */
export const mapApiError = (errorResponse: ApiErrorResponse): ApiError => {
  switch (errorResponse.statusCode) {
    case 400:
      return new ValidationError(errorResponse);
    case 401:
    case 403:
      return new AuthError(errorResponse);
    case 404:
      return new NotFoundError(errorResponse);
    case 409:
      return new ConflictError(errorResponse);
    default:
      return new ApiError(errorResponse);
  }
};
