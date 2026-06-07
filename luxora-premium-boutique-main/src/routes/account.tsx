import { createFileRoute, Link, Outlet, useRouterState, redirect } from "@tanstack/react-router";
import { User, Package, Heart, MapPin, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth, useWishlist } from "@/lib/store";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "Account — LUXORA" }] }),
  beforeLoad: ({ location }) => {
    const auth = useAuth.getState();
    if (!auth.user || !auth.token) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
  },
  component: Account,
});

type NavLink = { to: string; label: string; icon: React.ComponentType<{ className?: string }>; exact?: boolean };
const NAV: NavLink[] = [
  { to: "/account", label: "Overview", icon: User, exact: true },
  { to: "/account/orders", label: "Orders", icon: Package },
  { to: "/wishlist", label: "Wishlist", icon: Heart },
  { to: "/contact", label: "Addresses", icon: MapPin },
  { to: "/admin", label: "Admin", icon: LayoutDashboard },
];

function Account() {
  const { user, logout } = useAuth();
  const wishCount = useWishlist((s) => s.ids.length);
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const isOverview = pathname === "/account";

  return (
    <div className="container-luxe py-16 grid lg:grid-cols-[260px_1fr] gap-16">
      <aside className="lg:border-r lg:border-border lg:pr-8">
        <p className="eyebrow">Account</p>
        <h2 className="font-serif text-3xl mt-2">{user?.name ?? "Guest"}</h2>
        <p className="text-xs text-muted-foreground mt-1">{user?.email ?? "Not signed in"}</p>

        <nav className="mt-10 space-y-1">
          {NAV.map((n) => {
            const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
            return (
              <Link key={n.to} to={n.to} className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${active ? "bg-ink text-bone" : "hover:bg-muted"}`}>
                <n.icon className="h-4 w-4" />
                {n.label}
                {n.label === "Wishlist" && wishCount > 0 && (
                  <span className="ml-auto text-xs text-gold">{wishCount}</span>
                )}
              </Link>
            );
          })}
          {user && (
            <button onClick={logout} className="flex items-center gap-3 px-4 py-3 text-sm w-full text-left hover:bg-muted text-muted-foreground">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          )}
        </nav>
      </aside>

      <div>
        {isOverview ? <Overview /> : <Outlet />}
      </div>
    </div>
  );
}

function Overview() {
  const { user } = useAuth();
  return (
    <div>
      <p className="eyebrow">Welcome</p>
      <h1 className="font-serif text-4xl md:text-5xl mt-3">Good evening, {user?.name ?? "guest"}.</h1>
      <p className="text-muted-foreground mt-4 max-w-lg">Manage your wardrobe, orders and personal concierge from a single place.</p>

      <div className="grid sm:grid-cols-2 gap-4 mt-12">
        <Card title="Recent Orders" link="/account/orders" text="View your active deliveries and order history." />
        <Card title="Personal Concierge" link="/contact" text="Speak with your dedicated client advisor." />
        <Card title="Atelier Appointments" link="/contact" text="Book a private fitting in one of our boutiques." />
        <Card title="The Cercle Privé" link="/about" text="Early access to capsule drops and runway invitations." />
      </div>
    </div>
  );
}

function Card({ title, text, link }: { title: string; text: string; link: string }) {
  return (
    <Link to={link} className="block p-8 bg-muted hover:bg-ink hover:text-bone transition-colors group">
      <h3 className="font-serif text-xl">{title}</h3>
      <p className="text-sm mt-2 text-muted-foreground group-hover:text-bone/70">{text}</p>
      <span className="eyebrow !text-gold mt-6 inline-block">Explore →</span>
    </Link>
  );
}