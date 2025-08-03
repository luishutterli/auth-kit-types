import type { User } from "./auth";

export interface AuthKitConfig {
	baseUrl: string;
  port?: number; // default: 6575
	name: string;
	jwtConfig: JWTConfig;
	passwordPolicy?: PasswordPolicy;
	passwordHashAlgorithm: "SHA-512";
	passwordSaltLength: 32; // 32 bytes = 256 bits, 64 hex characters
	enforceVerifiedEmail?: boolean; // default: true
  emailEnumerationProtection?: boolean; // default: true 
	databaseConfig: DatabaseConfig;
	autoCreateSchema: boolean;
	oauthProviders?: OAuthProvider[];
	sendOutgoingMessage: (
		messageType: "verifyEmail" | "resetPassword",
		user: User,
		relUrl: string, // relative URL
	) => Promise<void>;
}

export interface TOTPConfig {
	issuer?: string; // If not provided, defaults to the AuthKitConfig name
	algorithm: "HS256";
	digits: number;
	period: number;
	secretLength: number;
	windowSize: number;
}

export interface OAuthProvider {
	name: string;
	clientId: string;
	clientSecret: string;
	authorizationEndpoint: string;
	tokenEndpoint: string;
	redirectUri: string;
	scope: string[];
	userInfoEndpoint: string;
}

export interface JWTConfig {
	issuer?: string; // If not provided, defaults to the AuthKitConfig name
	secret: string;
	expiresIn: string;
	algorithm: "HS256";
	jwtStorageLocation: "cookie";
	cookieName?: string;
	cookieOptions?: {
		httpOnly: boolean;
		secure: boolean;
		sameSite: "Strict" | "Lax" | "None";
		maxAge: number;
		path?: string;
		domain?: string;
	};
}

export interface DatabaseConfig {
	type: "mysql" | "postgres";
	url: string;
	port?: number;
	username: string;
	secret: string;
	database?: string;
}

export interface PasswordPolicy {
	minLength: number;
	maxLength?: number;
	requireUppercase: boolean;
	requireLowercase: boolean;
	requireNumbers: boolean;
  requireSpecialCharacters: boolean;
}
