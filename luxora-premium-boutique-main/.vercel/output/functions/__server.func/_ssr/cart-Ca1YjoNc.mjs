import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { d as useCart } from "./router-DpDkR4l0.mjs";
import { f as formatPrice } from "./products-BFMusDug.mjs";
import "../_libs/sonner.mjs";
import { a as ShoppingBag, X, g as Minus, h as Plus } from "../_libs/lucide-react.mjs";
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
function Cart() {
  const {
    items,
    setQty,
    remove,
    subtotal
  } = useCart();
  const total = subtotal();
  const shipping = total > 500 || total === 0 ? 0 : 25;
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-luxe py-32 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-12 w-12 mx-auto text-gold", strokeWidth: 1 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-5xl mt-8", children: "Your bag awaits" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "Discover hand-finished pieces from the new collection." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "mt-10 inline-block bg-ink text-bone px-10 py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-gold hover:text-ink transition-colors", children: "Begin shopping" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-luxe py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "eyebrow", children: [
      "Bag — ",
      items.length,
      " ",
      items.length === 1 ? "piece" : "pieces"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-4xl md:text-5xl mt-3", children: "Your Selection" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-[1fr_380px] gap-12 mt-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border border-y border-border", children: items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-8 flex gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/product/$slug", params: {
          slug: it.product.slug
        }, className: "w-28 md:w-40 aspect-[3/4] bg-muted overflow-hidden flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: it.product.images[0], alt: it.product.name, className: "h-full w-full object-cover" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow !text-muted-foreground !text-[10px]", children: it.product.tagline }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-xl mt-1", children: it.product.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-2", children: [
                it.color,
                " · Size ",
                it.size
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => remove(it.product.id, it.size, it.color), className: "text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-end mt-auto pt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(it.product.id, it.size, it.color, it.qty - 1), className: "px-3 hover:bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3 w-3" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-4 py-2 text-sm min-w-10 text-center", children: it.qty }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(it.product.id, it.size, it.color, it.qty + 1), className: "px-3 hover:bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif text-lg", children: formatPrice(it.product.price * it.qty) })
          ] })
        ] })
      ] }, `${it.product.id}-${it.size}-${it.color}`)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "bg-muted p-8 self-start sticky top-28", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "eyebrow mb-6", children: "Order Summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Subtotal", value: formatPrice(total) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Shipping", value: shipping === 0 ? "Complimentary" : formatPrice(shipping) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Estimated tax", value: "At checkout" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gold-line my-6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Total", value: formatPrice(total + shipping), large: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/checkout", className: "mt-8 block text-center bg-ink text-bone py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-gold hover:text-ink transition-colors", children: "Proceed to Checkout" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "mt-3 block text-center text-[11px] tracking-[0.3em] uppercase link-underline", children: "Continue Shopping" })
      ] })
    ] })
  ] });
}
function Row({
  label,
  value,
  large
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex justify-between mb-3 ${large ? "text-xl font-serif" : "text-sm"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: large ? "" : "text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: value })
  ] });
}
export {
  Cart as component
};
