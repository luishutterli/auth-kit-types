import type { Organization, Permission } from "./models";

export interface User {
	id: number;
	email: string;
	name: string;
	surname: string;
	emailVerified: boolean;
	createdAt: Date;
	twoFactorEnabled: boolean;
	organizations?: Organization[];
	permissions?: Array<
		Permission & {
			type: "global" | "organization";
			organizationId?: number;
		}
	>;
}

export interface JWTPayload {
    // -- standard claims
    iss: string; // issuer
    sub: number; // user id
    exp: number; // expiration
    nbf?: number; // not before
    iat: number; // issued at
    jti?: string; // jwt id
    alg?: string; // algorithm
    kid?: string; // key id
    // -- custom claims
    user: User;
    requires2FA?: boolean;
    ver?: number; // version, used for invalidation
}

export interface AuthResult {
    accessToken: string;
    refreshToken?: string;
    expiresIn: number;
    user: User;
    requires2FA?: boolean;
}