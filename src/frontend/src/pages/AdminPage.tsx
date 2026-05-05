import type { Booking, DayAvailability, DayOfWeek, Service } from "@/backend";
import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import {
  useCancelBooking,
  useCreateService,
  useDeleteService,
  useGetAdmin,
  useGetAvailability,
  useListBookings,
  useListServices,
  useSetAdmin,
  useSetAvailability,
  useUpdateService,
} from "@/hooks/useBackend";
import { getBookingStatusKey, statusColors, statusLabels } from "@/types";
import {
  CalendarDays,
  Check,
  Edit2,
  KeyRound,
  LogIn,
  MoreVertical,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// ─── Service Form ──────────────────────────────────────────────────────────────
interface ServiceFormData {
  name: string;
  description: string;
  durationMinutes: string;
  price: string;
}

const EMPTY_FORM: ServiceFormData = {
  name: "",
  description: "",
  durationMinutes: "60",
  price: "0.00",
};

function ServiceForm({
  initial,
  onSave,
  onCancel,
  isPending,
}: {
  initial?: ServiceFormData;
  onSave: (data: ServiceFormData) => void;
  onCancel: () => void;
  isPending: boolean;
}) {
  const [form, setForm] = useState<ServiceFormData>(initial ?? EMPTY_FORM);
  function set(key: keyof ServiceFormData, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }
  return (
    <div
      className="bg-muted/40 rounded-xl border border-border p-5 space-y-4"
      data-ocid="services.service_form"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="svc-name">Service Name</Label>
          <Input
            id="svc-name"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="e.g. Deep Tissue Massage"
            data-ocid="services.name_input"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="svc-price">Price</Label>
          <Input
            id="svc-price"
            value={form.price}
            onChange={(e) => set("price", e.target.value)}
            placeholder="e.g. $50.00"
            data-ocid="services.price_input"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="svc-desc">Description</Label>
        <Textarea
          id="svc-desc"
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Brief description of the service…"
          rows={3}
          data-ocid="services.description_textarea"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="svc-duration">Duration (minutes)</Label>
        <Input
          id="svc-duration"
          type="number"
          min="5"
          step="5"
          value={form.durationMinutes}
          onChange={(e) => set("durationMinutes", e.target.value)}
          data-ocid="services.duration_input"
        />
      </div>
      <div className="flex items-center gap-3 pt-1">
        <Button
          type="button"
          onClick={() => onSave(form)}
          disabled={isPending || !form.name.trim()}
          data-ocid="services.save_button"
        >
          <Check className="h-4 w-4 mr-1.5" />
          Save Service
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          data-ocid="services.cancel_button"
        >
          <X className="h-4 w-4 mr-1.5" />
          Cancel
        </Button>
      </div>
    </div>
  );
}

// ─── Services Tab ──────────────────────────────────────────────────────────────
function ServicesTab() {
  const { data: services = [], isLoading } = useListServices();
  const createSvc = useCreateService();
  const updateSvc = useUpdateService();
  const deleteSvc = useDeleteService();
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState<bigint | null>(null);

  function handleAdd(data: ServiceFormData) {
    createSvc.mutate(
      {
        name: data.name,
        description: data.description,
        durationMinutes: BigInt(data.durationMinutes || "60"),
        price: data.price,
      },
      { onSuccess: () => setShowAdd(false) },
    );
  }

  function handleEdit(service: Service, data: ServiceFormData) {
    updateSvc.mutate(
      {
        id: service.id,
        name: data.name,
        description: data.description,
        durationMinutes: BigInt(data.durationMinutes || "60"),
        price: data.price,
      },
      { onSuccess: () => setEditId(null) },
    );
  }

  if (isLoading)
    return (
      <div className="py-12 flex justify-center">
        <LoadingSpinner label="Loading services…" />
      </div>
    );

  return (
    <div className="space-y-4" data-ocid="services.list">
      {services.length === 0 && !showAdd && (
        <div
          className="text-center py-16 text-muted-foreground"
          data-ocid="services.empty_state"
        >
          <CalendarDays className="h-10 w-10 mx-auto mb-3 opacity-40" />
          <p className="font-display text-base font-medium mb-1">
            No services yet
          </p>
          <p className="text-sm">Add your first service to get started.</p>
        </div>
      )}

      {services.map((svc, i) => (
        <div key={svc.id.toString()} data-ocid={`services.item.${i + 1}`}>
          {editId === svc.id ? (
            <ServiceForm
              initial={{
                name: svc.name,
                description: svc.description,
                durationMinutes: svc.durationMinutes.toString(),
                price: svc.price,
              }}
              onSave={(d) => handleEdit(svc, d)}
              onCancel={() => setEditId(null)}
              isPending={updateSvc.isPending}
            />
          ) : (
            <Card className="shadow-subtle border-border">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display font-semibold text-foreground">
                        {svc.name}
                      </h3>
                      <Badge variant="secondary" className="text-xs">
                        {svc.durationMinutes.toString()} min
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {svc.description}
                    </p>
                    <p className="mt-1.5 text-sm font-medium text-primary">
                      {svc.price}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditId(svc.id)}
                      aria-label="Edit service"
                      data-ocid={`services.edit_button.${i + 1}`}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteSvc.mutate(svc.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      aria-label="Delete service"
                      data-ocid={`services.delete_button.${i + 1}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ))}

      {showAdd ? (
        <ServiceForm
          onSave={handleAdd}
          onCancel={() => setShowAdd(false)}
          isPending={createSvc.isPending}
        />
      ) : (
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowAdd(true)}
          className="w-full border-dashed"
          data-ocid="services.add_button"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      )}
    </div>
  );
}

// ─── Availability Tab ──────────────────────────────────────────────────────────
function AvailabilityTab() {
  const { data: availability = [], isLoading } = useGetAvailability();
  const setAvailability = useSetAvailability();
  const [initialized, setInitialized] = useState(false);
  const [localDays, setLocalDays] = useState<
    Array<{ enabled: boolean; startTime: string; endTime: string }>
  >(
    DAY_NAMES.map(() => ({
      enabled: false,
      startTime: "09:00",
      endTime: "17:00",
    })),
  );

  if (!isLoading && !initialized) {
    setInitialized(true);
    setLocalDays(
      DAY_NAMES.map((_, i) => {
        const dayKey = DAY_NAMES[i]?.toLowerCase() as DayOfWeek;
        const day = availability.find((d) => d.day === dayKey);
        const firstRange = day?.ranges[0];
        const lastRange = day?.ranges[day.ranges.length - 1];
        return {
          enabled: !!day && day.ranges.length > 0,
          startTime: firstRange?.startTime ?? "09:00",
          endTime: lastRange?.endTime ?? "17:00",
        };
      }),
    );
  }

  function toggle(i: number) {
    setLocalDays((prev) =>
      prev.map((d, idx) => (idx === i ? { ...d, enabled: !d.enabled } : d)),
    );
  }

  function setTime(i: number, field: "startTime" | "endTime", value: string) {
    setLocalDays((prev) =>
      prev.map((d, idx) => (idx === i ? { ...d, [field]: value } : d)),
    );
  }

  function handleSave() {
    const payload: DayAvailability[] = localDays.flatMap((d, i) => {
      if (!d.enabled) return [];
      const dayKey = DAY_NAMES[i]?.toLowerCase() as DayOfWeek;
      return [
        {
          day: dayKey,
          ranges: [{ startTime: d.startTime, endTime: d.endTime }],
        },
      ];
    });
    setAvailability.mutate(payload);
  }

  if (isLoading)
    return (
      <div className="py-12 flex justify-center">
        <LoadingSpinner label="Loading availability…" />
      </div>
    );

  return (
    <div className="space-y-3" data-ocid="availability.panel">
      {DAY_NAMES.map((day, i) => (
        <Card
          key={day}
          className="shadow-subtle border-border"
          data-ocid={`availability.item.${i + 1}`}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-3 w-36">
                <Switch
                  checked={localDays[i]?.enabled ?? false}
                  onCheckedChange={() => toggle(i)}
                  data-ocid={`availability.toggle.${i + 1}`}
                />
                <span
                  className={`text-sm font-medium font-body ${
                    localDays[i]?.enabled
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {day}
                </span>
              </div>

              {localDays[i]?.enabled ? (
                <div className="flex items-center gap-2 flex-1 flex-wrap">
                  <div className="space-y-0.5">
                    <p className="text-xs text-muted-foreground">Start</p>
                    <Input
                      type="time"
                      value={localDays[i]?.startTime ?? "09:00"}
                      onChange={(e) => setTime(i, "startTime", e.target.value)}
                      className="w-32 h-8 text-sm"
                      data-ocid={`availability.start_time.${i + 1}`}
                    />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs text-muted-foreground">End</p>
                    <Input
                      type="time"
                      value={localDays[i]?.endTime ?? "17:00"}
                      onChange={(e) => setTime(i, "endTime", e.target.value)}
                      className="w-32 h-8 text-sm"
                      data-ocid={`availability.end_time.${i + 1}`}
                    />
                  </div>
                </div>
              ) : (
                <span className="text-xs text-muted-foreground italic">
                  Closed
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="pt-2">
        <Button
          type="button"
          onClick={handleSave}
          disabled={setAvailability.isPending}
          data-ocid="availability.save_button"
        >
          {setAvailability.isPending ? "Saving…" : "Save Availability"}
        </Button>
      </div>
    </div>
  );
}

// ─── Bookings Tab ──────────────────────────────────────────────────────────────
function BookingRow({
  booking,
  index,
  onCancel,
}: {
  booking: Booking;
  index: number;
  onCancel: (id: bigint) => void;
}) {
  const statusKey = getBookingStatusKey(booking.status);
  const canCancel = statusKey !== "cancelled" && statusKey !== "completed";
  return (
    <tr
      className="border-b border-border hover:bg-muted/30 transition-colors"
      data-ocid={`bookings.item.${index}`}
    >
      <td className="py-3 px-4">
        <div>
          <p className="text-sm font-medium text-foreground">
            {booking.customerName}
          </p>
          <p className="text-xs text-muted-foreground">
            {booking.customerEmail}
          </p>
        </div>
      </td>
      <td className="py-3 px-4 text-sm text-foreground">
        #{booking.serviceId.toString()}
      </td>
      <td className="py-3 px-4 text-sm text-foreground">{booking.date}</td>
      <td className="py-3 px-4 text-sm text-foreground">{booking.timeSlot}</td>
      <td className="py-3 px-4">
        <Badge
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[statusKey]}`}
          data-ocid={`bookings.status_badge.${index}`}
        >
          {statusLabels[statusKey]}
        </Badge>
      </td>
      <td className="py-3 px-4 text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              aria-label="Booking actions"
              data-ocid={`bookings.actions_button.${index}`}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {canCancel ? (
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => onCancel(booking.id)}
                data-ocid={`bookings.cancel_button.${index}`}
              >
                Cancel Booking
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem disabled>No actions available</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
}

function BookingsTab() {
  const { data: bookings = [], isLoading } = useListBookings();
  const cancelBooking = useCancelBooking();
  const [view, setView] = useState<"upcoming" | "past">("upcoming");
  const now = new Date().toISOString().split("T")[0] ?? "";
  const upcoming = bookings.filter((b) => b.date >= now);
  const past = bookings.filter((b) => b.date < now);
  const displayed = view === "upcoming" ? upcoming : past;

  if (isLoading)
    return (
      <div className="py-12 flex justify-center">
        <LoadingSpinner label="Loading bookings…" />
      </div>
    );

  return (
    <div data-ocid="bookings.panel">
      <Tabs
        value={view}
        onValueChange={(v) => setView(v as "upcoming" | "past")}
      >
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming" data-ocid="bookings.upcoming_tab">
            Upcoming ({upcoming.length})
          </TabsTrigger>
          <TabsTrigger value="past" data-ocid="bookings.past_tab">
            Past ({past.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={view}>
          {displayed.length === 0 ? (
            <div
              className="text-center py-16 text-muted-foreground"
              data-ocid="bookings.empty_state"
            >
              <CalendarDays className="h-10 w-10 mx-auto mb-3 opacity-40" />
              <p className="font-display font-medium mb-1">
                No {view} bookings
              </p>
              <p className="text-sm">
                They will appear here once customers book.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-border shadow-subtle">
              <table className="w-full" data-ocid="bookings.table">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    {["Customer", "Service", "Date", "Time", "Status", ""].map(
                      (h) => (
                        <th
                          key={h}
                          className="py-3 px-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide"
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {displayed.map((booking, i) => (
                    <BookingRow
                      key={booking.id.toString()}
                      booking={booking}
                      index={i + 1}
                      onCancel={(id) => cancelBooking.mutate(id)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ─── Login Card ────────────────────────────────────────────────────────────────
function LoginCard({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="flex flex-1 items-center justify-center py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card
          className="shadow-card border-border max-w-sm w-full"
          data-ocid="admin.login_card"
        >
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <KeyRound className="h-7 w-7 text-primary" />
            </div>
            <CardTitle className="font-display text-2xl">
              Provider Portal
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Sign in with Internet Identity to manage your services,
              availability, and bookings.
            </p>
          </CardHeader>
          <CardContent className="pt-4">
            <Button
              type="button"
              onClick={onLogin}
              className="w-full gap-2"
              data-ocid="admin.login_button"
            >
              <LogIn className="h-4 w-4" />
              Sign in with Internet Identity
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

// ─── Setup Card ────────────────────────────────────────────────────────────────
function SetupCard({
  principal,
  onSetup,
  isPending,
}: {
  principal: string;
  onSetup: () => void;
  isPending: boolean;
}) {
  return (
    <div className="flex flex-1 items-center justify-center py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card
          className="shadow-card border-border max-w-sm w-full"
          data-ocid="admin.setup_card"
        >
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-accent/20">
              <KeyRound className="h-7 w-7 text-accent-foreground" />
            </div>
            <CardTitle className="font-display text-2xl">
              Set Up Admin
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Register your Internet Identity as the administrator of this
              booking system.
            </p>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="rounded-lg bg-muted/60 border border-border p-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                Your Principal
              </p>
              <p className="font-mono text-xs text-foreground break-all">
                {principal}
              </p>
            </div>
            <Button
              type="button"
              onClick={onSetup}
              disabled={isPending}
              className="w-full"
              data-ocid="admin.setup_button"
            >
              {isPending ? "Setting up…" : "Set Up as Admin"}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

// ─── Main AdminPage ────────────────────────────────────────────────────────────
export default function AdminPage() {
  const {
    isAuthenticated,
    isLoading: authLoading,
    principal,
    login,
  } = useAuth();
  const { data: adminPrincipal, isLoading: adminLoading } = useGetAdmin();
  const setAdmin = useSetAdmin();

  if (authLoading || adminLoading) {
    return (
      <div className="flex flex-1 items-center justify-center py-24">
        <LoadingSpinner size="lg" label="Loading…" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginCard onLogin={login} />;
  }

  const principalStr = principal?.toText() ?? "";
  const noAdminSet = adminPrincipal === null || adminPrincipal === undefined;
  const isAdmin = !noAdminSet && adminPrincipal === principalStr;

  if (noAdminSet) {
    return (
      <SetupCard
        principal={principalStr}
        onSetup={() => setAdmin.mutate()}
        isPending={setAdmin.isPending}
      />
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-1 items-center justify-center py-24 px-6">
        <ErrorMessage
          title="Access Denied"
          message="Your account does not have admin privileges for this booking system."
        />
      </div>
    );
  }

  return (
    <div className="flex-1 bg-background">
      {/* Dashboard header */}
      <section className="bg-card border-b border-border py-8 px-6">
        <div className="container max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <h1 className="font-display text-3xl font-bold text-foreground">
              Provider Dashboard
            </h1>
            <p className="text-muted-foreground text-sm mt-1 font-body">
              Manage your services, availability, and customer bookings.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tab content */}
      <section className="py-8 px-6">
        <div className="container max-w-5xl mx-auto">
          <Tabs defaultValue="services">
            <TabsList className="mb-6" data-ocid="admin.tabs">
              <TabsTrigger value="services" data-ocid="admin.services_tab">
                Services
              </TabsTrigger>
              <TabsTrigger
                value="availability"
                data-ocid="admin.availability_tab"
              >
                Availability
              </TabsTrigger>
              <TabsTrigger value="bookings" data-ocid="admin.bookings_tab">
                Bookings
              </TabsTrigger>
            </TabsList>

            <Separator className="mb-6" />

            <TabsContent value="services">
              <ServicesTab />
            </TabsContent>
            <TabsContent value="availability">
              <AvailabilityTab />
            </TabsContent>
            <TabsContent value="bookings">
              <BookingsTab />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
