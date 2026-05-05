import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetBooking, useGetService } from "@/hooks/useBackend";
import { getBookingStatusKey, statusColors, statusLabels } from "@/types";
import { Link, useParams } from "@tanstack/react-router";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Mail,
  User,
  Waves,
} from "lucide-react";
import { motion } from "motion/react";

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex-shrink-0 text-primary">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground font-body uppercase tracking-wide">
          {label}
        </p>
        <p className="text-sm font-medium text-foreground break-words">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  const { bookingId } = useParams({ from: "/confirmation/$bookingId" });
  const parsedId = bookingId ? BigInt(bookingId) : undefined;

  const {
    data: booking,
    isLoading: bookingLoading,
    isError: bookingError,
  } = useGetBooking(parsedId);

  const { data: service, isLoading: serviceLoading } = useGetService(
    booking?.serviceId,
  );

  const isLoading = bookingLoading || (!!booking && serviceLoading);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center py-24">
        <LoadingSpinner size="lg" label="Loading booking details…" />
      </div>
    );
  }

  if (bookingError || !booking) {
    return (
      <div className="flex flex-1 items-center justify-center py-24 px-6">
        <div className="flex flex-col items-center gap-4">
          <ErrorMessage
            title="Booking not found"
            message="We couldn't find this booking. It may have been removed or the link may be incorrect."
          />
          <Link to="/">
            <Button data-ocid="confirmation.home_button">
              Browse Services
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const statusKey = getBookingStatusKey(booking.status);
  const referenceId = `BK-${booking.id.toString().padStart(6, "0")}`;

  return (
    <div className="flex-1 bg-background">
      {/* Success hero */}
      <section className="bg-card border-b border-border py-16 px-6">
        <motion.div
          className="max-w-lg mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.15,
              duration: 0.4,
              type: "spring",
              stiffness: 180,
            }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6"
          >
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </motion.div>

          <motion.h1
            className="font-display text-4xl font-bold text-foreground mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            data-ocid="confirmation.heading"
          >
            Booking Confirmed!
          </motion.h1>

          <motion.p
            className="text-muted-foreground font-body text-base leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.4 }}
          >
            Your appointment has been successfully booked. We look forward to
            seeing you!
          </motion.p>

          {/* Reference ID chip */}
          <motion.div
            className="mt-6 inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-5 py-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45, duration: 0.35 }}
            data-ocid="confirmation.reference_id"
          >
            <span className="text-xs text-muted-foreground font-body uppercase tracking-widest">
              Reference
            </span>
            <span className="font-mono text-sm font-bold text-primary">
              {referenceId}
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* Booking detail card */}
      <section className="py-12 px-6">
        <motion.div
          className="max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.45 }}
        >
          <Card
            className="shadow-card border-border"
            data-ocid="confirmation.details_card"
          >
            <CardContent className="p-7 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold text-foreground">
                  Appointment Details
                </h2>
                <Badge
                  className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusColors[statusKey]}`}
                  data-ocid="confirmation.status_badge"
                >
                  {statusLabels[statusKey]}
                </Badge>
              </div>

              <Separator className="bg-border" />

              <div className="space-y-4">
                <DetailRow
                  icon={<Waves className="h-4 w-4" />}
                  label="Service"
                  value={service?.name ?? `Service #${booking.serviceId}`}
                />
                <DetailRow
                  icon={<CalendarDays className="h-4 w-4" />}
                  label="Date"
                  value={booking.date}
                />
                <DetailRow
                  icon={<Clock className="h-4 w-4" />}
                  label="Time"
                  value={booking.timeSlot}
                />
              </div>

              <Separator className="bg-border" />

              <div className="space-y-4">
                <DetailRow
                  icon={<User className="h-4 w-4" />}
                  label="Customer Name"
                  value={booking.customerName}
                />
                <DetailRow
                  icon={<Mail className="h-4 w-4" />}
                  label="Email"
                  value={booking.customerEmail}
                />
              </div>
            </CardContent>
          </Card>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                data-ocid="confirmation.browse_button"
              >
                Browse More Services
              </Button>
            </Link>
            <Link to="/">
              <Button
                className="w-full sm:w-auto"
                data-ocid="confirmation.home_button"
              >
                Return to Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
