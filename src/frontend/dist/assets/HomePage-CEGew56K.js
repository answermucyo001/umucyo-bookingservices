import { c as createLucideIcon, j as jsxRuntimeExports, a as cn, L as Link, B as Button } from "./index-8CnPpmAi.js";
import { u as useListServices, m as motion, E as ErrorMessage } from "./proxy-BOGUCefB.js";
import { B as Badge } from "./badge-DeqghFWK.js";
import { C as Clock } from "./clock-Dj3Yqpu9.js";
import { C as Calendar } from "./calendar-BVZgjY7b.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}
function ServiceCard({
  service,
  index
}) {
  const duration = Number(service.durationMinutes);
  const hours = Math.floor(duration / 60);
  const mins = duration % 60;
  const durationLabel = hours > 0 ? `${hours}h${mins > 0 ? ` ${mins}m` : ""}` : `${mins}m`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.45, delay: index * 0.08, ease: "easeOut" },
      "data-ocid": `service.item.${index + 1}`,
      className: "group flex flex-col rounded-2xl bg-card shadow-card border border-border overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-smooth",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-gradient-to-r from-primary via-primary/70 to-accent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 p-6 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold text-foreground leading-snug group-hover:text-primary transition-colors duration-200", children: service.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "shrink-0 font-body text-sm font-medium border-accent/50 text-accent-foreground bg-accent/10",
                children: service.price
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed line-clamp-3 font-body", children: service.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-muted-foreground text-xs font-body", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 13, className: "text-primary/70" }),
              durationLabel
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 13, className: "text-primary/70" }),
              "Available now"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/book/$serviceId",
              params: { serviceId: service.id.toString() },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  className: "w-full font-body font-medium",
                  "data-ocid": `service.book_button.${index + 1}`,
                  children: "Book Now"
                }
              )
            }
          ) })
        ] })
      ]
    }
  );
}
function ServiceCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card border border-border overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-36" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 rounded-full" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-4/5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full rounded-lg mt-2" })
    ] })
  ] });
}
function EmptyState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      "data-ocid": "services.empty_state",
      className: "col-span-full flex flex-col items-center gap-5 py-20 text-center",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-20 h-20 rounded-full bg-muted border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 32, className: "text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-semibold text-foreground mb-2", children: "Services Coming Soon" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body max-w-sm", children: "We're getting everything ready. Check back shortly to discover our full range of services." })
        ] })
      ]
    }
  );
}
const trustPoints = [
  { icon: "✦", label: "Easy Online Booking" },
  { icon: "✦", label: "No Account Required" },
  { icon: "✦", label: "Instant Confirmation" }
];
function HomePage() {
  const { data: services, isLoading, isError, error } = useListServices();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "home.page", className: "flex flex-col min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        "data-ocid": "home.hero.section",
        className: "relative overflow-hidden bg-card border-b border-border",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 bg-cover bg-center opacity-20",
              style: {
                backgroundImage: "url('/assets/generated/hero-services.dim_1200x600.jpg')"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-card/60 via-card/40 to-card/80" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 container mx-auto px-6 py-20 md:py-28 flex flex-col items-center text-center gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: -12 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, ease: "easeOut" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-primary text-sm font-body font-medium tracking-wide", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 13 }),
                  "Trusted by hundreds of happy clients"
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.h1,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.55, delay: 0.1, ease: "easeOut" },
                className: "font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight max-w-3xl",
                children: [
                  "Book Exceptional Services.",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary block", children: "Simply." })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.2, ease: "easeOut" },
                className: "font-body text-lg text-muted-foreground max-w-xl leading-relaxed",
                children: "Discover our curated selection of premium services and secure your appointment in minutes — no account needed."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 8 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.45, delay: 0.3 },
                className: "flex flex-wrap justify-center gap-6 mt-2",
                children: trustPoints.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "flex items-center gap-2 text-sm font-body text-muted-foreground",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent text-base", children: t.icon }),
                      t.label
                    ]
                  },
                  t.label
                ))
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        "data-ocid": "home.services.section",
        className: "flex-1 bg-background py-16 md:py-20",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.4 },
              className: "mb-10 text-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-semibold text-foreground mb-3", children: "Our Services" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-muted-foreground max-w-md mx-auto", children: "Select a service to see available times and book your appointment." })
              ]
            }
          ),
          isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "data-ocid": "services.error_state",
              className: "flex justify-center",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                ErrorMessage,
                {
                  message: error instanceof Error ? error.message : "Unable to load services. Please try again."
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: [
            isLoading && !isError && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "services.loading_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ServiceCardSkeleton, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ServiceCardSkeleton, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ServiceCardSkeleton, {})
            ] }),
            !isLoading && !isError && services && services.length > 0 && services.map((service, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              ServiceCard,
              {
                service,
                index: i
              },
              service.id.toString()
            )),
            !isLoading && !isError && (!services || services.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, {})
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        "data-ocid": "home.how_it_works.section",
        className: "bg-muted/30 border-t border-border py-16",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.4 },
              className: "text-center mb-12",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-semibold text-foreground mb-3", children: "How It Works" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-muted-foreground max-w-sm mx-auto", children: "Three simple steps to your next appointment." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto", children: [
            {
              step: "01",
              title: "Choose a Service",
              desc: "Browse our services and pick the one that suits your needs."
            },
            {
              step: "02",
              title: "Pick a Time",
              desc: "Select a date and available time slot that works for you."
            },
            {
              step: "03",
              title: "Confirm & Arrive",
              desc: "Enter your details, confirm your booking, and you're all set."
            }
          ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.4, delay: i * 0.1 },
              className: "flex flex-col items-center text-center gap-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm font-bold text-primary", children: item.step }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground", children: item.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground leading-relaxed", children: item.desc })
              ]
            },
            item.step
          )) })
        ] })
      }
    )
  ] });
}
export {
  HomePage as default
};
