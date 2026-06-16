import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { d as useCart, a as useAuth, l as luxeFetch } from "./router-DpDkR4l0.mjs";
import { f as formatPrice } from "./products-BFMusDug.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { a as useMutation } from "../_libs/tanstack__react-query.mjs";
import { f as Check, L as Lock } from "../_libs/lucide-react.mjs";
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
const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(id);
const STEPS = ["Contact", "Delivery", "Payment"];
function Checkout() {
  const {
    items,
    subtotal,
    clear
  } = useCart();
  const {
    user
  } = useAuth();
  const [step, setStep] = reactExports.useState(0);
  const total = subtotal();
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [firstName, setFirstName] = reactExports.useState("");
  const [lastName, setLastName] = reactExports.useState("");
  const [address, setAddress] = reactExports.useState("");
  const [city, setCity] = reactExports.useState("");
  const [postalCode, setPostalCode] = reactExports.useState("");
  const [country, setCountry] = reactExports.useState("");
  const [shippingMethod, setShippingMethod] = reactExports.useState("Standard");
  reactExports.useEffect(() => {
    if (user) {
      setEmail(user.email);
      if (user.name) {
        const parts = user.name.trim().split(/\s+/);
        if (parts.length > 0) {
          setFirstName(parts[0]);
          if (parts.length > 1) {
            setLastName(parts.slice(1).join(" "));
          }
        }
      }
    }
  }, [user]);
  const shipping = shippingMethod === "Standard" ? 0 : shippingMethod === "Express" ? 45 : 120;
  const orderMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await luxeFetch("https://luxora-premium-e-commerce-application.onrender.com/api/orders", {
        method: "POST",
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to place order.");
      }
      return res.json();
    },
    onSuccess: (data) => {
      toast.success("Order confirmed", {
        description: `Order ${data.orderNumber} placed successfully.`
      });
      clear();
      navigate({
        to: "/account/orders"
      });
    },
    onError: (error) => {
      toast.error("Checkout Failed", {
        description: error.message || "Something went wrong. Please try again."
      });
    }
  });
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-luxe py-32 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif text-3xl", children: "Your bag is empty." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "mt-6 inline-block link-underline eyebrow", children: "Continue shopping" })
    ] });
  }
  const place = async () => {
    const invalidItems = items.filter((it) => !isValidObjectId(it.product.id));
    if (invalidItems.length > 0) {
      toast.error("Cart contains outdated products", {
        description: "One or more items in your cart have outdated IDs. Please clear your cart and add the products again."
      });
      return;
    }
    const loadScript = () => new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
    const scriptLoaded = await loadScript();
    if (!scriptLoaded) {
      toast.error("Failed to load Razorpay payment gateway.");
      return;
    }
    try {
      const rzpRes = await luxeFetch("https://luxora-premium-e-commerce-application.onrender.com/api/payments/razorpay-order", {
        method: "POST",
        body: JSON.stringify({
          amountInUSD: total + shipping
        })
      });
      if (!rzpRes.ok) {
        const err = await rzpRes.json().catch(() => ({}));
        throw new Error(err.message || "Failed to initiate Razorpay order.");
      }
      const rzpOrder = await rzpRes.json();
      const options = {
        key: "rzp_test_SyQYthacpfitBc",
        amount: rzpOrder.amount,
        currency: rzpOrder.currency,
        name: "LUXORA Maison",
        description: "Atelier Couture Purchase",
        order_id: rzpOrder.id,
        handler: async function(response) {
          const payload = {
            customer: {
              email,
              phone,
              firstName,
              lastName
            },
            shippingAddress: {
              address,
              city,
              postalCode,
              country
            },
            shippingMethod,
            items: items.map((it) => ({
              product: it.product.id,
              name: it.product.name,
              price: it.product.price,
              color: it.color,
              size: it.size,
              qty: it.qty,
              image: it.product.images[0] || ""
            })),
            financials: {
              subtotal: total,
              shipping,
              total: total + shipping
            },
            paymentDetails: {
              method: "Razorpay",
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature
            }
          };
          orderMutation.mutate(payload);
        },
        prefill: {
          name: `${firstName} ${lastName}`,
          email,
          contact: phone
        },
        theme: {
          color: "#d4af37"
        }
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      toast.error("Payment Initiation Failed", {
        description: err.message || "Something went wrong initiating checkout."
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-luxe py-12 grid lg:grid-cols-[1fr_420px] gap-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 mb-12", children: STEPS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setStep(i), className: `flex-1 text-left pb-3 border-b-2 transition-colors ${i <= step ? "border-gold" : "border-border"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "eyebrow !text-[10px]", children: [
          "Step 0",
          i + 1
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm font-medium flex items-center gap-2", children: [
          s,
          " ",
          i < step && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3 text-gold" })
        ] })
      ] }, s)) }),
      step === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, { onNext: () => setStep(1), title: "Contact information", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email address", type: "email", placeholder: "you@maison.com", value: email, onChange: (e) => setEmail(e.target.value) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Phone", placeholder: "+1 (000) 000-0000", value: phone, onChange: (e) => setPhone(e.target.value) })
      ] }),
      step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, { onNext: () => setStep(2), title: "Delivery", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "First name", value: firstName, onChange: (e) => setFirstName(e.target.value) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Last name", value: lastName, onChange: (e) => setLastName(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Address", value: address, onChange: (e) => setAddress(e.target.value) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "City", value: city, onChange: (e) => setCity(e.target.value) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Postal code", value: postalCode, onChange: (e) => setPostalCode(e.target.value) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Country", value: country, onChange: (e) => setCountry(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShipOption, { label: "Standard — 5-7 days", price: "Complimentary", checked: shippingMethod === "Standard", onChange: () => setShippingMethod("Standard") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShipOption, { label: "Express — 2-3 days", price: "$45", checked: shippingMethod === "Express", onChange: () => setShippingMethod("Express") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShipOption, { label: "White-glove next-day delivery", price: "$120", checked: shippingMethod === "White-glove", onChange: () => setShippingMethod("White-glove") })
        ] })
      ] }),
      step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, { onNext: place, title: "Payment Gateway", cta: orderMutation.isPending ? "Processing..." : "Pay with Razorpay", disabled: orderMutation.isPending, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3 w-3 text-gold" }),
          " Secured and verified by Razorpay"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 bg-muted/60 border border-gold/20 text-sm space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif text-lg", children: "LUXORA Secure Billing" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Clicking the button below will initiate the secure Razorpay Standard Checkout overlay, allowing you to pay using card, UPI, net banking, or wallet." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gold", children: "All transactions are encrypted and processed in real-time. Do not close the window during the authorization process." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "bg-muted p-8 self-start lg:sticky top-28", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "eyebrow mb-6", children: "Your Order" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 max-h-72 overflow-auto pr-2", children: items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-20 bg-background flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: it.product.images[0], alt: "", className: "h-full w-full object-cover" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif", children: it.product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            it.color,
            " · ",
            it.size,
            " · ×",
            it.qty
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: formatPrice(it.product.price * it.qty) })
      ] }, `${it.product.id}-${it.size}-${it.color}`)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gold-line my-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { l: "Subtotal", v: formatPrice(total) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { l: "Shipping", v: shipping === 0 ? "Complimentary" : formatPrice(shipping) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { l: "Total", v: formatPrice(total + shipping), bold: true })
      ] })
    ] })
  ] });
}
function Field({
  label,
  type = "text",
  placeholder,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow !text-[10px] mb-2 block", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type, placeholder, value, onChange, required: true, className: "w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-gold transition-colors" })
  ] });
}
function Form({
  children,
  title,
  onNext,
  cta = "Continue",
  disabled = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
    e.preventDefault();
    onNext();
  }, className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-2xl mb-6", children: title }),
    children,
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled, className: "mt-6 w-full bg-ink text-bone py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-gold hover:text-ink transition-colors disabled:opacity-50 disabled:cursor-not-allowed", children: cta })
  ] });
}
function ShipOption({
  label,
  price,
  checked,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center justify-between border border-border p-4 cursor-pointer hover:border-gold transition-colors", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-3 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "ship", checked, onChange, className: "accent-[var(--gold)]" }),
      label
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: price })
  ] });
}
function Row({
  l,
  v,
  bold
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex justify-between ${bold ? "font-serif text-lg pt-2 border-t border-border" : "text-muted-foreground"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: l }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: v })
  ] });
}
export {
  Checkout as component
};
