import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { o as ordersQueryOptions } from "./router-DpDkR4l0.mjs";
import { d as useRouterState, O as Outlet, L as Link } from "../_libs/tanstack__react-router.mjs";
import { f as formatPrice } from "./products-BFMusDug.mjs";
import { u as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import "../_libs/sonner.mjs";
import { i as ChevronRight } from "../_libs/lucide-react.mjs";
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
function Orders() {
  const orders = useSuspenseQuery(ordersQueryOptions).data;
  const pathname = useRouterState({
    select: (r) => r.location.pathname
  });
  if (pathname !== "/account/orders") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Order History" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-4xl md:text-5xl mt-3", children: "Your Orders" }),
    orders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif text-2xl", children: "No orders found." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "mt-6 inline-block link-underline eyebrow", children: "Begin shopping" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 border-y border-border divide-y divide-border", children: orders.map((o) => {
      const itemsCount = o.items.reduce((acc, item) => acc + item.qty, 0);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/account/orders/$id", params: {
        id: o._id
      }, className: "flex items-center justify-between py-6 hover:bg-muted/40 transition px-2 -mx-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif text-lg", children: o.orderNumber }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
            new Date(o.createdAt).toLocaleDateString("en-US", {
              dateStyle: "long"
            }),
            " · ",
            itemsCount,
            " item",
            itemsCount > 1 ? "s" : ""
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs tracking-[0.25em] uppercase ${o.status === "Delivered" ? "text-gold-deep" : o.status === "In Transit" ? "text-gold" : "text-muted-foreground"}`, children: o.status }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif", children: formatPrice(o.financials.total) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })
        ] })
      ] }, o._id);
    }) })
  ] });
}
export {
  Orders as component
};
