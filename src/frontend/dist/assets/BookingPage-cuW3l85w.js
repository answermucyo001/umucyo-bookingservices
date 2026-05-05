import { c as createLucideIcon, u as useParams, b as useNavigate, r as reactExports, j as jsxRuntimeExports, d as LoadingSpinner, B as Button } from "./index-8CnPpmAi.js";
import { a as useGetService, b as useGetTimeSlotsForDate, c as useCreateBooking, E as ErrorMessage, m as motion } from "./proxy-BOGUCefB.js";
import { B as Badge } from "./badge-DeqghFWK.js";
import { L as Label, I as Input } from "./label-CS3PAb0T.js";
import { C as Clock } from "./clock-Dj3Yqpu9.js";
import { C as Calendar } from "./calendar-BVZgjY7b.js";
import { U as User } from "./user-D80WLlhP.js";
import { M as Mail } from "./mail-B8FkuHXv.js";
import "./index-DF8l_Wgr.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
  ["path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", key: "1b0p4s" }]
];
const DollarSign = createLucideIcon("dollar-sign", __iconNode);
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
  "December"
];
function toDateStr(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}
function buildCalendarGrid(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7)
    weeks.push(cells.slice(i, i + 7).map((day, j) => ({ day, pos: i + j })));
  return weeks;
}
function BookingPage() {
  const { serviceId } = useParams({ from: "/book/$serviceId" });
  const navigate = useNavigate();
  const parsedServiceId = reactExports.useMemo(() => {
    try {
      return BigInt(serviceId);
    } catch {
      return void 0;
    }
  }, [serviceId]);
  const today = /* @__PURE__ */ new Date();
  const [calYear, setCalYear] = reactExports.useState(today.getFullYear());
  const [calMonth, setCalMonth] = reactExports.useState(today.getMonth());
  const [selectedDate, setSelectedDate] = reactExports.useState(null);
  const [selectedSlot, setSelectedSlot] = reactExports.useState(null);
  const [customerName, setCustomerName] = reactExports.useState("");
  const [customerEmail, setCustomerEmail] = reactExports.useState("");
  const {
    data: service,
    isLoading: serviceLoading,
    error: serviceError
  } = useGetService(parsedServiceId);
  const { data: timeSlots, isLoading: slotsLoading } = useGetTimeSlotsForDate(
    parsedServiceId,
    selectedDate ?? ""
  );
  const createBooking = useCreateBooking();
  const canBook = !!selectedDate && !!selectedSlot && customerName.trim().length > 0 && customerEmail.trim().length > 0 && !createBooking.isPending;
  const weeks = reactExports.useMemo(
    () => buildCalendarGrid(calYear, calMonth),
    [calYear, calMonth]
  );
  const todayStr = toDateStr(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
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
  function handleDateSelect(day) {
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
        timeSlot: selectedSlot
      });
      const bookingId = result && typeof result === "object" && "ok" in result ? String(result.ok) : String(result);
      navigate({ to: "/confirmation/$bookingId", params: { bookingId } });
    } catch {
    }
  }
  if (serviceLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", label: "Loading service..." }) });
  }
  if (serviceError || !service) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto px-4 py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { message: "Service not found. Please go back and select a service." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          className: "mt-4",
          onClick: () => navigate({ to: "/" }),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4 mr-1" }),
            " Back to Services"
          ]
        }
      )
    ] });
  }
  const availableSlots = (timeSlots ?? []).filter((s) => s.isAvailable);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": "booking.back_button",
          onClick: () => navigate({ to: "/" }),
          className: "flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
            "Services"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border", children: "/" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: service.name })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35 },
          "data-ocid": "booking.service_card",
          className: "bg-card rounded-2xl border border-border p-6 shadow-sm",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-semibold text-foreground", children: service.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed max-w-lg", children: service.description })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "secondary",
                  className: "flex items-center gap-1 px-3 py-1",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
                    String(service.durationMinutes),
                    " min"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-3.5 h-3.5" }),
                service.price === "0" || service.price === "0.00" ? "Free" : `$${service.price}`
              ] })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.35, delay: 0.08 },
            "data-ocid": "booking.calendar",
            className: "bg-card rounded-2xl border border-border p-6 shadow-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-medium text-foreground", children: "Select a Date" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "booking.calendar_prev",
                      onClick: prevMonth,
                      "aria-label": "Previous month",
                      className: "p-1.5 rounded-lg hover:bg-muted transition-colors duration-150",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4 text-muted-foreground" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-foreground w-32 text-center", children: [
                    MONTH_NAMES[calMonth],
                    " ",
                    calYear
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "booking.calendar_next",
                      onClick: nextMonth,
                      "aria-label": "Next month",
                      className: "p-1.5 rounded-lg hover:bg-muted transition-colors duration-150",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground" })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 mb-2", children: DAY_LABELS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "text-center text-xs font-medium text-muted-foreground py-1",
                  children: d
                },
                d
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: weeks.map((week) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7", children: week.map(({ day, pos }) => {
                if (!day) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}, `cell-${pos}`);
                const ds = toDateStr(calYear, calMonth, day);
                const isPast = ds < todayStr;
                const isSelected = ds === selectedDate;
                const isToday = ds === todayStr;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": `booking.calendar_day.${day}`,
                    onClick: () => handleDateSelect(day),
                    disabled: isPast,
                    "aria-label": ds,
                    "aria-pressed": isSelected,
                    className: [
                      "relative mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-all duration-150",
                      isPast ? "text-muted-foreground/40 cursor-not-allowed" : "hover:bg-primary/10 cursor-pointer",
                      isSelected ? "bg-primary text-primary-foreground shadow-md hover:bg-primary" : "",
                      isToday && !isSelected ? "ring-2 ring-primary/40 ring-offset-1" : "",
                      !isPast && !isSelected ? "text-foreground" : ""
                    ].join(" "),
                    children: day
                  },
                  ds
                );
              }) }, `week-${week[0].pos}`)) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.35, delay: 0.16 },
            className: "flex flex-col gap-5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": "booking.timeslots_panel",
                  className: "bg-card rounded-2xl border border-border p-6 shadow-sm",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-primary" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-medium text-foreground", children: "Available Times" })
                    ] }),
                    !selectedDate && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        "data-ocid": "booking.timeslots.empty_state",
                        className: "text-center py-8",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-3", children: "📅" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Pick a date to see available time slots" })
                        ]
                      }
                    ),
                    selectedDate && slotsLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        "data-ocid": "booking.timeslots.loading_state",
                        className: "flex justify-center py-8",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm", label: "Loading slots..." })
                      }
                    ),
                    selectedDate && !slotsLoading && availableSlots.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        "data-ocid": "booking.timeslots.empty_state",
                        className: "text-center py-8",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-3", children: "😔" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No available slots on this date" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-1", children: "Try selecting another date" })
                        ]
                      }
                    ),
                    selectedDate && !slotsLoading && availableSlots.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: availableSlots.map((slot, i) => {
                      const isActive = selectedSlot === slot.startTime;
                      return /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          "data-ocid": `booking.timeslot.${i + 1}`,
                          onClick: () => setSelectedSlot(slot.startTime),
                          "aria-pressed": isActive,
                          className: [
                            "rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-150 text-center",
                            isActive ? "bg-primary text-primary-foreground border-primary shadow-md" : "bg-background border-border text-foreground hover:border-primary hover:bg-primary/5"
                          ].join(" "),
                          children: slot.startTime
                        },
                        slot.startTime
                      );
                    }) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": "booking.form_panel",
                  className: "bg-card rounded-2xl border border-border p-6 shadow-sm",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-medium text-foreground mb-4", children: "Your Details" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Label,
                          {
                            htmlFor: "customerName",
                            className: "flex items-center gap-1.5 text-sm",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                              "Full Name"
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            id: "customerName",
                            "data-ocid": "booking.name_input",
                            type: "text",
                            placeholder: "Jane Smith",
                            value: customerName,
                            onChange: (e) => setCustomerName(e.target.value),
                            autoComplete: "name",
                            className: "bg-background"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Label,
                          {
                            htmlFor: "customerEmail",
                            className: "flex items-center gap-1.5 text-sm",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                              "Email Address"
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            id: "customerEmail",
                            "data-ocid": "booking.email_input",
                            type: "email",
                            placeholder: "jane@example.com",
                            value: customerEmail,
                            onChange: (e) => setCustomerEmail(e.target.value),
                            autoComplete: "email",
                            className: "bg-background"
                          }
                        )
                      ] }),
                      selectedDate && selectedSlot && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        motion.div,
                        {
                          initial: { opacity: 0, height: 0 },
                          animate: { opacity: 1, height: "auto" },
                          className: "rounded-xl bg-primary/5 border border-primary/15 px-4 py-3 text-sm text-foreground",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-primary mb-1", children: "Booking Summary" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5 text-muted-foreground", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: service.name }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                                selectedDate,
                                " at ",
                                selectedSlot
                              ] })
                            ] })
                          ]
                        }
                      ),
                      createBooking.isError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "booking.error_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { message: "Failed to create booking. Please try again." }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          "data-ocid": "booking.submit_button",
                          type: "button",
                          className: "w-full h-11 text-base font-semibold",
                          disabled: !canBook,
                          onClick: handleBook,
                          children: createBooking.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }),
                            "Booking..."
                          ] }) : "Confirm Booking"
                        }
                      ),
                      !canBook && !createBooking.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: !selectedDate ? "Select a date to continue" : !selectedSlot ? "Select a time slot" : "Enter your name and email to continue" })
                    ] })
                  ]
                }
              )
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  BookingPage as default
};
