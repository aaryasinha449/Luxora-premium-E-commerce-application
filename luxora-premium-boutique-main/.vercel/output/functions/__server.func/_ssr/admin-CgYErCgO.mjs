import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { f as formatPrice } from "./products-BFMusDug.mjs";
import { u as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { p as productsQueryOptions, o as ordersQueryOptions } from "./router-DpDkR4l0.mjs";
import "../_libs/sonner.mjs";
import { D as DollarSign, j as Package, k as Users, T as TrendingUp, A as ArrowUpRight, l as ArrowDownRight, E as Ellipsis } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
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
import "../_libs/zustand.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function Admin() {
  const products = useSuspenseQuery(productsQueryOptions).data;
  const orders = useSuspenseQuery(ordersQueryOptions).data;
  const topPieces = reactExports.useMemo(() => {
    return [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 5);
  }, [products]);
  const lowStockPieces = reactExports.useMemo(() => {
    return products.filter((p) => p.stock < 10);
  }, [products]);
  const stats = reactExports.useMemo(() => {
    const thirtyDaysAgo = /* @__PURE__ */ new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const revenue30d = orders.filter((o) => new Date(o.createdAt) >= thirtyDaysAgo).reduce((acc, o) => acc + o.financials.total, 0);
    const totalRevenue = orders.reduce((acc, o) => acc + o.financials.total, 0);
    const aov = orders.length > 0 ? totalRevenue / orders.length : 0;
    const uniqueClients = new Set(orders.map((o) => o.customer.email)).size;
    return [{
      label: "Revenue (30d)",
      value: formatPrice(revenue30d),
      change: "+12.4%",
      up: true,
      icon: DollarSign
    }, {
      label: "Orders",
      value: orders.length.toString(),
      change: "+8.2%",
      up: true,
      icon: Package
    }, {
      label: "Clients",
      value: uniqueClients.toString(),
      change: "+4.1%",
      up: true,
      icon: Users
    }, {
      label: "AOV",
      value: formatPrice(aov),
      change: "-2.1%",
      up: false,
      icon: TrendingUp
    }];
  }, [orders]);
  const chartData = reactExports.useMemo(() => {
    const data = Array(12).fill(0);
    const now = /* @__PURE__ */ new Date();
    for (let i = 0; i < 12; i++) {
      const monthDate = new Date(now.getFullYear(), now.getMonth() - (11 - i), 1);
      const year = monthDate.getFullYear();
      const month = monthDate.getMonth();
      const monthOrders = orders.filter((o) => {
        const oDate = new Date(o.createdAt);
        return oDate.getFullYear() === year && oDate.getMonth() === month;
      });
      data[i] = monthOrders.reduce((acc, o) => acc + o.financials.total, 0);
    }
    const maxVal = Math.max(...data, 1);
    return data.map((val) => val / maxVal * 100);
  }, [orders]);
  const recentOrders = reactExports.useMemo(() => {
    return orders.slice(0, 5);
  }, [orders]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-ink text-bone min-h-screen -mb-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-luxe py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-end mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow !text-gold", children: "Admin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-4xl md:text-5xl mt-3 text-bone", children: "Maison Dashboard" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-xs link-underline tracking-[0.25em] uppercase text-bone/60", children: "Back to site" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: stats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 20
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      delay: i * 0.08
    }, className: "border border-bone/10 p-6 hover:border-gold/40 transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-4 w-4 text-gold" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-xs flex items-center gap-1 ${s.up ? "text-emerald-400" : "text-rose-400"}`, children: [
          s.up ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownRight, { className: "h-3 w-3" }),
          " ",
          s.change
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif text-3xl mt-6", children: s.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow !text-bone/40 mt-2 !text-[10px]", children: s.label })
    ] }, s.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-4 mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 border border-bone/10 p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-xl", children: "Revenue · Last 12 months" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-bone/40 mt-1", children: "Updated 4 minutes ago" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "h-4 w-4 text-bone/40" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-2 h-48", children: chartData.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          height: 0
        }, animate: {
          height: `${v}%`
        }, transition: {
          delay: i * 0.04,
          duration: 0.7,
          ease: [0.19, 1, 0.22, 1]
        }, className: "flex-1 bg-gradient-to-t from-gold to-gold/30 hover:from-gold hover:to-gold/60 cursor-pointer" }, i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-bone/10 p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-xl", children: "Top Pieces" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 space-y-4", children: topPieces.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-gold text-2xl w-6", children: i + 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-12 bg-bone/5 overflow-hidden flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.images[0], alt: "", className: "h-full w-full object-cover" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm truncate", children: p.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-bone/40", children: [
              p.reviews,
              " sold"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gold", children: formatPrice(p.price) })
        ] }, p.id)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-4 mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-bone/10 p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-xl mb-6", children: "Recent Orders" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-left text-xs text-bone/40 uppercase tracking-wider", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3", children: "Order" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3", children: "Customer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3 text-right", children: "Total" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-bone/10", children: recentOrders.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-bone", children: o.orderNumber }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-bone/40", children: new Date(o.createdAt).toLocaleDateString("en-US", {
                dateStyle: "short"
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-4 text-bone/80", children: [
              o.customer.firstName,
              " ",
              o.customer.lastName
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs ${o.status === "Delivered" ? "text-emerald-400" : o.status === "In Transit" ? "text-gold" : "text-bone/60"}`, children: o.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-right font-serif", children: formatPrice(o.financials.total) })
          ] }, o._id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-bone/10 p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-xl mb-6", children: "Inventory Alerts" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: lowStockPieces.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 p-3 bg-bone/5 hover:bg-bone/10 transition", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-12 bg-ink overflow-hidden flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.images[0], alt: "", className: "h-full w-full object-cover" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: p.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-bone/40", children: p.subcategory })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gold text-sm", children: [
              p.stock,
              " left"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "text-[10px] text-bone/40 hover:text-bone uppercase tracking-wider", children: "Restock" })
          ] })
        ] }, p.id)) })
      ] })
    ] })
  ] }) });
}
export {
  Admin as component
};
