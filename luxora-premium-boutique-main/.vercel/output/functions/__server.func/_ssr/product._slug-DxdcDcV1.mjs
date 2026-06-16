import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as Route$1, f as productDetailQueryOptions, p as productsQueryOptions, d as useCart, u as useWishlist } from "./router-DpDkR4l0.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { f as formatPrice } from "./products-BFMusDug.mjs";
import { P as ProductCard } from "./ProductCard-Cxpi9466.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { p as Star, a as ShoppingBag, H as Heart, q as Truck, R as RefreshCw, r as ShieldCheck, C as ChevronDown } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/zustand.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function ProductPage() {
  const params = Route$1.useParams();
  const product = useSuspenseQuery(productDetailQueryOptions(params.slug)).data;
  const allProducts = useSuspenseQuery(productsQueryOptions).data;
  const [activeImg, setActiveImg] = reactExports.useState(0);
  const [size, setSize] = reactExports.useState(product.sizes[0]);
  const [color, setColor] = reactExports.useState(product.colors[0].name);
  const [qty, setQty] = reactExports.useState(1);
  const [zoomed, setZoomed] = reactExports.useState(false);
  const add = useCart((s) => s.add);
  const {
    has,
    toggle
  } = useWishlist();
  const related = allProducts.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  const onAdd = () => {
    add({
      product,
      size,
      color,
      qty
    });
    toast.success("Added to your bag", {
      description: `${product.name} · ${color} · ${size}`
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-luxe py-6 text-xs text-muted-foreground tracking-wider", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-gold", children: "Home" }),
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-2", children: "/" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "hover:text-gold", children: "Shop" }),
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-2", children: "/" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: product.name })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-luxe grid lg:grid-cols-2 gap-8 lg:gap-16 pb-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:flex flex-col gap-3 w-20 flex-shrink-0", children: product.images.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveImg(i), className: `aspect-[3/4] overflow-hidden ${activeImg === i ? "ring-1 ring-gold" : "opacity-60 hover:opacity-100"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img, alt: "", className: "h-full w-full object-cover", loading: "lazy" }) }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          opacity: 0
        }, animate: {
          opacity: 1
        }, transition: {
          duration: 0.6
        }, className: "flex-1 relative aspect-[3/4] overflow-hidden bg-muted cursor-zoom-in", onClick: () => setZoomed(!zoomed), children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: product.images[activeImg], alt: product.name, className: `h-full w-full object-cover transition-transform duration-700 ${zoomed ? "scale-150" : "scale-100"}` }) }, activeImg)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:sticky lg:top-28 lg:self-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: product.tagline }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-3xl md:text-5xl mt-3", children: product.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5 text-gold", children: Array.from({
            length: 5
          }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: `h-3.5 w-3.5 ${i < Math.round(product.rating) ? "fill-gold" : ""}` }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            product.rating,
            " · ",
            product.reviews,
            " reviews"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-baseline gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-serif", children: formatPrice(product.price) }),
          product.compareAt && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground line-through", children: formatPrice(product.compareAt) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gold-line my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: product.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "eyebrow mb-3", children: [
            "Colour —",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "!text-foreground !tracking-normal !text-sm normal-case font-serif italic", children: color })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: product.colors.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setColor(c.name), className: `h-9 w-9 rounded-full border-2 transition ${color === c.name ? "border-gold ring-2 ring-gold/30" : "border-border"}`, style: {
            background: c.hex
          }, "aria-label": c.name }, c.name)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Size" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "text-xs underline text-muted-foreground", children: "Size guide" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-2", children: product.sizes.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSize(s), className: `py-3 text-sm border transition ${size === s ? "border-ink bg-ink text-bone" : "border-border hover:border-ink"}`, children: s }, s)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(Math.max(1, qty - 1)), className: "px-4 hover:bg-muted", children: "−" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-4 py-3 min-w-12 text-center text-sm", children: qty }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(qty + 1), className: "px-4 hover:bg-muted", children: "+" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onAdd, className: "flex-1 bg-ink text-bone py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-gold hover:text-ink transition-colors flex items-center justify-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-4 w-4" }),
            " Add to Bag"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toggle(product.id), className: "border border-border w-14 flex items-center justify-center hover:border-gold transition", "aria-label": "Wishlist", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: `h-4 w-4 ${has(product.id) ? "fill-ink" : ""}` }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3 mt-10 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trust, { icon: Truck, label: "Complimentary shipping" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trust, { icon: RefreshCw, label: "30-day returns" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trust, { icon: ShieldCheck, label: "Lifetime guarantee" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 divide-y divide-border border-y border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Acc, { title: "The Details", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 list-disc pl-4", children: product.details.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: d }, d)) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Acc, { title: "Shipping & Returns", children: "Complimentary express delivery on orders over $500. Free returns within 30 days. Items hand-checked at our Milan distribution centre." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Acc, { title: "Care Instructions", children: "We recommend professional dry cleaning. Store in the provided dust bag. Lifetime restoration available at any LUXORA boutique." })
        ] })
      ] })
    ] }),
    related.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-luxe py-20 border-t border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-center", children: "Complete the look" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-3xl md:text-4xl text-center mt-3 mb-12", children: "You may also love" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10", children: related.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p, index: i }, p.id)) })
    ] })
  ] });
}
function Trust({
  icon: Icon,
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center gap-2 p-4 bg-muted", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-gold" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label })
  ] });
}
function Acc({
  title,
  children
}) {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpen(!open), className: "flex w-full justify-between items-center py-5 text-sm font-medium", children: [
      title,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: `h-4 w-4 transition-transform ${open ? "rotate-180" : ""}` })
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-5 text-sm text-muted-foreground leading-relaxed", children })
  ] });
}
export {
  ProductPage as component
};
