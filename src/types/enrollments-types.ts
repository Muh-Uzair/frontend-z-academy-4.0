// Enum for enrollment status
export enum EnrollmentStatus {
  ACTIVE = "active",
  COMPLETED = "completed",
  DROPPED = "dropped",
}

// Enum for payment status
export enum PaymentStatus {
  PAID = "paid",
  PENDING = "pending",
  REFUNDED = "refunded",
}

// Interface for TypeScript
export interface IEnrollment {
  student: string;
  course: string;
  instructor: string;

  enrollmentDate: string;
  status: EnrollmentStatus;
  paymentStatus: PaymentStatus;

  amountPaid: number;
  originalPrice: number;

  createdAt: Date;
  updatedAt: Date;
}
