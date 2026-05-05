// Shared types matching backend Motoko types

export interface Service {
  id: bigint;
  name: string;
  description: string;
  durationMinutes: bigint;
  price: string;
  isActive: boolean;
}

export type { BookingStatus } from "@/backend";
import type { BookingStatus } from "@/backend";

export interface Booking {
  id: bigint;
  serviceId: bigint;
  customerName: string;
  customerEmail: string;
  date: string;
  timeSlot: string;
  status: BookingStatus;
  createdAt: bigint;
}

export interface TimeSlot {
  startTime: string;
  isAvailable: boolean;
}

export type { DayAvailability, DayOfWeek, TimeRange } from "@/backend";

export interface CreateBookingRequest {
  serviceId: bigint;
  customerName: string;
  customerEmail: string;
  date: string;
  timeSlot: string;
}

// UI helper types
export type BookingStatusKey =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";

export function getBookingStatusKey(status: BookingStatus): BookingStatusKey {
  return status as BookingStatusKey;
}

export const statusLabels: Record<BookingStatusKey, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const statusColors: Record<BookingStatusKey, string> = {
  pending: "bg-accent/20 text-accent-foreground border border-accent/30",
  confirmed: "bg-primary/15 text-primary border border-primary/25",
  completed: "bg-muted text-muted-foreground border border-border",
  cancelled: "bg-destructive/15 text-destructive border border-destructive/25",
};
