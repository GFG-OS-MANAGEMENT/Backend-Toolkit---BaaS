/**
 * Backend Toolkit - BaaS
 * Error Handling Package
 *
 * TODO:
 * - Define base application error.
 * - Define common error types.
 * - Define error codes.
 * - Add HTTP error support.
 * - Add error serialization.
 * - Add tests.
 */

export interface ErrorDetails {
  // TODO: Define error details.
}

export type ErrorCode =
  | string;

export class BaseError extends Error {
  // TODO: Implement base application error.
}

export class ValidationError extends BaseError {
  // TODO: Implement validation error.
}

export class AuthenticationError extends BaseError {
  // TODO: Implement authentication error.
}