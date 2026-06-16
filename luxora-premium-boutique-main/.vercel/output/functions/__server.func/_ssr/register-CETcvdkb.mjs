import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useAuth, b as Route$c, l as luxeFetch } from "./router-DpDkR4l0.mjs";
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
function Register() {
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    password: ""
  });
  const loginSuccess = useAuth((s) => s.loginSuccess);
  const nav = useNavigate();
  const {
    redirect
  } = Route$c.useSearch();
  const registerMutation = useMutation({
    mutationFn: async () => {
      const res = await luxeFetch("https://luxora-premium-e-commerce-application.onrender.com/api/auth/register", {
        method: "POST",
        body: JSON.stringify(form)
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Registration failed");
      }
      return res.json();
    },
    onSuccess: (data) => {
      loginSuccess(data.user, data.token);
      toast.success("Welcome to Luxora Maison", {
        description: `Account created successfully for ${data.user.name}.`
      });
      nav({
        to: redirect || "/account"
      });
    },
    onError: (error) => {
      toast.error("Registration Failed", {
        description: error.message || "Something went wrong. Please try again."
      });
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-luxe py-16 max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Join the maison" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-4xl mt-3", children: "Create your account" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-3", children: "Le Cercle Privé — early access to collections, private events, complimentary alterations." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      if (form.name && form.email && form.password) {
        registerMutation.mutate();
      }
    }, className: "mt-10 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Full name", value: form.name, onChange: (v) => setForm({
        ...form,
        name: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", type: "email", value: form.email, onChange: (v) => setForm({
        ...form,
        email: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Password", type: "password", value: form.password, onChange: (v) => setForm({
        ...form,
        password: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: registerMutation.isPending, className: "mt-4 w-full bg-ink text-bone py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-gold hover:text-ink transition-colors disabled:opacity-50", children: registerMutation.isPending ? "Creating Account..." : "Create Account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center", children: [
        "Already a client? ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", search: {
          redirect
        }, className: "link-underline text-foreground", children: "Sign in" })
      ] })
    ] })
  ] });
}
function Field({
  label,
  type = "text",
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow !text-[10px] mb-2 block", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type, value, onChange: (e) => onChange(e.target.value), className: "w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-gold transition-colors", required: true })
  ] });
}
export {
  Register as component
};
