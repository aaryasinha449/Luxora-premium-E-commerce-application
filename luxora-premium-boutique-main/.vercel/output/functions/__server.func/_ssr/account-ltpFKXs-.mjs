import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useRouterState, L as Link, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { a as useAuth, u as useWishlist } from "./router-DpDkR4l0.mjs";
import "../_libs/sonner.mjs";
import { U as User, j as Package, H as Heart, d as MapPin, m as LayoutDashboard, n as LogOut } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/zustand.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const NAV = [{
  to: "/account",
  label: "Overview",
  icon: User,
  exact: true
}, {
  to: "/account/orders",
  label: "Orders",
  icon: Package
}, {
  to: "/wishlist",
  label: "Wishlist",
  icon: Heart
}, {
  to: "/contact",
  label: "Addresses",
  icon: MapPin
}, {
  to: "/admin",
  label: "Admin",
  icon: LayoutDashboard
}];
function Account() {
  const {
    user,
    logout
  } = useAuth();
  const wishCount = useWishlist((s) => s.ids.length);
  const pathname = useRouterState({
    select: (r) => r.location.pathname
  });
  const isOverview = pathname === "/account";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-luxe py-16 grid lg:grid-cols-[260px_1fr] gap-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "lg:border-r lg:border-border lg:pr-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-3xl mt-2", children: user?.name ?? "Guest" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: user?.email ?? "Not signed in" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "mt-10 space-y-1", children: [
        NAV.map((n) => {
          const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: n.to, className: `flex items-center gap-3 px-4 py-3 text-sm transition-colors ${active ? "bg-ink text-bone" : "hover:bg-muted"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(n.icon, { className: "h-4 w-4" }),
            n.label,
            n.label === "Wishlist" && wishCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-xs text-gold", children: wishCount })
          ] }, n.to);
        }),
        user && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: logout, className: "flex items-center gap-3 px-4 py-3 text-sm w-full text-left hover:bg-muted text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
          " Sign out"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: isOverview ? /* @__PURE__ */ jsxRuntimeExports.jsx(Overview, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
  ] });
}
function Overview() {
  const {
    user
  } = useAuth();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Welcome" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-serif text-4xl md:text-5xl mt-3", children: [
      "Good evening, ",
      user?.name ?? "guest",
      "."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-4 max-w-lg", children: "Manage your wardrobe, orders and personal concierge from a single place." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4 mt-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Recent Orders", link: "/account/orders", text: "View your active deliveries and order history." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Personal Concierge", link: "/contact", text: "Speak with your dedicated client advisor." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Atelier Appointments", link: "/contact", text: "Book a private fitting in one of our boutiques." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "The Cercle Privé", link: "/about", text: "Early access to capsule drops and runway invitations." })
    ] })
  ] });
}
function Card({
  title,
  text,
  link
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: link, className: "block p-8 bg-muted hover:bg-ink hover:text-bone transition-colors group", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-xl", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-2 text-muted-foreground group-hover:text-bone/70", children: text }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow !text-gold mt-6 inline-block", children: "Explore →" })
  ] });
}
export {
  Account as component
};
