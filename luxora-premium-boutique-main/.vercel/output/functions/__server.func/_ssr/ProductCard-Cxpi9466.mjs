import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { f as formatPrice } from "./products-BFMusDug.mjs";
import { u as useWishlist } from "./router-DpDkR4l0.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { H as Heart } from "../_libs/lucide-react.mjs";
function ProductCard({ product, index = 0 }) {
  const { has, toggle } = useWishlist();
  const liked = has(product.id);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-50px" },
      transition: { duration: 0.6, delay: Math.min(index, 6) * 0.05, ease: [0.19, 1, 0.22, 1] },
      className: "group",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/product/$slug", params: { slug: product.slug }, className: "block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[3/4] overflow-hidden bg-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: product.images[0],
              alt: product.name,
              loading: "lazy",
              className: "h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            }
          ),
          product.images[1] && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: product.images[1],
              alt: "",
              loading: "lazy",
              className: "absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-4 left-4 flex flex-col gap-2", children: [
            product.isNew && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-ink text-bone text-[10px] tracking-[0.25em] px-3 py-1.5 uppercase", children: "New" }),
            product.compareAt && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gold text-ink text-[10px] tracking-[0.25em] px-3 py-1.5 uppercase", children: "Edit" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: (e) => {
                e.preventDefault();
                toggle(product.id);
              },
              "aria-label": "Add to wishlist",
              className: "absolute top-4 right-4 h-9 w-9 rounded-full bg-background/90 backdrop-blur flex items-center justify-center hover:bg-gold transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: `h-4 w-4 ${liked ? "fill-ink text-ink" : ""}` })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-4 bottom-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background text-foreground text-center py-3 text-[11px] tracking-[0.3em] uppercase", children: "Quick View" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-5 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow !text-muted-foreground !text-[10px]", children: product.tagline }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-lg mt-2", children: product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center justify-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(product.price) }),
            product.compareAt && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground line-through text-xs", children: formatPrice(product.compareAt) })
          ] })
        ] })
      ] })
    }
  );
}
export {
  ProductCard as P
};
