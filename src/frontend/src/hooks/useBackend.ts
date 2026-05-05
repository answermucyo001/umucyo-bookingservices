import { createActor } from "@/backend";
import type {
  Booking,
  CreateBookingRequest,
  CreateServiceRequest,
  DayAvailability,
  Service,
  TimeSlot,
  UpdateServiceRequest,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ─── Actor hook ────────────────────────────────────────────────────────────────
export function useBackendActor() {
  return useActor(createActor);
}

// ─── Services ──────────────────────────────────────────────────────────────────
export function useListServices() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: async () => {
      if (!actor) return [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).listServices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetService(id: bigint | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Service | null>({
    queryKey: ["service", id?.toString()],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await (actor as any).getService(id);
      if (result && "__kind__" in result && result.__kind__ === "None")
        return null;
      if (result && "__kind__" in result && result.__kind__ === "Some")
        return result.value as Service;
      return (result as Service) ?? null;
    },
    enabled: !!actor && !isFetching && id !== undefined,
  });
}

export function useCreateService() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (req: CreateServiceRequest) => {
      if (!actor) throw new Error("Not connected");
      return actor.createService(req);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });
}

export function useUpdateService() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (req: UpdateServiceRequest) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateService(req);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });
}

export function useDeleteService() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).deleteService(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });
}

// ─── Availability ──────────────────────────────────────────────────────────────
export function useGetAvailability() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<DayAvailability[]>({
    queryKey: ["availability"],
    queryFn: async () => {
      if (!actor) return [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).getAvailability();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetAvailability() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (availability: DayAvailability[]) => {
      if (!actor) throw new Error("Not connected");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).setAvailability(availability);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["availability"] }),
  });
}

export function useGetTimeSlotsForDate(
  serviceId: bigint | undefined,
  date: string,
) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<TimeSlot[]>({
    queryKey: ["timeslots", serviceId?.toString(), date],
    queryFn: async () => {
      if (!actor || !serviceId || !date) return [];
      return actor.getAvailableSlots(serviceId, date);
    },
    enabled: !!actor && !isFetching && !!serviceId && !!date,
  });
}

// ─── Bookings ──────────────────────────────────────────────────────────────────
export function useListBookings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Booking[]>({
    queryKey: ["bookings"],
    queryFn: async () => {
      if (!actor) return [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).listBookings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetBooking(id: bigint | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Booking | null>({
    queryKey: ["booking", id?.toString()],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await (actor as any).getBooking(id);
      if (result && "__kind__" in result && result.__kind__ === "None")
        return null;
      if (result && "__kind__" in result && result.__kind__ === "Some")
        return result.value as Booking;
      return (result as Booking) ?? null;
    },
    enabled: !!actor && !isFetching && id !== undefined,
  });
}

export function useCreateBooking() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (req: CreateBookingRequest) => {
      if (!actor) throw new Error("Not connected");
      return actor.createBooking(req);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bookings"] }),
  });
}

export function useCancelBooking() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).cancelBooking(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bookings"] }),
  });
}

// ─── Admin ─────────────────────────────────────────────────────────────────────
export function useGetAdmin() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<string | null>({
    queryKey: ["admin"],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.getAdmin();
      if (result === null || result === undefined) return null;
      return result.toText();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetAdmin() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.setAdmin();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin"] }),
  });
}
