import { ErrorMessage } from "@/components/ErrorMessage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useListServices } from "@/hooks/useBackend";
import type { Service } from "@/types";
import { Link } from "@tanstack/react-router";
import { Calendar, Clock, Sparkles } from "lucide-react";
import { motion } from "motion/react";

// ─── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const duration = Number(service.durationMinutes);
  const hours = Math.floor(duration / 60);
  const mins = duration % 60;
  const durationLabel =
    hours > 0 ? `${hours}h${mins > 0 ? ` ${mins}m` : ""}` : `${mins}m`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      data-ocid={`service.item.${index + 1}`}
      className="group flex flex-col rounded-2xl bg-card shadow-card border border-border overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-smooth"
    >
      {/* Accent strip */}
      <div className="h-1.5 bg-gradient-to-r from-primary via-primary/70 to-accent" />

      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-semibold text-foreground leading-snug group-hover:text-primary transition-colors duration-200">
            {service.name}
          </h3>
          <Badge
            variant="outline"
            className="shrink-0 font-body text-sm font-medium border-accent/50 text-accent-foreground bg-accent/10"
          >
            {service.price}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 font-body">
          {service.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-muted-foreground text-xs font-body">
          <span className="flex items-center gap-1.5">
            <Clock size={13} className="text-primary/70" />
            {durationLabel}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={13} className="text-primary/70" />
            Available now
          </span>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-2">
          <Link
            to="/book/$serviceId"
            params={{ serviceId: service.id.toString() }}
          >
            <Button
              type="button"
              className="w-full font-body font-medium"
              data-ocid={`service.book_button.${index + 1}`}
            >
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Skeleton Cards ───────────────────────────────────────────────────────────
function ServiceCardSkeleton() {
  return (
    <div className="rounded-2xl bg-card border border-border overflow-hidden">
      <div className="h-1.5 bg-muted" />
      <div className="p-6 flex flex-col gap-4">
        <div className="flex justify-between gap-3">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-10 w-full rounded-lg mt-2" />
      </div>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      data-ocid="services.empty_state"
      className="col-span-full flex flex-col items-center gap-5 py-20 text-center"
    >
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-muted border border-border">
        <Sparkles size={32} className="text-accent" />
      </div>
      <div>
        <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
          Services Coming Soon
        </h3>
        <p className="text-muted-foreground font-body max-w-sm">
          We're getting everything ready. Check back shortly to discover our
          full range of services.
        </p>
      </div>
    </motion.div>
  );
}

// ─── Trust Badges ─────────────────────────────────────────────────────────────
const trustPoints = [
  { icon: "✦", label: "Easy Online Booking" },
  { icon: "✦", label: "No Account Required" },
  { icon: "✦", label: "Instant Confirmation" },
];

// ─── HomePage ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  const { data: services, isLoading, isError, error } = useListServices();

  return (
    <div data-ocid="home.page" className="flex flex-col min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        data-ocid="home.hero.section"
        className="relative overflow-hidden bg-card border-b border-border"
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-services.dim_1200x600.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-card/60 via-card/40 to-card/80" />

        <div className="relative z-10 container mx-auto px-6 py-20 md:py-28 flex flex-col items-center text-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-primary text-sm font-body font-medium tracking-wide">
              <Sparkles size={13} />
              Trusted by hundreds of happy clients
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight max-w-3xl"
          >
            Book Exceptional Services.
            <span className="text-primary block">Simply.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="font-body text-lg text-muted-foreground max-w-xl leading-relaxed"
          >
            Discover our curated selection of premium services and secure your
            appointment in minutes — no account needed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 mt-2"
          >
            {trustPoints.map((t) => (
              <span
                key={t.label}
                className="flex items-center gap-2 text-sm font-body text-muted-foreground"
              >
                <span className="text-accent text-base">{t.icon}</span>
                {t.label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Services Grid ───────────────────────────────────────────────── */}
      <section
        data-ocid="home.services.section"
        className="flex-1 bg-background py-16 md:py-20"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-10 text-center"
          >
            <h2 className="font-display text-3xl font-semibold text-foreground mb-3">
              Our Services
            </h2>
            <p className="font-body text-muted-foreground max-w-md mx-auto">
              Select a service to see available times and book your appointment.
            </p>
          </motion.div>

          {/* Error */}
          {isError && (
            <div
              data-ocid="services.error_state"
              className="flex justify-center"
            >
              <ErrorMessage
                message={
                  error instanceof Error
                    ? error.message
                    : "Unable to load services. Please try again."
                }
              />
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Loading skeletons */}
            {isLoading && !isError && (
              <>
                <div data-ocid="services.loading_state">
                  <ServiceCardSkeleton />
                </div>
                <ServiceCardSkeleton />
                <ServiceCardSkeleton />
              </>
            )}

            {/* Populated */}
            {!isLoading &&
              !isError &&
              services &&
              services.length > 0 &&
              services.map((service, i) => (
                <ServiceCard
                  key={service.id.toString()}
                  service={service}
                  index={i}
                />
              ))}

            {/* Empty */}
            {!isLoading && !isError && (!services || services.length === 0) && (
              <EmptyState />
            )}
          </div>
        </div>
      </section>

      {/* ── How it Works ────────────────────────────────────────────────── */}
      <section
        data-ocid="home.how_it_works.section"
        className="bg-muted/30 border-t border-border py-16"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl font-semibold text-foreground mb-3">
              How It Works
            </h2>
            <p className="font-body text-muted-foreground max-w-sm mx-auto">
              Three simple steps to your next appointment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              {
                step: "01",
                title: "Choose a Service",
                desc: "Browse our services and pick the one that suits your needs.",
              },
              {
                step: "02",
                title: "Pick a Time",
                desc: "Select a date and available time slot that works for you.",
              },
              {
                step: "03",
                title: "Confirm & Arrive",
                desc: "Enter your details, confirm your booking, and you're all set.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="font-display text-sm font-bold text-primary">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
