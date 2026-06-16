import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as storyImg, h as hero2 } from "./story-craft-DgMJxkhv.mjs";
import { P as ProductCard } from "./ProductCard-Cxpi9466.mjs";
import { c as categories, t as testimonials } from "./products-BFMusDug.mjs";
import { u as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { p as productsQueryOptions } from "./router-DpDkR4l0.mjs";
import "../_libs/sonner.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { o as ArrowRight } from "../_libs/lucide-react.mjs";
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
const hero1 = "/assets/hero-1-BPiclYgi.jpg";
function Home() {
  const products = useSuspenseQuery(productsQueryOptions).data;
  const bestSellers = reactExports.useMemo(() => {
    const filtered = products.filter((p) => p.isBestSeller);
    if (filtered.length > 0) return filtered;
    return [...products].sort((a, b) => b.price - a.price).slice(0, 4);
  }, [products]);
  const newArrivals = reactExports.useMemo(() => {
    const filtered = products.filter((p) => p.isNew);
    if (filtered.length > 0) return filtered;
    return products.slice(0, 4);
  }, [products]);
  const dynamicCategories = reactExports.useMemo(() => {
    return categories.map((c) => ({
      ...c,
      count: products.filter((p) => p.category === c.slug).length
    }));
  }, [products]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative h-[92vh] min-h-[640px] w-full overflow-hidden bg-ink", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.img, { src: hero1, alt: "LUXORA — Fall Couture", initial: {
        scale: 1.1
      }, animate: {
        scale: 1
      }, transition: {
        duration: 2.4,
        ease: [0.19, 1, 0.22, 1]
      }, className: "absolute inset-0 h-full w-full object-cover opacity-80" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative container-luxe h-full flex flex-col justify-end pb-24 text-bone", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: 0.4,
          duration: 0.8
        }, className: "eyebrow !text-gold", children: "The Fall Collection — Chapter I" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.h1, { initial: {
          opacity: 0,
          y: 30
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: 0.55,
          duration: 1
        }, className: "font-display text-5xl md:text-7xl lg:text-[6.5rem] leading-[0.95] mt-5 max-w-4xl", children: [
          "Crafted in shadow,",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "finished in gold."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0
        }, animate: {
          opacity: 1
        }, transition: {
          delay: 0.9,
          duration: 1
        }, className: "mt-9 flex flex-wrap gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shop", className: "group inline-flex items-center gap-3 bg-bone text-ink px-8 py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-gold transition-colors", children: [
            "Discover Collection",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", className: "inline-flex items-center gap-3 border border-bone/40 text-bone px-8 py-4 text-[11px] tracking-[0.3em] uppercase hover:border-gold hover:text-gold transition-colors", children: "The Maison" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-6 left-1/2 -translate-x-1/2 text-bone/60 text-[10px] tracking-[0.4em] uppercase animate-pulse", children: "Scroll" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden border-y border-border py-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-12 whitespace-nowrap font-display tracking-[0.3em] text-2xl md:text-4xl animate-[marquee_40s_linear_infinite]", children: Array.from({
        length: 6
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-12 text-muted-foreground", children: [
        "MILAN · PARIS · NEW YORK · TOKYO · DUBAI ·",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: "✦" })
      ] }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }` })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { eyebrow: "The Universe", title: "A Maison without borders", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5", children: dynamicCategories.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      opacity: 0,
      y: 30
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true
    }, transition: {
      duration: 0.7,
      delay: i * 0.08
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shop", search: {
      c: c.slug
    }, className: "group block relative aspect-[3/4] overflow-hidden bg-muted", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: c.image, alt: c.name, loading: "lazy", className: "h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-110" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 p-6 text-bone", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "eyebrow !text-gold !text-[9px]", children: [
          c.count,
          " pieces"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-2xl md:text-3xl mt-1", children: c.name })
      ] })
    ] }) }, c.slug)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { eyebrow: "Iconic", title: "Bestowed favourites", link: {
      to: "/shop",
      label: "View all"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10", children: bestSellers.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p, index: i }, p.id)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-luxe my-32 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        x: -30
      }, whileInView: {
        opacity: 1,
        x: 0
      }, viewport: {
        once: true
      }, transition: {
        duration: 0.9
      }, className: "relative aspect-[4/5] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: storyImg, alt: "Atelier craftsmanship", loading: "lazy", className: "h-full w-full object-cover" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Heritage — Est. 1987" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-serif text-4xl md:text-6xl mt-5 leading-[1.05]", children: [
          "Four decades of ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "text-gold not-italic", children: "slow" }),
          " craftsmanship."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-7 text-muted-foreground leading-relaxed max-w-md", children: "From a single Milanese atelier to a quietly global maison — every LUXORA piece is shaped by the same uncompromising hands. Eighty-six steps. Forty hours. One signature." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/about", className: "mt-10 inline-flex items-center gap-3 link-underline text-[11px] tracking-[0.3em] uppercase", children: [
          "Read the journal ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { eyebrow: "Just Arrived", title: "New for the season", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10", children: newArrivals.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p, index: i }, p.id)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-ink text-bone py-24 mt-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-luxe", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow !text-gold text-center", children: "Press" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-3xl md:text-5xl text-center mt-4 mb-16 max-w-3xl mx-auto", children: "The maison in their own words." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-10", children: testimonials.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        delay: i * 0.1,
        duration: 0.7
      }, className: "border-l border-bone/20 pl-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-serif text-xl italic text-bone/90 leading-relaxed", children: [
          '"',
          t.quote,
          '"'
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: t.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-bone/50 mt-1", children: t.role })
        ] })
      ] }, t.name)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-luxe py-28 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Le Cercle Privé" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-4xl md:text-6xl mt-5 max-w-2xl mx-auto leading-[1.05]", children: "Invitations to private previews." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => e.preventDefault(), className: "mt-10 max-w-md mx-auto flex border-b border-foreground/30 pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", placeholder: "Your email address", className: "flex-1 bg-transparent outline-none text-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "text-[11px] tracking-[0.3em] uppercase text-gold-deep hover:text-gold", children: "Join" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: hero2, alt: "", "aria-hidden": true, className: "hidden" })
  ] });
}
function Section({
  eyebrow,
  title,
  children,
  link
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-luxe py-24 md:py-28", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-14 flex-wrap gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: eyebrow }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-3xl md:text-5xl mt-3", children: title })
      ] }),
      link && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: link.to, className: "link-underline text-[11px] tracking-[0.3em] uppercase", children: link.label })
    ] }),
    children
  ] });
}
export {
  Home as component
};
