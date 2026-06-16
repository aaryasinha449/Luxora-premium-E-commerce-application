import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useWishlist, p as productsQueryOptions } from "./router-DpDkR4l0.mjs";
import { P as ProductCard } from "./ProductCard-Cxpi9466.mjs";
import { u as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import "../_libs/sonner.mjs";
import { H as Heart } from "../_libs/lucide-react.mjs";
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
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "./products-BFMusDug.mjs";
function Wishlist() {
  const ids = useWishlist((s) => s.ids);
  const products = useSuspenseQuery(productsQueryOptions).data;
  const items = products.filter((p) => ids.includes(p.id));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-luxe py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Saved for later" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-4xl md:text-5xl mt-3", children: "Your Wishlist" }),
    items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-32 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-12 w-12 mx-auto text-gold", strokeWidth: 1 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 font-serif text-3xl", children: "Curate your wardrobe" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Tap the heart on any piece to save it here." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "mt-8 inline-block link-underline eyebrow", children: "Discover the collection" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 mt-12", children: items.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p, index: i }, p.id)) })
  ] });
}
export {
  Wishlist as component
};
