import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

const contactDetails = [
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: "0795506095",
    href: "tel:+250795506095",
    description: "Call or WhatsApp us anytime for bookings and inquiries.",
  },
  {
    icon: Mail,
    label: "Email",
    value: "mucyoanswer001@gmail.com",
    href: "mailto:mucyoanswer001@gmail.com",
    description: "Send us an email and we'll respond within 24 hours.",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Nyagatare, Rukomo",
    href: "https://maps.google.com/?q=Nyagatare,Rwanda",
    description:
      "Eastern Province, Rwanda. We serve the entire Nyagatare District.",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon – Sat: 7am – 7pm",
    href: null,
    description: "Available every day except Sunday. Public holidays may vary.",
  },
];

const faqs = [
  {
    q: "How do I book a service?",
    a: "Browse our services on the home page, choose a date and time that suits you, fill in your contact details, and confirm your booking. No account needed!",
  },
  {
    q: "Do you serve areas outside Nyagatare?",
    a: "We are primarily based in Nyagatare and Rukomo. For inquiries about service availability in nearby areas, please contact us directly.",
  },
  {
    q: "How do I cancel or reschedule?",
    a: "Call or WhatsApp us at 0795506095 at least 3 hours before your scheduled appointment, and we'll be happy to reschedule at no extra charge.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept mobile money (MTN MoMo, Airtel Money) and cash on service completion. Payment is confirmed directly with our team.",
  },
];

export default function ContactPage() {
  return (
    <div className="flex flex-col" data-ocid="contact.page">
      {/* Hero */}
      <section className="bg-primary/5 border-b border-border py-16 px-6">
        <div className="container max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            Contact Us
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Have a question or ready to book? Reach out to the uMucyo team —
            we're here to help.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="py-16 px-6 bg-background">
        <div className="container max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-5">
            {contactDetails.map((item) => (
              <Card
                key={item.label}
                className="border-border shadow-xs hover:shadow-sm transition-shadow duration-200"
                data-ocid={`contact.${item.label.toLowerCase().replace(/[^a-z0-9]+/g, "_")}_card`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-primary/10 w-10 h-10 flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={
                            item.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel="noopener noreferrer"
                          className="font-display font-semibold text-foreground hover:text-primary transition-colors duration-200 break-all"
                          data-ocid={`contact.${item.label.toLowerCase().replace(/[^a-z0-9]+/g, "_")}_link`}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-display font-semibold text-foreground">
                          {item.value}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="bg-muted/30 border-y border-border py-16 px-6">
        <div className="container max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">
            Where to Find Us
          </h2>
          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
            <div className="h-56 bg-muted flex items-center justify-center relative">
              <div className="text-center">
                <MapPin className="h-10 w-10 text-primary mx-auto mb-3" />
                <p className="font-display font-semibold text-foreground">
                  Nyagatare, Rukomo
                </p>
                <p className="text-sm text-muted-foreground">
                  Eastern Province, Rwanda
                </p>
              </div>
            </div>
            <div className="p-4 border-t border-border">
              <a
                href="https://maps.google.com/?q=Nyagatare,Rwanda"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-sm text-primary font-medium hover:underline"
                data-ocid="contact.open_map_link"
              >
                <MapPin className="h-4 w-4" />
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-background">
        <div className="container max-w-3xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={faq.q}
                className="rounded-xl border border-border bg-card p-5"
                data-ocid={`contact.faq.item.${i + 1}`}
              >
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {faq.q}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick contact CTA */}
      <section className="py-12 px-6 bg-primary/5 border-t border-border">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-3">
            Ready to book?
          </h2>
          <p className="text-muted-foreground mb-2">
            Call us directly:{" "}
            <a
              href="tel:+250795506095"
              className="font-semibold text-primary hover:underline"
              data-ocid="contact.tel_cta_link"
            >
              0795506095
            </a>
          </p>
          <p className="text-sm text-muted-foreground">
            Or email:{" "}
            <a
              href="mailto:mucyoanswer001@gmail.com"
              className="text-primary hover:underline"
              data-ocid="contact.email_cta_link"
            >
              mucyoanswer001@gmail.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
