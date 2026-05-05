import { u as useParams, j as jsxRuntimeExports, d as LoadingSpinner, L as Link, B as Button, W as Waves } from "./index-8CnPpmAi.js";
import { d as useGetBooking, a as useGetService, E as ErrorMessage, m as motion } from "./proxy-BOGUCefB.js";
import { B as Badge } from "./badge-DeqghFWK.js";
import { C as Card, a as CardContent } from "./card-D-7g2MhV.js";
import { g as getBookingStatusKey, s as statusLabels, a as statusColors, S as Separator, C as CalendarDays } from "./index-DwFhmApd.js";
import { C as CircleCheck } from "./circle-check-B3yt0sQs.js";
import { C as Clock } from "./clock-Dj3Yqpu9.js";
import { U as User } from "./user-D80WLlhP.js";
import { M as Mail } from "./mail-B8FkuHXv.js";
import "./index-DF8l_Wgr.js";
function DetailRow({
  icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 flex-shrink-0 text-primary", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body uppercase tracking-wide", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground break-words", children: value })
    ] })
  ] });
}
function ConfirmationPage() {
  const { bookingId } = useParams({ from: "/confirmation/$bookingId" });
  const parsedId = bookingId ? BigInt(bookingId) : void 0;
  const {
    data: booking,
    isLoading: bookingLoading,
    isError: bookingError
  } = useGetBooking(parsedId);
  const { data: service, isLoading: serviceLoading } = useGetService(
    booking == null ? void 0 : booking.serviceId
  );
  const isLoading = bookingLoading || !!booking && serviceLoading;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-1 items-center justify-center py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", label: "Loading booking details…" }) });
  }
  if (bookingError || !booking) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-1 items-center justify-center py-24 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ErrorMessage,
        {
          title: "Booking not found",
          message: "We couldn't find this booking. It may have been removed or the link may be incorrect."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "data-ocid": "confirmation.home_button", children: "Browse Services" }) })
    ] }) });
  }
  const statusKey = getBookingStatusKey(booking.status);
  const referenceId = `BK-${booking.id.toString().padStart(6, "0")}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border py-16 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "max-w-lg mx-auto text-center",
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: "easeOut" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { scale: 0.5, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              transition: {
                delay: 0.15,
                duration: 0.4,
                type: "spring",
                stiffness: 180
              },
              className: "inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-10 w-10 text-primary" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h1,
            {
              className: "font-display text-4xl font-bold text-foreground mb-3",
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.25, duration: 0.4 },
              "data-ocid": "confirmation.heading",
              children: "Booking Confirmed!"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              className: "text-muted-foreground font-body text-base leading-relaxed",
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.35, duration: 0.4 },
              children: "Your appointment has been successfully booked. We look forward to seeing you!"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "mt-6 inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-5 py-2",
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
              transition: { delay: 0.45, duration: 0.35 },
              "data-ocid": "confirmation.reference_id",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-body uppercase tracking-widest", children: "Reference" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-bold text-primary", children: referenceId })
              ]
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "max-w-lg mx-auto",
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.5, duration: 0.45 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "shadow-card border-border",
              "data-ocid": "confirmation.details_card",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-7 space-y-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "Appointment Details" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: `text-xs font-medium px-2.5 py-0.5 rounded-full ${statusColors[statusKey]}`,
                      "data-ocid": "confirmation.status_badge",
                      children: statusLabels[statusKey]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    DetailRow,
                    {
                      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Waves, { className: "h-4 w-4" }),
                      label: "Service",
                      value: (service == null ? void 0 : service.name) ?? `Service #${booking.serviceId}`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    DetailRow,
                    {
                      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-4 w-4" }),
                      label: "Date",
                      value: booking.date
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    DetailRow,
                    {
                      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4" }),
                      label: "Time",
                      value: booking.timeSlot
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    DetailRow,
                    {
                      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }),
                      label: "Customer Name",
                      value: booking.customerName
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    DetailRow,
                    {
                      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4" }),
                      label: "Email",
                      value: booking.customerEmail
                    }
                  )
                ] })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-col sm:flex-row gap-3 justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "w-full sm:w-auto",
                "data-ocid": "confirmation.browse_button",
                children: "Browse More Services"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "w-full sm:w-auto",
                "data-ocid": "confirmation.home_button",
                children: "Return to Home"
              }
            ) })
          ] })
        ]
      }
    ) })
  ] });
}
export {
  ConfirmationPage as default
};
