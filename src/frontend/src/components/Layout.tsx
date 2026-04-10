import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronDown, LogOut, Menu, Search, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { CartIcon } from "./CartIcon";

const NAV_LINKS = [
  { label: "All Products", to: "/catalog" },
  { label: "Protein", to: "/catalog?category=proteins" },
  { label: "Pre-Workout", to: "/catalog?category=preWorkout" },
  { label: "Post-Workout", to: "/catalog?category=postWorkout" },
  { label: "Vitamins", to: "/catalog?category=vitamins" },
  { label: "Accessories", to: "/catalog?category=accessories" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, login, logout, principalText } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      void navigate({
        to: "/catalog",
        search: { q: searchQuery.trim(), category: undefined },
      });
      setSearchQuery("");
    }
  }

  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Header */}
      <header
        className="sticky top-0 z-50 bg-card border-b border-border shadow-lift"
        data-ocid="site-header"
      >
        <div className="container mx-auto px-4">
          {/* Top bar */}
          <div className="flex items-center gap-4 h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 shrink-0"
              data-ocid="site-logo"
            >
              <div className="h-8 w-8 rounded-sm bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-sm">
                  PF
                </span>
              </div>
              <span className="font-display font-bold text-lg tracking-tight hidden sm:block">
                Prime<span className="text-primary">Fuel</span>
              </span>
            </Link>

            {/* Search bar — desktop */}
            <form
              onSubmit={handleSearch}
              className="hidden md:flex flex-1 max-w-lg mx-4"
            >
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="Search supplements, brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-muted/40 border-input rounded-sm h-9"
                  data-ocid="search-input"
                  aria-label="Search products"
                />
              </div>
            </form>

            {/* Right actions */}
            <div className="ml-auto flex items-center gap-3">
              {/* Auth */}
              {isAuthenticated ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen((v) => !v)}
                    className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
                    aria-label="User menu"
                    data-ocid="user-menu-trigger"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden sm:block max-w-[80px] truncate text-xs text-muted-foreground font-mono">
                      {principalText?.slice(0, 8)}…
                    </span>
                    <ChevronDown className="h-3 w-3" />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-popover border border-border rounded-sm shadow-lift py-1 z-50">
                      <Link
                        to="/account"
                        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                        data-ocid="account-link"
                      >
                        <User className="h-4 w-4" /> My Account
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors text-destructive"
                        data-ocid="logout-btn"
                      >
                        <LogOut className="h-4 w-4" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  size="sm"
                  onClick={() => void login()}
                  className="h-8 rounded-sm"
                  data-ocid="login-btn"
                >
                  Sign In
                </Button>
              )}
              <CartIcon />
              {/* Mobile menu toggle */}
              <button
                type="button"
                className="md:hidden text-foreground"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
                data-ocid="mobile-menu-toggle"
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Category nav — desktop */}
          <nav
            className="hidden md:flex items-center gap-1 h-10 border-t border-border/50"
            aria-label="Product categories"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-sm transition-colors duration-150"
                activeProps={{
                  className: "text-primary bg-primary/8 font-semibold",
                }}
                data-ocid={`nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-card px-4 py-3 space-y-2">
            <form onSubmit={handleSearch} className="flex gap-2 mb-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="search"
                  placeholder="Search supplements..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-muted/40 h-9"
                  data-ocid="mobile-search-input"
                />
              </div>
              <Button
                type="submit"
                size="sm"
                className="h-9 rounded-sm"
                data-ocid="mobile-search-btn"
              >
                Search
              </Button>
            </form>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-sm transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 bg-background" data-ocid="main-content">
        {children}
      </main>

      {/* Footer */}
      <footer
        className="bg-card border-t border-border mt-auto"
        data-ocid="site-footer"
      >
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-7 w-7 rounded-sm bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-display font-bold text-xs">
                    PF
                  </span>
                </div>
                <span className="font-display font-bold text-base">
                  Prime<span className="text-primary">Fuel</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Premium sports nutrition and supplements for peak performance.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-3 uppercase tracking-wider text-muted-foreground">
                Shop
              </h3>
              <ul className="space-y-2">
                {NAV_LINKS.slice(0, 4).map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-3 uppercase tracking-wider text-muted-foreground">
                Account
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/account"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    My Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cart"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Cart
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-3 uppercase tracking-wider text-muted-foreground">
                Support
              </h3>
              <ul className="space-y-2">
                <li>
                  <span className="text-sm text-muted-foreground">
                    Free shipping over $75
                  </span>
                </li>
                <li>
                  <span className="text-sm text-muted-foreground">
                    30-day returns
                  </span>
                </li>
                <li>
                  <span className="text-sm text-muted-foreground">
                    Lab-tested quality
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-muted-foreground">
              © {year}. Built with love using{" "}
              <a
                href={caffeineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
            <p className="text-xs text-muted-foreground">
              Lab-tested. Performance-driven.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
