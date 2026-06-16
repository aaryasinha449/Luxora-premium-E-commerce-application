import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { g as Route, h as orderDetailQueryOptions } from "./router-DpDkR4l0.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { f as formatPrice } from "./products-BFMusDug.mjs";
import { u as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import "../_libs/sonner.mjs";
import { f as Check, j as Package, q as Truck, s as House } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/zustand.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const STEPS = [{
  icon: Check,
  label: "Confirmed"
}, {
  icon: Package,
  label: "Prepared"
}, {
  icon: Truck,
  label: "Shipped"
}, {
  icon: House,
  label: "Delivered"
}];
function OrderDetail() {
  const params = Route.useParams();
  const order = useSuspenseQuery(orderDetailQueryOptions(params.id)).data;
  const statusMap = {
    "Confirmed": 0,
    "Prepared": 1,
    "Shipped": 2,
    "Delivered": 3
  };
  const activeIdx = statusMap[order.tracking.status] ?? 0;
  const items = order.items;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/account/orders", className: "eyebrow link-underline", children: "← All orders" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-serif text-4xl md:text-5xl mt-4", children: [
      "Order ",
      order.orderNumber
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-2", children: [
      new Date(order.createdAt).toLocaleDateString("en-US", {
        dateStyle: "long"
      }),
      " · ",
      formatPrice(order.financials.total)
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted p-8 mt-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow !text-gold mb-6", children: "Tracking" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 right-0 top-5 h-px bg-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 top-5 h-px bg-gold transition-all", style: {
          width: `${activeIdx / 3 * 100}%`
        } }),
        STEPS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col items-center gap-2 z-10 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-10 w-10 rounded-full flex items-center justify-center ${i <= activeIdx ? "bg-gold text-ink" : "bg-background border border-border text-muted-foreground"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs tracking-wider mt-1", children: s.label })
        ] }, s.label))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-center mt-6 text-muted-foreground italic", children: order.tracking.message })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "eyebrow mt-12 mb-4", children: "Items in this order" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border border-y border-border", children: items.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-5 flex gap-5 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-24 bg-muted overflow-hidden flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.image, alt: p.name, className: "h-full w-full object-cover" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif text-lg", children: p.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
          p.color,
          " · Size ",
          p.size,
          " · ×",
          p.qty
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif", children: formatPrice(p.price * p.qty) })
    ] }, `${p.product}-${p.size}-${p.color}`)) })
  ] });
}
export {
  OrderDetail as component
};
