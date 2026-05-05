import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Heart, MapPin, Phone, Users } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Dedication to Service",
    description:
      "We are passionate about delivering exceptional, reliable services that make a real difference in your daily life.",
  },
  {
    icon: Users,
    title: "Community-Centered",
    description:
      "Rooted in Nyagatare, we serve our local community with pride, understanding the unique needs of Rwandans.",
  },
  {
    icon: CheckCircle2,
    title: "Quality & Reliability",
    description:
      "Every booking is handled with professionalism and care. Your satisfaction and trust are our top priorities.",
  },
];

const services = [
  "Professional Cleaning & Housekeeping",
  "Plumbing & Electrical Repairs",
  "Home Maintenance & Renovation",
  "Laundry & Ironing Services",
  "Event Setup & Decoration",
  "Security & Guard Services",
  "Catering & Food Services",
  "Garden & Landscaping Care",
];

export default function AboutPage() {
  return (
    <div className="flex flex-col" data-ocid="about.page">
      {/* Hero */}
      <section className="bg-primary/5 border-b border-border py-16 px-6">
        <div className="container max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            About Us
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            uMucyo BookingServices
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Your trusted partner for professional services in Nyagatare, Rwanda.
            We connect you with reliable, skilled professionals for all your
            home and business needs.
          </p>
          <div className="flex items-center justify-center gap-2 mt-6 text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">
              Nyagatare, Eastern Province, Rwanda
            </span>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-6 bg-background">
        <div className="container max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Our Story
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                uMucyo BookingServices was founded with a simple vision: to make
                professional services accessible to everyone in Nyagatare and
                the surrounding areas. The name{" "}
                <em className="text-foreground font-medium">uMucyo</em> —
                meaning <em className="text-foreground font-medium">"light"</em>{" "}
                in Kinyarwanda — reflects our commitment to bringing clarity,
                transparency, and trust to every service interaction.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From humble beginnings serving local households to becoming
                Nyagatare's go-to booking platform, we take pride in our growth
                and in the thousands of satisfied customers we have served.
              </p>
            </div>
            <div className="bg-muted/40 rounded-2xl p-8 border border-border">
              <div className="grid grid-cols-2 gap-6 text-center">
                {[
                  { label: "Happy Customers", value: "500+" },
                  { label: "Services Offered", value: "8+" },
                  { label: "Years Active", value: "3+" },
                  { label: "Team Members", value: "20+" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-3xl font-bold text-primary">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-6 bg-muted/30 border-y border-border">
        <div className="container max-w-4xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-10">
            What We Stand For
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v) => (
              <Card key={v.title} className="border-border shadow-xs">
                <CardContent className="pt-6">
                  <div className="rounded-lg bg-primary/10 w-10 h-10 flex items-center justify-center mb-4">
                    <v.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    {v.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {v.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services list */}
      <section className="py-16 px-6 bg-background">
        <div className="container max-w-4xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-10">
            Services We Offer
          </h2>
          <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
            {services.map((s) => (
              <div
                key={s}
                className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card"
              >
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm font-medium text-foreground">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-6 bg-primary/5 border-t border-border">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-3">
            Ready to book a service?
          </h2>
          <p className="text-muted-foreground mb-6">
            Browse our available services and schedule at your convenience.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors duration-200"
              data-ocid="about.book_now_link"
            >
              Browse Services
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-md border border-border bg-card text-foreground px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors duration-200"
              data-ocid="about.contact_link"
            >
              <Phone className="h-4 w-4 mr-2" />
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
