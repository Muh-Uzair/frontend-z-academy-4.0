export enum UserRoles {
  STUDENT = "student",
  INSTRUCTOR = "instructor",
  ACADEMY = "academy",
}

export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  role: string;
  isEmailVerified: boolean;
  otp: string | null;
  otpExpiry: Date | null;
  refreshToken: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}
