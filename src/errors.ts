export class AuthKitError extends Error {
	constructor(
		message: string,
		public code: string,
		public statusCode = 400,
		public data?: Record<string, unknown>,
	) {
		super(message);
		this.name = "AuthKitError";
	}

	toJSON() {
		return {
			error: {
				code: this.code,
				message: this.message,
				statusCode: this.statusCode,
				data: this.data,
			},
		};
	}
}

export class AuthenticationError extends AuthKitError {
	constructor(
		message: string,
		public statusCode = 401,
		public data?: Record<string, unknown>,
	) {
		super(message, "AUTHENTICATION_ERROR", statusCode, data);
		this.name = "AuthenticationError";
	}
}

export class AuthorizationError extends AuthKitError {
	constructor(
		message: string,
		public statusCode = 403,
		public data?: Record<string, unknown>,
	) {
		super(message, "AUTHORIZATION_ERROR", statusCode, data);
		this.name = "AuthorizationError";
	}
}

export class NotFoundError extends AuthKitError {
	constructor(entity: string, id?: string | number) {
		const message = id
			? `${entity} with ID ${id} not found`
			: `${entity} not found`;
		super(message, "NOT_FOUND", 404);
		this.name = "NotFoundError";
	}
}

export class DatabaseError extends AuthKitError {
	constructor(message: string, originalError?: Error) {
		super(
			message,
			"DATABASE_ERROR",
			500,
			originalError ? { originalError: originalError.message } : undefined,
		);
		this.name = "DatabaseError";
	}
}

export class RateLimitError extends AuthKitError {
	constructor(message = "Rate limit exceeded", retryAfter?: number) {
		super(
			message,
			"RATE_LIMIT_ERROR",
			429,
			retryAfter ? { retryAfter } : undefined,
		);
		this.name = "RateLimitError";
	}
}
