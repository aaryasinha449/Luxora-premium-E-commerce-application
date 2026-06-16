import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider, q as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, d as useRouterState } from "../_libs/tanstack__react-router.mjs";
import { Q as redirect, S as notFound } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as create, p as persist } from "../_libs/zustand.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { M as Menu, S as Search, U as User, H as Heart, a as ShoppingBag, X, I as Instagram, F as Facebook, Y as Youtube } from "../_libs/lucide-react.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const appCss = "/assets/styles-CW2EE-tb.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
function Logo({ className = "", invert = false }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/",
      className: `font-display tracking-[0.4em] text-2xl md:text-[1.7rem] leading-none select-none ${invert ? "text-bone" : "text-ink"} ${className}`,
      "aria-label": "LUXORA — home",
      children: "LUXORA"
    }
  );
}
const key = (id, s, c) => `${id}__${s}__${c}`;
const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(id);
const useCart = create()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) => set((s) => {
        const k = key(item.product.id, item.size, item.color);
        const exists = s.items.find((i) => key(i.product.id, i.size, i.color) === k);
        if (exists) {
          return {
            items: s.items.map(
              (i) => key(i.product.id, i.size, i.color) === k ? { ...i, qty: i.qty + item.qty } : i
            )
          };
        }
        return { items: [...s.items, item] };
      }),
      remove: (id, s, c) => set((st) => ({ items: st.items.filter((i) => key(i.product.id, i.size, i.color) !== key(id, s, c)) })),
      setQty: (id, s, c, qty) => set((st) => ({
        items: st.items.map(
          (i) => key(i.product.id, i.size, i.color) === key(id, s, c) ? { ...i, qty: Math.max(1, qty) } : i
        )
      })),
      clear: () => set({ items: [] }),
      subtotal: () => get().items.reduce((a, i) => a + i.product.price * i.qty, 0),
      count: () => get().items.reduce((a, i) => a + i.qty, 0)
    }),
    {
      name: "luxora-cart",
      // Version 2: invalidates any persisted cart that was stored before MongoDB ObjectIds
      // were used as product ids (e.g. items with ids like "p1", "p2", etc.).
      version: 2,
      migrate: (persistedState, fromVersion) => {
        if (fromVersion < 2) {
          return { items: [] };
        }
        const validItems = (persistedState?.items ?? []).filter(
          (item) => isValidObjectId(item?.product?.id ?? "")
        );
        return { ...persistedState, items: validItems };
      }
    }
  )
);
const useWishlist = create()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) => set((s) => ({ ids: s.ids.includes(id) ? s.ids.filter((x) => x !== id) : [...s.ids, id] })),
      has: (id) => get().ids.includes(id),
      clear: () => set({ ids: [] })
    }),
    { name: "luxora-wishlist" }
  )
);
const useAuth = create()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loginSuccess: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null })
    }),
    { name: "luxora-auth" }
  )
);
if (typeof window !== "undefined") {
  try {
    const raw = localStorage.getItem("luxora-auth");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.state && parsed.state.user && !parsed.state.token) {
        console.warn("Legacy auth state detected without JWT token. Clearing state.");
        localStorage.removeItem("luxora-auth");
      }
    }
  } catch (error) {
    console.error("Failed to clean legacy localStorage keys:", error);
  }
}
const NAV = [
  { to: "/shop", label: "Women", search: { c: "women" } },
  { to: "/shop", label: "Men", search: { c: "men" } },
  { to: "/shop", label: "Accessories", search: { c: "accessories" } },
  { to: "/shop", label: "Jewelry", search: { c: "jewelry" } },
  { to: "/about", label: "Maison" }
];
function Header() {
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [open, setOpen] = reactExports.useState(false);
  const cartCount = useCart((s) => s.count());
  const wishCount = useWishlist((s) => s.ids.length);
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  reactExports.useEffect(() => setOpen(false), [pathname]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-ink text-bone text-[11px] tracking-[0.3em] uppercase py-2 text-center", children: "Complimentary worldwide shipping on orders over $500 · Signature gift wrapping" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "header",
      {
        className: `sticky top-0 z-40 transition-all duration-500 ${scrolled ? "bg-background/90 backdrop-blur-lg border-b border-border" : "bg-background"}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-luxe flex items-center justify-between h-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "lg:hidden p-2 -ml-2",
              onClick: () => setOpen(true),
              "aria-label": "Open menu",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden lg:flex items-center gap-9 flex-1", children: NAV.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: n.to,
              search: n.search,
              className: "text-[11px] tracking-[0.3em] uppercase font-medium hover:text-gold transition-colors link-underline",
              children: n.label
            },
            n.label
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1/2 -translate-x-1/2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 md:gap-3 flex-1 justify-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "p-2 hover:text-gold transition-colors", "aria-label": "Search", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-[18px] w-[18px]" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/account", className: "p-2 hover:text-gold transition-colors hidden sm:inline-flex", "aria-label": "Account", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-[18px] w-[18px]" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/wishlist", className: "p-2 hover:text-gold transition-colors relative", "aria-label": "Wishlist", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-[18px] w-[18px]" }),
              wishCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { children: wishCount })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/cart", className: "p-2 hover:text-gold transition-colors relative", "aria-label": "Cart", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-[18px] w-[18px]" }),
              cartCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { children: cartCount })
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 z-50 bg-ink/95 backdrop-blur-xl text-bone",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-luxe flex items-center justify-between h-20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { invert: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setOpen(false), className: "p-2 -mr-2", "aria-label": "Close menu", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "container-luxe flex flex-col gap-6 mt-12", children: [
            NAV.map((n, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: i * 0.06 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: n.to, search: n.search, className: "font-serif text-4xl", children: n.label })
              },
              n.label
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gold-line my-6" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/account", className: "eyebrow !text-bone/70", children: "Account" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/account/orders", className: "eyebrow !text-bone/70", children: "Orders" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "eyebrow !text-bone/70", children: "Contact" })
          ] })
        ]
      }
    ) })
  ] });
}
function Badge({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-0.5 -right-0.5 bg-gold text-ink text-[10px] font-medium h-4 min-w-4 px-1 rounded-full flex items-center justify-center", children });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "bg-ink text-bone mt-32", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-luxe py-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display tracking-[0.4em] text-2xl", children: "LUXORA" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-bone/60 max-w-xs leading-relaxed", children: "A modern maison dedicated to timeless craftsmanship, hand-finished in our European ateliers since 1987." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-6 text-bone/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-gold transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-gold transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-gold transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Youtube, { className: "h-4 w-4" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FooterColumn, { title: "Maison", links: [
        { to: "/about", label: "Our Story" },
        { to: "/about", label: "Craftsmanship" },
        { to: "/about", label: "Sustainability" },
        { to: "/contact", label: "Press & Media" }
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FooterColumn, { title: "Client Services", links: [
        { to: "/contact", label: "Contact Concierge" },
        { to: "/faq", label: "FAQ" },
        { to: "/account/orders", label: "Orders & Shipping" },
        { to: "/faq", label: "Returns & Repairs" }
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "eyebrow mb-5", children: "Le Journal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-bone/60 mb-4", children: "Private previews, atelier stories, invitations." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "flex border-b border-bone/30 pb-2 gap-2", onSubmit: (e) => e.preventDefault(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "email",
              placeholder: "Your email",
              className: "flex-1 bg-transparent outline-none text-sm placeholder:text-bone/40"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "text-gold tracking-[0.2em] text-xs uppercase", children: "Subscribe" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-bone/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-luxe py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-bone/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " LUXORA Maison. All rights reserved."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/faq", className: "hover:text-gold", children: "Privacy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/faq", className: "hover:text-gold", children: "Terms" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/faq", className: "hover:text-gold", children: "Cookies" })
      ] })
    ] }) })
  ] });
}
function FooterColumn({ title, links }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "eyebrow mb-5", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3 text-sm", children: links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: l.to, className: "text-bone/70 hover:text-gold transition-colors", children: l.label }) }, l.label)) })
  ] });
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$f = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Lovable Generated Project" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Lovable Generated Project" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&family=Italiana&display=swap"
      },
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$f.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "bottom-right" })
  ] }) });
}
function slugify(name) {
  if (!name) return "";
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
const mapBackendProduct = (p) => {
  const slug = p.slug || slugify(p.name);
  const rawCategory = (p.category || "women").toLowerCase();
  let category;
  if (rawCategory === "men") {
    category = "men";
  } else if (rawCategory === "women") {
    category = "women";
  } else if (rawCategory === "accessories" || rawCategory === "footwear") {
    category = "accessories";
  } else if (rawCategory === "jewelry") {
    category = "jewelry";
  } else {
    category = "women";
  }
  return {
    id: p._id,
    slug,
    name: p.name,
    tagline: p.tagline || "Maison Atelier — Collection",
    price: p.price,
    compareAt: p.compareAt || void 0,
    category,
    subcategory: p.subcategory || "Ready-to-wear",
    colors: p.colors || [{ name: "Onyx", hex: "#0a0a0a" }],
    sizes: p.sizes || ["S", "M", "L"],
    images: Array.isArray(p.images) && p.images.length > 0 ? p.images : [
      p.image || "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=80"
    ],
    description: p.description || "",
    details: p.details || ["Dry clean only", "Hand-finished in Europe"],
    rating: typeof p.rating === "number" ? p.rating : 4.8,
    reviews: typeof p.reviews === "number" ? p.reviews : 42,
    isNew: typeof p.isNew === "boolean" ? p.isNew : false,
    isBestSeller: typeof p.isBestSeller === "boolean" ? p.isBestSeller : false,
    stock: typeof p.stock === "number" ? p.stock : 0
  };
};
const productsQueryOptions = queryOptions({
  queryKey: ["products"],
  queryFn: async () => {
    const res = await fetch("https://luxora-premium-e-commerce-application.onrender.com/api/products");
    if (!res.ok) {
      throw new Error("Failed to fetch products from backend API");
    }
    const data = await res.json();
    return data.map(mapBackendProduct);
  }
});
const $$splitComponentImporter$e = () => import("./shop-Cqjcjcmk.mjs");
const Route$e = createFileRoute("/shop")({
  head: () => ({
    meta: [{
      title: "Shop — LUXORA"
    }, {
      name: "description",
      content: "Discover the full LUXORA collection — ready-to-wear, accessories and fine jewelry."
    }]
  }),
  validateSearch: (s) => ({
    c: typeof s.c === "string" ? s.c : void 0,
    q: typeof s.q === "string" ? s.q : void 0
  }),
  loader: ({
    context
  }) => context.queryClient.ensureQueryData(productsQueryOptions),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./wishlist-DaO3uEbR.mjs");
const Route$d = createFileRoute("/wishlist")({
  head: () => ({
    meta: [{
      title: "Wishlist — LUXORA"
    }]
  }),
  loader: ({
    context
  }) => context.queryClient.ensureQueryData(productsQueryOptions),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./register-CETcvdkb.mjs");
const Route$c = createFileRoute("/register")({
  head: () => ({
    meta: [{
      title: "Create Account — LUXORA"
    }]
  }),
  validateSearch: (search) => ({
    redirect: typeof search.redirect === "string" ? search.redirect : void 0
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./login-B2f9SAw_.mjs");
const Route$b = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "Sign In — LUXORA"
    }]
  }),
  validateSearch: (search) => ({
    redirect: typeof search.redirect === "string" ? search.redirect : void 0
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./faq-BXgiI3YT.mjs");
const Route$a = createFileRoute("/faq")({
  head: () => ({
    meta: [{
      title: "FAQ — LUXORA"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./contact-Db9L-6GA.mjs");
const Route$9 = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "Contact — LUXORA"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./checkout-Dd9eiR94.mjs");
const Route$8 = createFileRoute("/checkout")({
  head: () => ({
    meta: [{
      title: "Checkout — LUXORA"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./cart-Ca1YjoNc.mjs");
const Route$7 = createFileRoute("/cart")({
  head: () => ({
    meta: [{
      title: "Shopping Bag — LUXORA"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
async function luxeFetch(url, options = {}) {
  const token = useAuth.getState().token;
  const headers = new Headers(options.headers || {});
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  const response = await fetch(url, {
    ...options,
    headers
  });
  if (response.status === 401) {
    console.warn("Session expired or unauthorized (401). Clearing credentials.");
    useAuth.getState().logout();
    if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
      window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
    }
  }
  return response;
}
const ordersQueryOptions = queryOptions({
  queryKey: ["orders"],
  queryFn: async () => {
    const res = await luxeFetch("https://luxora-premium-e-commerce-application.onrender.com/api/orders");
    if (!res.ok) {
      throw new Error("Failed to fetch orders from backend");
    }
    return res.json();
  }
});
const $$splitComponentImporter$6 = () => import("./account.orders-rr2m7ZFE.mjs");
const Route$6 = createFileRoute("/account/orders")({
  head: () => ({
    meta: [{
      title: "Orders — LUXORA"
    }]
  }),
  loader: ({
    context
  }) => context.queryClient.ensureQueryData(ordersQueryOptions),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./admin-CgYErCgO.mjs");
const Route$5 = createFileRoute("/admin")({
  head: () => ({
    meta: [{
      title: "Admin — LUXORA"
    }]
  }),
  beforeLoad: ({
    location
  }) => {
    const auth = useAuth.getState();
    if (!auth.user || !auth.token) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href
        }
      });
    }
    if (auth.user.role !== "admin") {
      throw redirect({
        to: "/"
      });
    }
  },
  loader: async ({
    context
  }) => {
    await Promise.all([context.queryClient.ensureQueryData(productsQueryOptions), context.queryClient.ensureQueryData(ordersQueryOptions)]);
  },
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./account-ltpFKXs-.mjs");
const Route$4 = createFileRoute("/account")({
  head: () => ({
    meta: [{
      title: "Account — LUXORA"
    }]
  }),
  beforeLoad: ({
    location
  }) => {
    const auth = useAuth.getState();
    if (!auth.user || !auth.token) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href
        }
      });
    }
  },
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./about-bBYA98Ut.mjs");
const Route$3 = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "The Maison — LUXORA"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./index-CjJkJH-Y.mjs");
const Route$2 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "LUXORA — Modern Luxury Fashion Maison"
    }, {
      name: "description",
      content: "Hand-finished couture, leather goods and fine jewelry from the LUXORA maison."
    }, {
      property: "og:title",
      content: "LUXORA — Modern Luxury Fashion Maison"
    }, {
      property: "og:description",
      content: "Discover the new LUXORA collection."
    }]
  }),
  loader: ({
    context
  }) => context.queryClient.ensureQueryData(productsQueryOptions),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const productDetailQueryOptions = (slug) => queryOptions({
  queryKey: ["product", slug],
  queryFn: async () => {
    const res = await fetch(`https://luxora-premium-e-commerce-application.onrender.com/api/products/slug/${slug}`);
    if (res.status === 404) {
      throw notFound();
    }
    if (!res.ok) {
      throw new Error(`Failed to fetch product details for slug ${slug}`);
    }
    const data = await res.json();
    return mapBackendProduct(data);
  }
});
const $$splitNotFoundComponentImporter$1 = () => import("./product._slug-DYYGPHbr.mjs");
const $$splitComponentImporter$1 = () => import("./product._slug-DxdcDcV1.mjs");
const Route$1 = createFileRoute("/product/$slug")({
  head: ({
    params
  }) => ({
    meta: [{
      title: `${params.slug.replace(/-/g, " ")} — LUXORA`
    }]
  }),
  loader: ({
    params,
    context
  }) => context.queryClient.ensureQueryData(productDetailQueryOptions(params.slug)),
  component: lazyRouteComponent($$splitComponentImporter$1, "component"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent")
});
const orderDetailQueryOptions = (id) => queryOptions({
  queryKey: ["order", id],
  queryFn: async () => {
    const res = await luxeFetch(`https://luxora-premium-e-commerce-application.onrender.com/api/orders/${id}`);
    if (res.status === 404) {
      throw notFound();
    }
    if (!res.ok) {
      throw new Error(`Failed to fetch order details for id ${id}`);
    }
    return res.json();
  }
});
const $$splitNotFoundComponentImporter = () => import("./account.orders._id-CuvoQyRa.mjs");
const $$splitComponentImporter = () => import("./account.orders._id-BXsSzm3j.mjs");
const Route = createFileRoute("/account/orders/$id")({
  head: ({
    params
  }) => ({
    meta: [{
      title: `Order ${params.id} — LUXORA`
    }]
  }),
  loader: ({
    params,
    context
  }) => context.queryClient.ensureQueryData(orderDetailQueryOptions(params.id)),
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
const WishlistRoute = Route$d.update({
  id: "/wishlist",
  path: "/wishlist",
  getParentRoute: () => Route$f
});
const ShopRoute = Route$e.update({
  id: "/shop",
  path: "/shop",
  getParentRoute: () => Route$f
});
const RegisterRoute = Route$c.update({
  id: "/register",
  path: "/register",
  getParentRoute: () => Route$f
});
const LoginRoute = Route$b.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$f
});
const FaqRoute = Route$a.update({
  id: "/faq",
  path: "/faq",
  getParentRoute: () => Route$f
});
const ContactRoute = Route$9.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$f
});
const CheckoutRoute = Route$8.update({
  id: "/checkout",
  path: "/checkout",
  getParentRoute: () => Route$f
});
const CartRoute = Route$7.update({
  id: "/cart",
  path: "/cart",
  getParentRoute: () => Route$f
});
const AdminRoute = Route$5.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$f
});
const AccountRoute = Route$4.update({
  id: "/account",
  path: "/account",
  getParentRoute: () => Route$f
});
const AboutRoute = Route$3.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$f
});
const IndexRoute = Route$2.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$f
});
const ProductSlugRoute = Route$1.update({
  id: "/product/$slug",
  path: "/product/$slug",
  getParentRoute: () => Route$f
});
const AccountOrdersRoute = Route$6.update({
  id: "/orders",
  path: "/orders",
  getParentRoute: () => AccountRoute
});
const AccountOrdersIdRoute = Route.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => AccountOrdersRoute
});
const AccountOrdersRouteChildren = {
  AccountOrdersIdRoute
};
const AccountOrdersRouteWithChildren = AccountOrdersRoute._addFileChildren(
  AccountOrdersRouteChildren
);
const AccountRouteChildren = {
  AccountOrdersRoute: AccountOrdersRouteWithChildren
};
const AccountRouteWithChildren = AccountRoute._addFileChildren(AccountRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  AccountRoute: AccountRouteWithChildren,
  AdminRoute,
  CartRoute,
  CheckoutRoute,
  ContactRoute,
  FaqRoute,
  LoginRoute,
  RegisterRoute,
  ShopRoute,
  WishlistRoute,
  ProductSlugRoute
};
const routeTree = Route$f._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$e as R,
  useAuth as a,
  Route$c as b,
  Route$b as c,
  useCart as d,
  Route$1 as e,
  productDetailQueryOptions as f,
  Route as g,
  orderDetailQueryOptions as h,
  luxeFetch as l,
  ordersQueryOptions as o,
  productsQueryOptions as p,
  router as r,
  useWishlist as u
};
