import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Check, Lock } from "lucide-react";
import { useCart, useAuth } from "@/lib/store";
import { formatPrice } from "@/lib/products";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { luxeFetch } from "@/lib/api/client";

/** Returns true only for a 24-character lowercase hex string — a valid MongoDB ObjectId. */
const isValidObjectId = (id: string): boolean => /^[a-f\d]{24}$/i.test(id);

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — LUXORA" }] }),
  component: Checkout,
});

const STEPS = ["Contact", "Delivery", "Payment"];

function Checkout() {
  const { items, subtotal, clear } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const total = subtotal();
  const navigate = useNavigate();

  // Shipping details state
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [shippingMethod, setShippingMethod] = useState<"Standard" | "Express" | "White-glove">("Standard");

  // Pre-fill user data if logged in
  useEffect(() => {
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
    mutationFn: async (payload: any) => {
      const res = await luxeFetch("https://luxora-premium-e-commerce-application.onrender.com/api/orders", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to place order.");
      }
      return res.json();
    },
    onSuccess: (data) => {
      toast.success("Order confirmed", {
        description: `Order ${data.orderNumber} placed successfully.`,
      });
      clear();
      navigate({ to: "/account/orders" });
    },
    onError: (error: any) => {
      toast.error("Checkout Failed", {
        description: error.message || "Something went wrong. Please try again.",
      });
    },
  });

  if (items.length === 0) {
    return (
      <div className="container-luxe py-32 text-center">
        <p className="font-serif text-3xl">Your bag is empty.</p>
        <Link to="/shop" className="mt-6 inline-block link-underline eyebrow">Continue shopping</Link>
      </div>
    );
  }

  const place = async () => {
    // Guard: reject stale cart items that still carry hardcoded local IDs (e.g. "p1").
    const invalidItems = items.filter((it) => !isValidObjectId(it.product.id));
    if (invalidItems.length > 0) {
      toast.error("Cart contains outdated products", {
        description:
          "One or more items in your cart have outdated IDs. Please clear your cart and add the products again.",
      });
      return;
    }

    const loadScript = () =>
      new Promise((resolve) => {
        if ((window as any).Razorpay) {
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
      // Initiate Razorpay Order on Backend (USD)
      const rzpRes = await luxeFetch("https://luxora-premium-e-commerce-application.onrender.com/api/payments/razorpay-order", {
        method: "POST",
        body: JSON.stringify({ amountInUSD: total + shipping }),
      });

      if (!rzpRes.ok) {
        const err = await rzpRes.json().catch(() => ({}));
        throw new Error(err.message || "Failed to initiate Razorpay order.");
      }

      const rzpOrder = await rzpRes.json();

      // Configure Razorpay Standard Modal options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: rzpOrder.amount,
        currency: rzpOrder.currency,
        name: "LUXORA Maison",
        description: "Atelier Couture Purchase",
        order_id: rzpOrder.id,
        handler: async function (response: any) {
          const payload = {
            customer: {
              email,
              phone,
              firstName,
              lastName,
            },
            shippingAddress: {
              address,
              city,
              postalCode,
              country,
            },
            shippingMethod,
            items: items.map((it) => ({
              product: it.product.id,
              name: it.product.name,
              price: it.product.price,
              color: it.color,
              size: it.size,
              qty: it.qty,
              image: it.product.images[0] || "",
            })),
            financials: {
              subtotal: total,
              shipping,
              total: total + shipping,
            },
            paymentDetails: {
              method: "Razorpay",
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            },
          };
          orderMutation.mutate(payload);
        },
        prefill: {
          name: `${firstName} ${lastName}`,
          email,
          contact: phone,
        },
        theme: {
          color: "#d4af37",
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (err: any) {
      toast.error("Payment Initiation Failed", {
        description: err.message || "Something went wrong initiating checkout.",
      });
    }
  };

  return (
    <div className="container-luxe py-12 grid lg:grid-cols-[1fr_420px] gap-16">
      <div>
        <div className="flex gap-4 mb-12">
          {STEPS.map((s, i) => (
            <button
              key={s}
              onClick={() => setStep(i)}
              className={`flex-1 text-left pb-3 border-b-2 transition-colors ${i <= step ? "border-gold" : "border-border"}`}
            >
              <p className="eyebrow !text-[10px]">Step 0{i + 1}</p>
              <p className="mt-1 text-sm font-medium flex items-center gap-2">
                {s} {i < step && <Check className="h-3 w-3 text-gold" />}
              </p>
            </button>
          ))}
        </div>

        {step === 0 && (
          <Form onNext={() => setStep(1)} title="Contact information">
            <Field
              label="Email address"
              type="email"
              placeholder="you@maison.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Field
              label="Phone"
              placeholder="+1 (000) 000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form>
        )}

        {step === 1 && (
          <Form onNext={() => setStep(2)} title="Delivery">
            <div className="grid grid-cols-2 gap-4">
              <Field
                label="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Field
                label="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <Field
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <div className="grid grid-cols-3 gap-4">
              <Field
                label="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <Field
                label="Postal code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
              <Field
                label="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="space-y-2 mt-2">
              <ShipOption
                label="Standard — 5-7 days"
                price="Complimentary"
                checked={shippingMethod === "Standard"}
                onChange={() => setShippingMethod("Standard")}
              />
              <ShipOption
                label="Express — 2-3 days"
                price="$45"
                checked={shippingMethod === "Express"}
                onChange={() => setShippingMethod("Express")}
              />
              <ShipOption
                label="White-glove next-day delivery"
                price="$120"
                checked={shippingMethod === "White-glove"}
                onChange={() => setShippingMethod("White-glove")}
              />
            </div>
          </Form>
        )}

        {step === 2 && (
          <Form
            onNext={place}
            title="Payment Gateway"
            cta={orderMutation.isPending ? "Processing..." : "Pay with Razorpay"}
            disabled={orderMutation.isPending}
          >
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
              <Lock className="h-3 w-3 text-gold" /> Secured and verified by Razorpay
            </div>
            <div className="p-6 bg-muted/60 border border-gold/20 text-sm space-y-4">
              <p className="font-serif text-lg">LUXORA Secure Billing</p>
              <p className="text-muted-foreground leading-relaxed">
                Clicking the button below will initiate the secure Razorpay Standard Checkout overlay, allowing you to pay using card, UPI, net banking, or wallet.
              </p>
              <p className="text-xs text-gold">
                All transactions are encrypted and processed in real-time. Do not close the window during the authorization process.
              </p>
            </div>
          </Form>
        )}
      </div>

      <aside className="bg-muted p-8 self-start lg:sticky top-28">
        <h3 className="eyebrow mb-6">Your Order</h3>
        <div className="space-y-4 max-h-72 overflow-auto pr-2">
          {items.map((it) => (
            <div key={`${it.product.id}-${it.size}-${it.color}`} className="flex gap-3">
              <div className="w-16 h-20 bg-background flex-shrink-0">
                <img src={it.product.images[0]} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="flex-1 text-sm">
                <p className="font-serif">{it.product.name}</p>
                <p className="text-xs text-muted-foreground">{it.color} · {it.size} · ×{it.qty}</p>
              </div>
              <span className="text-sm">{formatPrice(it.product.price * it.qty)}</span>
            </div>
          ))}
        </div>
        <div className="gold-line my-6" />
        <div className="space-y-2 text-sm">
          <Row l="Subtotal" v={formatPrice(total)} />
          <Row l="Shipping" v={shipping === 0 ? "Complimentary" : formatPrice(shipping)} />
          <Row l="Total" v={formatPrice(total + shipping)} bold />
        </div>
      </aside>
    </div>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="block">
      <span className="eyebrow !text-[10px] mb-2 block">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-gold transition-colors"
      />
    </label>
  );
}

function Form({
  children,
  title,
  onNext,
  cta = "Continue",
  disabled = false,
}: {
  children: React.ReactNode;
  title: string;
  onNext: () => void;
  cta?: string;
  disabled?: boolean;
}) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="space-y-5">
      <h2 className="font-serif text-2xl mb-6">{title}</h2>
      {children}
      <button
        type="submit"
        disabled={disabled}
        className="mt-6 w-full bg-ink text-bone py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-gold hover:text-ink transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {cta}
      </button>
    </form>
  );
}

function ShipOption({
  label,
  price,
  checked,
  onChange,
}: {
  label: string;
  price: string;
  checked?: boolean;
  onChange?: () => void;
}) {
  return (
    <label className="flex items-center justify-between border border-border p-4 cursor-pointer hover:border-gold transition-colors">
      <span className="flex items-center gap-3 text-sm">
        <input
          type="radio"
          name="ship"
          checked={checked}
          onChange={onChange}
          className="accent-[var(--gold)]"
        />
        {label}
      </span>
      <span className="text-sm">{price}</span>
    </label>
  );
}

function Row({ l, v, bold }: { l: string; v: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "font-serif text-lg pt-2 border-t border-border" : "text-muted-foreground"}`}>
      <span>{l}</span><span>{v}</span>
    </div>
  );
}