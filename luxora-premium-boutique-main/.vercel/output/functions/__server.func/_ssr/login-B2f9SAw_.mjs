import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useAuth, c as Route$b, l as luxeFetch } from "./router-DpDkR4l0.mjs";
import { a as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
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
import "../_libs/lucide-react.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function Login() {
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const loginSuccess = useAuth((s) => s.loginSuccess);
  const nav = useNavigate();
  const {
    redirect
  } = Route$b.useSearch();
  const loginMutation = useMutation({
    mutationFn: async () => {
      const res = await luxeFetch("https://luxora-premium-e-commerce-application.onrender.com/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password
        })
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Invalid credentials");
      }
      return res.json();
    },
    onSuccess: (data) => {
      loginSuccess(data.user, data.token);
      toast.success("Welcome back", {
        description: `Successfully signed in as ${data.user.name}.`
      });
      nav({
        to: redirect || "/account"
      });
    },
    onError: (error) => {
      toast.error("Sign In Failed", {
        description: error.message || "Something went wrong. Please check your credentials."
      });
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[80vh] grid lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:block bg-ink relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=80", alt: "", className: "h-full w-full object-cover opacity-70" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-ink/80" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-12 left-12 text-bone", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow !text-gold", children: "Welcome back" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-4xl mt-3 max-w-sm", children: "A private door to the maison." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center p-8 md:p-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      if (email && password) {
        loginMutation.mutate();
      }
    }, className: "w-full max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-4xl mt-3", children: "Sign in" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-3", children: "Access your wardrobe, orders and saved pieces." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 mt-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Email", type: "email", value: email, onChange: setEmail }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Password", type: "password", value: password, onChange: setPassword })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loginMutation.isPending, className: "mt-8 w-full bg-ink text-bone py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-gold hover:text-ink transition-colors disabled:opacity-50", children: loginMutation.isPending ? "Signing In..." : "Continue" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mt-6 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "link-underline", children: "Forgot password?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", search: {
          redirect
        }, className: "link-underline", children: "Create account" })
      ] })
    ] }) })
  ] });
}
function Input({
  label,
  type,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow !text-[10px] mb-2 block", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type, value, onChange: (e) => onChange(e.target.value), className: "w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-gold transition-colors", required: true })
  ] });
}
export {
  Login as component
};
