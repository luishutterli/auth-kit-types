// Reflecting the database schema
export type EntityStatus = "active" | "suspended" | "deleted";

export interface Organization {
	orgId: number;
	orgName: string;
	orgCreated: Date;
	orgStatus: EntityStatus;
}

export interface Account {
	accId: number;
	accEmail: string;
	accName: string;
	accSurname: string;
	accPasswordHash?: string;
	accEmailVerified: boolean;
	accJWTversion: number;
	accCreated: Date;
	accStatus: EntityStatus;
}

export interface OrgMembership {
	orgId: number;
	accId: number;
	orgMembCreated: Date;
	orgMembStatus: EntityStatus;
}

export interface Group {
	groupId: number;
	groupName: string;
	groupDescription?: string;
	groupCreatedAt: Date;
	groupStatus: EntityStatus;
}

export interface Permission {
	permId: string; // level:resource:action
	permName: string;
	permDescription?: string;
}

export interface GroupGrant {
	groupId: number;
	permId: string;
	groupGrantCreated: Date;
	groupGrantStatus: EntityStatus;
}

export interface GroupMembership {
	groupId: number;
	accId: number;
	orgId?: number;
	groupMembCreated: Date;
	groupMembStatus: EntityStatus;
}

export interface AccountGrant {
	permId: string;
	accId: number;
	orgId: number;
	accGrantCreated: Date;
	accGrantGivenBy: number;
	accGrantStatus: EntityStatus;
}

export interface LoginAttempt {
	loginAttemptId: number;
	loginAttemptSourceIP: string;
	loginAttemptUserAgent: string;
	loginAttemptTime: Date;
	loginAttemptSuccess: boolean;
	accId: number;
}

export interface OAuthAccountLink {
	oauthProviderUID: string;
	oauthProvider: string;
	oauthLinkUsername: string;
	oauthLinkCreated: Date;
	oauthLinkStatus: EntityStatus;
	accId: number;
}

export interface TwoFactorTOTP {
	accId: number;
	totopSecret: string;
	totpConfirmed: boolean;
	totpEnabled: boolean;
	totpCreated: Date;
	totpLastUsed: Date;
}

export interface PasswordReset {
	pwResetId: string;
	pwResetCreated: Date;
	pwResetExpires: Date;
	pwResetUsed: Date;
	accId: number;
}

export interface EmailVerification {
	emailVerificationId: string;
	emailVerificationCreated: Date;
	emailVerificationExpires: Date;
	accId: number;
}
