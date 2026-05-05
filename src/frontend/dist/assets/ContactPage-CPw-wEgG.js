import { j as jsxRuntimeExports } from "./index-8CnPpmAi.js";
import { B as Badge } from "./badge-DeqghFWK.js";
import { C as Card, a as CardContent } from "./card-D-7g2MhV.js";
import { P as Phone, M as MapPin } from "./phone-DnADK7yV.js";
import { M as Mail } from "./mail-B8FkuHXv.js";
import { C as Clock } from "./clock-Dj3Yqpu9.js";
const contactDetails = [
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: "0795506095",
    href: "tel:+250795506095",
    description: "Call or WhatsApp us anytime for bookings and inquiries."
  },
  {
    icon: Mail,
    label: "Email",
    value: "mucyoanswer001@gmail.com",
    href: "mailto:mucyoanswer001@gmail.com",
    description: "Send us an email and we'll respond within 24 hours."
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Nyagatare, Rukomo",
    href: "https://maps.google.com/?q=Nyagatare,Rwanda",
    description: "Eastern Province, Rwanda. We serve the entire Nyagatare District."
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon – Sat: 7am – 7pm",
    href: null,
    description: "Available every day except Sunday. Public holidays may vary."
  }
];
const faqs = [
  {
    q: "How do I book a service?",
    a: "Browse our services on the home page, choose a date and time that suits you, fill in your contact details, and confirm your booking. No account needed!"
  },
  {
    q: "Do you serve areas outside Nyagatare?",
    a: "We are primarily based in Nyagatare and Rukomo. For inquiries about service availability in nearby areas, please contact us directly."
  },
  {
    q: "How do I cancel or reschedule?",
    a: "Call or WhatsApp us at 0795506095 at least 3 hours before your scheduled appointment, and we'll be happy to reschedule at no extra charge."
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept mobile money (MTN MoMo, Airtel Money) and cash on service completion. Payment is confirmed directly with our team."
  }
];
function ContactPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", "data-ocid": "contact.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-primary/5 border-b border-border py-16 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-4xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "mb-4", children: "Contact Us" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight", children: "Get in Touch" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed", children: "Have a question or ready to book? Reach out to the uMucyo team — we're here to help." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 px-6 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-4xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-5", children: contactDetails.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "border-border shadow-xs hover:shadow-sm transition-shadow duration-200",
        "data-ocid": `contact.${item.label.toLowerCase().replace(/[^a-z0-9]+/g, "_")}_card`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-primary/10 w-10 h-10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "h-5 w-5 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1", children: item.label }),
            item.href ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: item.href,
                target: item.href.startsWith("http") ? "_blank" : void 0,
                rel: "noopener noreferrer",
                className: "font-display font-semibold text-foreground hover:text-primary transition-colors duration-200 break-all",
                "data-ocid": `contact.${item.label.toLowerCase().replace(/[^a-z0-9]+/g, "_")}_link`,
                children: item.value
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: item.value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 leading-relaxed", children: item.description })
          ] })
        ] }) })
      },
      item.label
    )) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 border-y border-border py-16 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-6 text-center", children: "Where to Find Us" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card overflow-hidden shadow-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-56 bg-muted flex items-center justify-center relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-10 w-10 text-primary mx-auto mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: "Nyagatare, Rukomo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Eastern Province, Rwanda" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: "https://maps.google.com/?q=Nyagatare,Rwanda",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex items-center justify-center gap-2 text-sm text-primary font-medium hover:underline",
            "data-ocid": "contact.open_map_link",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }),
              "Open in Google Maps"
            ]
          }
        ) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 px-6 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground text-center mb-10", children: "Frequently Asked Questions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: faqs.map((faq, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl border border-border bg-card p-5",
          "data-ocid": `contact.faq.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-2", children: faq.q }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: faq.a })
          ]
        },
        faq.q
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 px-6 bg-primary/5 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-4xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-3", children: "Ready to book?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mb-2", children: [
        "Call us directly:",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "tel:+250795506095",
            className: "font-semibold text-primary hover:underline",
            "data-ocid": "contact.tel_cta_link",
            children: "0795506095"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "Or email:",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "mailto:mucyoanswer001@gmail.com",
            className: "text-primary hover:underline",
            "data-ocid": "contact.email_cta_link",
            children: "mucyoanswer001@gmail.com"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  ContactPage as default
};
