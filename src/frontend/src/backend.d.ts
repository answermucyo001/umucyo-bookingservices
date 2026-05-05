import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type ServiceId = bigint;
export interface DayAvailability {
    day: DayOfWeek;
    ranges: Array<TimeRange>;
}
export type Timestamp = bigint;
export interface TimeSlot {
    startTime: TimeStr;
    isAvailable: boolean;
}
export interface CreateBookingRequest {
    customerName: string;
    date: DateStr;
    serviceId: ServiceId;
    customerEmail: string;
    timeSlot: TimeStr;
}
export type BookingId = bigint;
export interface Service {
    id: ServiceId;
    name: string;
    description: string;
    isActive: boolean;
    durationMinutes: bigint;
    price: string;
}
export interface UpdateServiceRequest {
    id: ServiceId;
    name: string;
    description: string;
    durationMinutes: bigint;
    price: string;
}
export type WeeklyAvailability = Array<DayAvailability>;
export interface TimeRange {
    startTime: TimeStr;
    endTime: TimeStr;
}
export type TimeStr = string;
export interface Booking {
    id: BookingId;
    customerName: string;
    status: BookingStatus;
    date: DateStr;
    createdAt: Timestamp;
    serviceId: ServiceId;
    customerEmail: string;
    timeSlot: TimeStr;
}
export interface CreateServiceRequest {
    name: string;
    description: string;
    durationMinutes: bigint;
    price: string;
}
export type DateStr = string;
export enum BookingStatus {
    cancelled = "cancelled",
    pending = "pending",
    completed = "completed",
    confirmed = "confirmed"
}
export enum DayOfWeek {
    tuesday = "tuesday",
    wednesday = "wednesday",
    saturday = "saturday",
    thursday = "thursday",
    sunday = "sunday",
    friday = "friday",
    monday = "monday"
}
export interface backendInterface {
    cancelBooking(id: BookingId): Promise<boolean>;
    createBooking(req: CreateBookingRequest): Promise<BookingId>;
    createService(req: CreateServiceRequest): Promise<Service>;
    deleteService(id: ServiceId): Promise<boolean>;
    getAdmin(): Promise<Principal | null>;
    getAvailability(): Promise<WeeklyAvailability>;
    getAvailableSlots(serviceId: ServiceId, date: DateStr): Promise<Array<TimeSlot>>;
    getBooking(id: BookingId): Promise<Booking | null>;
    getService(id: ServiceId): Promise<Service | null>;
    listBookings(): Promise<Array<Booking>>;
    listPastBookings(): Promise<Array<Booking>>;
    listServices(): Promise<Array<Service>>;
    listUpcomingBookings(): Promise<Array<Booking>>;
    setAdmin(): Promise<void>;
    setAvailability(schedule: WeeklyAvailability): Promise<void>;
    updateBookingStatus(id: BookingId, status: BookingStatus): Promise<boolean>;
    updateService(req: UpdateServiceRequest): Promise<boolean>;
}
