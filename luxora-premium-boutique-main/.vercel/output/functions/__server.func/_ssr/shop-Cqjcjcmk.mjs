import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { p as productsQueryOptions, R as Route$e } from "./router-DpDkR4l0.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { P as ProductCard } from "./ProductCard-Cxpi9466.mjs";
import { u as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import "../_libs/sonner.mjs";
import { S as Search, b as SlidersHorizontal } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
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
import "./products-BFMusDug.mjs";
const SORTS = ["Featured", "Newest", "Price: Low → High", "Price: High → Low"];
const CATS = [{
  slug: void 0,
  label: "All"
}, {
  slug: "women",
  label: "Women"
}, {
  slug: "men",
  label: "Men"
}, {
  slug: "accessories",
  label: "Accessories"
}, {
  slug: "jewelry",
  label: "Jewelry"
}];
function Shop() {
  const products = useSuspenseQuery(productsQueryOptions).data;
  const {
    c,
    q
  } = Route$e.useSearch();
  const navigate = Route$e.useNavigate();
  const [sort, setSort] = reactExports.useState("Featured");
  const [query, setQuery] = reactExports.useState(q ?? "");
  const [priceMax, setPriceMax] = reactExports.useState(5e3);
  const filtered = reactExports.useMemo(() => {
    let list = [...products];
    if (c) list = list.filter((p) => p.category === c);
    if (query) list = list.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
    list = list.filter((p) => p.price <= priceMax);
    if (sort === "Newest") list.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
    if (sort === "Price: Low → High") list.sort((a, b) => a.price - b.price);
    if (sort === "Price: High → Low") list.sort((a, b) => b.price - a.price);
    return list;
  }, [c, query, sort, priceMax, products]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-ink text-bone py-24 md:py-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-luxe text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow !text-gold", children: "The Collection" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl md:text-7xl mt-4", children: c ? c.charAt(0).toUpperCase() + c.slice(1) : "Maison" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-bone/60 max-w-xl mx-auto", children: [
        filtered.length,
        " pieces — every garment hand-finished in Europe."
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-luxe py-10 sticky top-20 bg-background/95 backdrop-blur z-30 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4 justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 overflow-x-auto", children: CATS.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
        search: {
          c: cat.slug,
          q: query || void 0
        }
      }), className: `px-4 py-2 text-[11px] tracking-[0.25em] uppercase whitespace-nowrap transition-colors ${(c ?? void 0) === cat.slug ? "bg-ink text-bone" : "hover:text-gold"}`, children: cat.label }, cat.label)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search the maison", className: "pl-9 pr-3 py-2 bg-muted text-sm w-48 md:w-64 outline-none focus:ring-1 focus:ring-gold" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: sort, onChange: (e) => setSort(e.target.value), className: "bg-muted py-2 px-3 text-sm outline-none cursor-pointer", children: SORTS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: s }, s)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-luxe py-12 grid lg:grid-cols-[220px_1fr] gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden lg:block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "eyebrow flex items-center gap-2 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-3 w-3" }),
          " Refine"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium mb-3", children: "Price" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: 200, max: 5e3, step: 50, value: priceMax, onChange: (e) => setPriceMax(Number(e.target.value)), className: "w-full accent-[var(--gold)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-2", children: [
              "Up to $",
              priceMax.toLocaleString()
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium mb-3", children: "Colour" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: ["#0a0a0a", "#d4af37", "#f4ecd8", "#7a3f17", "#5b1a1f"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "h-7 w-7 rounded-full border border-border hover:scale-110 transition", style: {
              background: h
            } }, h)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium mb-3", children: "Size" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-1.5", children: ["XS", "S", "M", "L", "XL", "XXL"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "border border-border py-1.5 text-xs hover:border-ink transition", children: s }, s)) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-32", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif text-3xl", children: "No pieces match this search." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "mt-6 inline-block link-underline eyebrow", children: "Reset filters" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { layout: true, className: "grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10", children: filtered.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p, index: i }, p.id)) }) })
    ] })
  ] });
}
export {
  Shop as component
};
