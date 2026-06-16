import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { P as Phone, c as Mail, d as MapPin, e as Clock } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
function Contact() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-ink text-bone py-24 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow !text-gold", children: "Concierge" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl md:text-7xl mt-4", children: "At your service." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-bone/60 max-w-xl mx-auto", children: "A private team of advisors is available, in seven languages, every day of the year." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-luxe py-20 grid lg:grid-cols-2 gap-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-3xl", children: "Reach the maison" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 mt-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Item, { icon: Phone, title: "Client Advisor", lines: ["+1 (800) LUXORA · 24/7"] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Item, { icon: Mail, title: "Email", lines: ["concierge@luxora.com"] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Item, { icon: MapPin, title: "Flagship Boutique", lines: ["12 Rue Saint-Honoré", "75008 Paris, France"] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Item, { icon: Clock, title: "Atelier Hours", lines: ["Mon–Sat · 10:00 – 19:00", "Private appointments by reservation"] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        toast.success("Message sent", {
          description: "Your advisor will reply within 24 hours."
        });
      }, className: "bg-muted p-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-2xl", children: "Write to us" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 mt-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "First name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Last name" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Email", type: "email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Subject" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow !text-[10px] mb-2 block", children: "Message" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 5, className: "w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-gold resize-none" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "w-full bg-ink text-bone py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-gold hover:text-ink transition-colors", children: "Send Message" })
        ] })
      ] })
    ] })
  ] });
}
function Item({
  icon: Icon,
  title,
  lines
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-gold" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow !text-[10px]", children: title }),
      lines.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif text-lg", children: l }, l))
    ] })
  ] });
}
function Input({
  label,
  type = "text"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow !text-[10px] mb-2 block", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type, className: "w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-gold transition-colors" })
  ] });
}
export {
  Contact as component
};
