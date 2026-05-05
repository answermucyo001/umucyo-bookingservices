import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import { LayoutDashboard, Loader2, LogIn, LogOut, Waves } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation();
  const isActive =
    location.pathname === to ||
    (to !== "/" && location.pathname.startsWith(to));
  return (
    <Link
      to={to}
      className={cn(
        "text-sm font-body font-medium transition-colors duration-200 hover:text-primary relative py-1",
        isActive
          ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
          : "text-muted-foreground",
      )}
      data-ocid={`nav.${to === "/" ? "home" : to.replace("/", "")}_link`}
    >
      {children}
    </Link>
  );
}

export function Layout({ children }: LayoutProps) {
  const { isAuthenticated, isLoading, login, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-xs">
        <div className="container max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            data-ocid="nav.logo_link"
          >
            <div className="rounded-lg bg-primary/10 p-1.5 group-hover:bg-primary/20 transition-colors duration-200">
              <Waves className="h-5 w-5 text-primary" />
            </div>
            <span className="font-display text-xl font-semibold text-foreground tracking-tight">
              uMucyo BookingServices
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/">Services</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/contact">Contact Us</NavLink>
            {isAuthenticated && <NavLink to="/admin">Dashboard</NavLink>}
          </nav>

          {/* Auth actions */}
          <div className="flex items-center gap-3">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            ) : isAuthenticated ? (
              <>
                <Link to="/admin" data-ocid="nav.admin_button">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 hidden md:flex"
                  >
                    <LayoutDashboard className="h-3.5 w-3.5" />
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="gap-1.5 text-muted-foreground hover:text-foreground"
                  data-ocid="nav.logout_button"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span className="hidden md:inline">Sign out</span>
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                onClick={login}
                className="gap-1.5"
                data-ocid="nav.login_button"
              >
                <LogIn className="h-3.5 w-3.5" />
                Provider Login
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="container max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Waves className="h-4 w-4 text-primary" />
            <span className="font-display text-sm font-medium text-foreground">
              uMucyo BookingServices
            </span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            &copy; {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary transition-colors duration-200"
            >
              caffeine.ai
            </a>
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Book a Service
            </Link>
            <Link
              to="/about"
              className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Contact Us
            </Link>
            <button
              type="button"
              onClick={login}
              className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Provider Portal
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
