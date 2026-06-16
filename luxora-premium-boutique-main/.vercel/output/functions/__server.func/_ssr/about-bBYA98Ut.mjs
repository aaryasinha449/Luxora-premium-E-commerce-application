import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { h as hero2, s as storyImg } from "./story-craft-DgMJxkhv.mjs";
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
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function About() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative h-[80vh] min-h-[520px] bg-ink overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: hero2, alt: "", className: "absolute inset-0 h-full w-full object-cover opacity-60" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-ink to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-luxe relative h-full flex flex-col justify-end pb-20 text-bone", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow !text-gold", children: "Maison · Est. 1987" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl md:text-8xl mt-5 max-w-3xl leading-[0.95]", children: "A quiet kind of luxury." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-luxe py-28 max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
        opacity: 0,
        y: 20
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, className: "font-serif text-3xl md:text-5xl leading-[1.2] italic", children: "“Luxury is in each detail — and the absence of every superfluous one.”" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mt-8", children: "— Elena Costanza, Founder" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-luxe py-20 grid lg:grid-cols-2 gap-16 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: storyImg, alt: "", className: "aspect-[4/5] object-cover", loading: "lazy" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "The Atelier" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-4xl md:text-5xl mt-3", children: "Eighty-six hands. One signature." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-muted-foreground leading-relaxed", children: "From the first sketch to the final gilded edge, each LUXORA piece travels through the hands of eighty-six artisans across our Milan, Paris and Florence ateliers. We measure time in hours of craft, not weeks of production." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground leading-relaxed", children: "Our leathers are vegetable-tanned over forty days. Our silks are loomed at a single mill in Como. Our gold hardware is cast and hand-polished in the Marais — a process unchanged in three generations." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-ink text-bone py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-luxe grid md:grid-cols-3 gap-12 text-center", children: [{
      n: "39",
      l: "Years of craft"
    }, {
      n: "86",
      l: "Artisan hands per piece"
    }, {
      n: "12",
      l: "Boutiques worldwide"
    }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-7xl md:text-8xl text-gold", children: s.n }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow !text-bone/60 mt-4", children: s.l })
    ] }, s.l)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-luxe py-28 text-center max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Sustainability" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-4xl md:text-5xl mt-4", children: "Slow by design." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-muted-foreground leading-relaxed", children: "Every LUXORA garment carries a lifetime craftsmanship guarantee — because beauty that lasts is the only beauty worth making." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "mt-10 inline-block bg-ink text-bone px-10 py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-gold hover:text-ink transition-colors", children: "Discover the Collection" })
    ] })
  ] });
}
export {
  About as component
};
