import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateBooking,
  useGetService,
  useGetTimeSlotsForDate,
} from "@/hooks/useBackend";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  Mail,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

// ─── Calendar helpers ─────────────────────────────────────────────────────────
const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function toDateStr(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function buildCalendarGrid(
  year: number,
  month: number,
): { day: number | null; pos: number }[][] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks: { day: number | null; pos: number }[][] = [];
  for (let i = 0; i < cells.length; i += 7)
    weeks.push(cells.slice(i, i + 7).map((day, j) => ({ day, pos: i + j })));
  return weeks;
}

// ─── BookingPage ─────────────────────────────────────────────────────────────
export default function BookingPage() {
  const { serviceId } = useParams({ from: "/book/$serviceId" });
  const navigate = useNavigate();

  const parsedServiceId = useMemo(() => {
    try {
      return BigInt(serviceId);
    } catch {
      return undefined;
    }
  }, [serviceId]);

  // Calendar state
  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Form state
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  // Backend queries
  const {
    data: service,
    isLoading: serviceLoading,
    error: serviceError,
  } = useGetService(parsedServiceId);
  const { data: timeSlots, isLoading: slotsLoading } = useGetTimeSlotsForDate(
    parsedServiceId,
    selectedDate ?? "",
  );
  const createBooking = useCreateBooking();

  const canBook =
    !!selectedDate &&
    !!selectedSlot &&
    customerName.trim().length > 0 &&
    customerEmail.trim().length > 0 &&
    !createBooking.isPending;

  const weeks = useMemo(
    () => buildCalendarGrid(calYear, calMonth),
    [calYear, calMonth],
  );
  const todayStr = toDateStr(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  function prevMonth() {
    if (calMonth === 0) {
      setCalYear((y) => y - 1);
      setCalMonth(11);
    } else setCalMonth((m) => m - 1);
  }
  function nextMonth() {
    if (calMonth === 11) {
      setCalYear((y) => y + 1);
      setCalMonth(0);
    } else setCalMonth((m) => m + 1);
  }

  function handleDateSelect(day: number | null) {
    if (!day) return;
    const ds = toDateStr(calYear, calMonth, day);
    if (ds < todayStr) return;
    setSelectedDate(ds);
    setSelectedSlot(null);
  }

  async function handleBook() {
    if (!canBook || !parsedServiceId || !selectedDate || !selectedSlot) return;
    try {
      const result = await createBooking.mutateAsync({
        serviceId: parsedServiceId,
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        date: selectedDate,
        timeSlot: selectedSlot,
      });
      // Extract booking id from result
      const bookingId =
        result && typeof result === "object" && "ok" in result
          ? String((result as { ok: bigint }).ok)
          : String(result);
      navigate({ to: "/confirmation/$bookingId", params: { bookingId } });
    } catch {
      // error handled by createBooking.isError
    }
  }

  if (serviceLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" label="Loading service..." />
      </div>
    );
  }

  if (serviceError || !service) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16">
        <ErrorMessage message="Service not found. Please go back and select a service." />
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => navigate({ to: "/" })}
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Services
        </Button>
      </div>
    );
  }

  const availableSlots = (timeSlots ?? []).filter((s) => s.isAvailable);

  return (
    <div className="min-h-screen bg-background">
      {/* Page header breadcrumb */}
      <div className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-2">
          <button
            type="button"
            data-ocid="booking.back_button"
            onClick={() => navigate({ to: "/" })}
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Services
          </button>
          <span className="text-border">/</span>
          <span className="text-sm font-medium text-foreground">
            {service.name}
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Service summary card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          data-ocid="booking.service_card"
          className="bg-card rounded-2xl border border-border p-6 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="space-y-1">
              <h1 className="text-2xl font-display font-semibold text-foreground">
                {service.name}
              </h1>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-lg">
                {service.description}
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Badge
                variant="secondary"
                className="flex items-center gap-1 px-3 py-1"
              >
                <Clock className="w-3.5 h-3.5" />
                {String(service.durationMinutes)} min
              </Badge>
              <Badge className="flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground">
                <DollarSign className="w-3.5 h-3.5" />
                {service.price === "0" || service.price === "0.00"
                  ? "Free"
                  : `$${service.price}`}
              </Badge>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.08 }}
            data-ocid="booking.calendar"
            className="bg-card rounded-2xl border border-border p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <h2 className="font-display font-medium text-foreground">
                  Select a Date
                </h2>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  data-ocid="booking.calendar_prev"
                  onClick={prevMonth}
                  aria-label="Previous month"
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors duration-150"
                >
                  <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                </button>
                <span className="text-sm font-medium text-foreground w-32 text-center">
                  {MONTH_NAMES[calMonth]} {calYear}
                </span>
                <button
                  type="button"
                  data-ocid="booking.calendar_next"
                  onClick={nextMonth}
                  aria-label="Next month"
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors duration-150"
                >
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Day labels */}
            <div className="grid grid-cols-7 mb-2">
              {DAY_LABELS.map((d) => (
                <div
                  key={d}
                  className="text-center text-xs font-medium text-muted-foreground py-1"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="space-y-1">
              {weeks.map((week) => (
                <div key={`week-${week[0].pos}`} className="grid grid-cols-7">
                  {week.map(({ day, pos }) => {
                    if (!day) return <div key={`cell-${pos}`} />;
                    const ds = toDateStr(calYear, calMonth, day);
                    const isPast = ds < todayStr;
                    const isSelected = ds === selectedDate;
                    const isToday = ds === todayStr;
                    return (
                      <button
                        key={ds}
                        type="button"
                        data-ocid={`booking.calendar_day.${day}`}
                        onClick={() => handleDateSelect(day)}
                        disabled={isPast}
                        aria-label={ds}
                        aria-pressed={isSelected}
                        className={[
                          "relative mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-all duration-150",
                          isPast
                            ? "text-muted-foreground/40 cursor-not-allowed"
                            : "hover:bg-primary/10 cursor-pointer",
                          isSelected
                            ? "bg-primary text-primary-foreground shadow-md hover:bg-primary"
                            : "",
                          isToday && !isSelected
                            ? "ring-2 ring-primary/40 ring-offset-1"
                            : "",
                          !isPast && !isSelected ? "text-foreground" : "",
                        ].join(" ")}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Time slots + form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.16 }}
            className="flex flex-col gap-5"
          >
            {/* Time slots */}
            <div
              data-ocid="booking.timeslots_panel"
              className="bg-card rounded-2xl border border-border p-6 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-primary" />
                <h2 className="font-display font-medium text-foreground">
                  Available Times
                </h2>
              </div>

              {!selectedDate && (
                <div
                  data-ocid="booking.timeslots.empty_state"
                  className="text-center py-8"
                >
                  <div className="text-4xl mb-3">📅</div>
                  <p className="text-muted-foreground text-sm">
                    Pick a date to see available time slots
                  </p>
                </div>
              )}

              {selectedDate && slotsLoading && (
                <div
                  data-ocid="booking.timeslots.loading_state"
                  className="flex justify-center py-8"
                >
                  <LoadingSpinner size="sm" label="Loading slots..." />
                </div>
              )}

              {selectedDate && !slotsLoading && availableSlots.length === 0 && (
                <div
                  data-ocid="booking.timeslots.empty_state"
                  className="text-center py-8"
                >
                  <div className="text-4xl mb-3">😔</div>
                  <p className="text-muted-foreground text-sm">
                    No available slots on this date
                  </p>
                  <p className="text-muted-foreground text-xs mt-1">
                    Try selecting another date
                  </p>
                </div>
              )}

              {selectedDate && !slotsLoading && availableSlots.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {availableSlots.map((slot, i) => {
                    const isActive = selectedSlot === slot.startTime;
                    return (
                      <button
                        type="button"
                        key={slot.startTime}
                        data-ocid={`booking.timeslot.${i + 1}`}
                        onClick={() => setSelectedSlot(slot.startTime)}
                        aria-pressed={isActive}
                        className={[
                          "rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-150 text-center",
                          isActive
                            ? "bg-primary text-primary-foreground border-primary shadow-md"
                            : "bg-background border-border text-foreground hover:border-primary hover:bg-primary/5",
                        ].join(" ")}
                      >
                        {slot.startTime}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Customer info form */}
            <div
              data-ocid="booking.form_panel"
              className="bg-card rounded-2xl border border-border p-6 shadow-sm"
            >
              <h2 className="font-display font-medium text-foreground mb-4">
                Your Details
              </h2>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="customerName"
                    className="flex items-center gap-1.5 text-sm"
                  >
                    <User className="w-3.5 h-3.5 text-muted-foreground" />
                    Full Name
                  </Label>
                  <Input
                    id="customerName"
                    data-ocid="booking.name_input"
                    type="text"
                    placeholder="Jane Smith"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    autoComplete="name"
                    className="bg-background"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="customerEmail"
                    className="flex items-center gap-1.5 text-sm"
                  >
                    <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                    Email Address
                  </Label>
                  <Input
                    id="customerEmail"
                    data-ocid="booking.email_input"
                    type="email"
                    placeholder="jane@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    autoComplete="email"
                    className="bg-background"
                  />
                </div>

                {/* Booking summary strip */}
                {selectedDate && selectedSlot && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="rounded-xl bg-primary/5 border border-primary/15 px-4 py-3 text-sm text-foreground"
                  >
                    <div className="font-medium text-primary mb-1">
                      Booking Summary
                    </div>
                    <div className="space-y-0.5 text-muted-foreground">
                      <div>{service.name}</div>
                      <div>
                        {selectedDate} at {selectedSlot}
                      </div>
                    </div>
                  </motion.div>
                )}

                {createBooking.isError && (
                  <div data-ocid="booking.error_state">
                    <ErrorMessage message="Failed to create booking. Please try again." />
                  </div>
                )}

                <Button
                  data-ocid="booking.submit_button"
                  type="button"
                  className="w-full h-11 text-base font-semibold"
                  disabled={!canBook}
                  onClick={handleBook}
                >
                  {createBooking.isPending ? (
                    <span className="flex items-center gap-2">
                      <LoadingSpinner size="sm" />
                      Booking...
                    </span>
                  ) : (
                    "Confirm Booking"
                  )}
                </Button>

                {!canBook && !createBooking.isPending && (
                  <p className="text-xs text-muted-foreground text-center">
                    {!selectedDate
                      ? "Select a date to continue"
                      : !selectedSlot
                        ? "Select a time slot"
                        : "Enter your name and email to continue"}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
