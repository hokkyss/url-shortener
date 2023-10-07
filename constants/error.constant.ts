enum ErrorCodes {
  InternalServerError = 'common/internal-server-error',
  InvalidCredentials = 'auth/invalid-credentials',
  NotFound = 'common/not-found',
  Unauthorized = 'auth/unauthorized',
  // TODO: add more codes, e.g. "user/not-found", "tags/bad-request", etc
}

export default ErrorCodes
