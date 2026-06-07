import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { useCart, useWishlist } from "@/lib/store";
import { AnimatePresence, motion } from "framer-motion";

type NavItem = { to: string; label: string; search?: Record<string, string> };
const NAV: NavItem[] = [
  { to: "/shop", label: "Women", search: { c: "women" } },
  { to: "/shop", label: "Men", search: { c: "men" } },
  { to: "/shop", label: "Accessories", search: { c: "accessories" } },
  { to: "/shop", label: "Jewelry", search: { c: "jewelry" } },
  { to: "/about", label: "Maison" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const cartCount = useCart((s) => s.count());
  const wishCount = useWishlist((s) => s.ids.length);
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <div className="bg-ink text-bone text-[11px] tracking-[0.3em] uppercase py-2 text-center">
        Complimentary worldwide shipping on orders over $500 · Signature gift wrapping
      </div>
      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled ? "bg-background/90 backdrop-blur-lg border-b border-border" : "bg-background"
        }`}
      >
        <div className="container-luxe flex items-center justify-between h-20">
          <button
            className="lg:hidden p-2 -ml-2"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <nav className="hidden lg:flex items-center gap-9 flex-1">
            {NAV.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                search={n.search as never}
                className="text-[11px] tracking-[0.3em] uppercase font-medium hover:text-gold transition-colors link-underline"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="absolute left-1/2 -translate-x-1/2">
            <Logo />
          </div>

          <div className="flex items-center gap-1 md:gap-3 flex-1 justify-end">
            <Link to="/shop" className="p-2 hover:text-gold transition-colors" aria-label="Search">
              <Search className="h-[18px] w-[18px]" />
            </Link>
            <Link to="/account" className="p-2 hover:text-gold transition-colors hidden sm:inline-flex" aria-label="Account">
              <User className="h-[18px] w-[18px]" />
            </Link>
            <Link to="/wishlist" className="p-2 hover:text-gold transition-colors relative" aria-label="Wishlist">
              <Heart className="h-[18px] w-[18px]" />
              {wishCount > 0 && <Badge>{wishCount}</Badge>}
            </Link>
            <Link to="/cart" className="p-2 hover:text-gold transition-colors relative" aria-label="Cart">
              <ShoppingBag className="h-[18px] w-[18px]" />
              {cartCount > 0 && <Badge>{cartCount}</Badge>}
            </Link>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-xl text-bone"
          >
            <div className="container-luxe flex items-center justify-between h-20">
              <Logo invert />
              <button onClick={() => setOpen(false)} className="p-2 -mr-2" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="container-luxe flex flex-col gap-6 mt-12">
              {NAV.map((n, i) => (
                <motion.div
                  key={n.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link to={n.to} search={n.search as never} className="font-serif text-4xl">
                    {n.label}
                  </Link>
                </motion.div>
              ))}
              <div className="gold-line my-6" />
              <Link to="/account" className="eyebrow !text-bone/70">Account</Link>
              <Link to="/account/orders" className="eyebrow !text-bone/70">Orders</Link>
              <Link to="/contact" className="eyebrow !text-bone/70">Contact</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute -top-0.5 -right-0.5 bg-gold text-ink text-[10px] font-medium h-4 min-w-4 px-1 rounded-full flex items-center justify-center">
      {children}
    </span>
  );
}