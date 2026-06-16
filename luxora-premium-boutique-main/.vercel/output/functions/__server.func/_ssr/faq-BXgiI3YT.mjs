import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { C as ChevronDown } from "../_libs/lucide-react.mjs";
const SECTIONS = [{
  title: "Orders & Shipping",
  items: [["When will my order be delivered?", "Standard delivery takes 5–7 days. Express is 2–3 days. Orders over $500 ship complimentary worldwide."], ["Do you offer same-day delivery?", "Yes — in Paris, Milan, London and New York. Available at checkout for orders placed before 13:00 local time."], ["Can I change my delivery address?", "Contact our concierge within 2 hours of placing the order and we will adjust where possible."]]
}, {
  title: "Returns & Repairs",
  items: [["What is your return policy?", "Complimentary returns within 30 days. Items must be unworn, with all tags and dust bags."], ["Do you offer repairs?", "Every LUXORA piece carries a lifetime craftsmanship guarantee. Bring your piece to any boutique."], ["Can I exchange for a different size?", "Yes — simply request an exchange in your account or with your client advisor."]]
}, {
  title: "Product & Care",
  items: [["How should I care for my leather goods?", "Store in the dust bag, away from direct sunlight. Wipe with a soft cloth. Avoid water and oils."], ["Are LUXORA materials ethically sourced?", "We work with mills and tanneries audited annually to ISO 14001 standards."], ["Do you offer custom monogramming?", "Yes — on leather goods, complimentary, in your choice of foils."]]
}, {
  title: "Account & Privacy",
  items: [["Is my personal data secure?", "We use bank-grade encryption. We never share your data with third parties."], ["How do I delete my account?", "Email concierge@luxora.com. We process requests within 48 hours."]]
}];
function FAQ() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-ink text-bone py-24 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow !text-gold", children: "Help Centre" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl md:text-7xl mt-4", children: "Frequently Asked" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-luxe py-20 max-w-3xl", children: SECTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-2xl mb-6", children: s.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border border-y border-border", children: s.items.map(([q, a]) => /* @__PURE__ */ jsxRuntimeExports.jsx(Item, { q, a }, q)) })
    ] }, s.title)) })
  ] });
}
function Item({
  q,
  a
}) {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpen(!open), className: "w-full flex justify-between items-center py-5 text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif text-lg", children: q }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: `h-4 w-4 transition-transform text-gold ${open ? "rotate-180" : ""}` })
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pb-5 text-muted-foreground leading-relaxed", children: a })
  ] });
}
export {
  FAQ as component
};
