import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — LUXORA" }] }),
  component: Contact,
});

function Contact() {
  return (
    <div>
      <section className="bg-ink text-bone py-24 text-center">
        <p className="eyebrow !text-gold">Concierge</p>
        <h1 className="font-display text-5xl md:text-7xl mt-4">At your service.</h1>
        <p className="mt-6 text-bone/60 max-w-xl mx-auto">A private team of advisors is available, in seven languages, every day of the year.</p>
      </section>

      <div className="container-luxe py-20 grid lg:grid-cols-2 gap-16">
        <div>
          <h2 className="font-serif text-3xl">Reach the maison</h2>
          <div className="space-y-8 mt-10">
            <Item icon={Phone} title="Client Advisor" lines={["+1 (800) LUXORA · 24/7"]} />
            <Item icon={Mail} title="Email" lines={["concierge@luxora.com"]} />
            <Item icon={MapPin} title="Flagship Boutique" lines={["12 Rue Saint-Honoré", "75008 Paris, France"]} />
            <Item icon={Clock} title="Atelier Hours" lines={["Mon–Sat · 10:00 – 19:00", "Private appointments by reservation"]} />
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); toast.success("Message sent", { description: "Your advisor will reply within 24 hours." }); }}
          className="bg-muted p-10"
        >
          <h3 className="font-serif text-2xl">Write to us</h3>
          <div className="space-y-5 mt-8">
            <div className="grid grid-cols-2 gap-4">
              <Input label="First name" />
              <Input label="Last name" />
            </div>
            <Input label="Email" type="email" />
            <Input label="Subject" />
            <label className="block">
              <span className="eyebrow !text-[10px] mb-2 block">Message</span>
              <textarea rows={5} className="w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-gold resize-none" />
            </label>
            <button className="w-full bg-ink text-bone py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-gold hover:text-ink transition-colors">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Item({ icon: Icon, title, lines }: { icon: React.ComponentType<{ className?: string }>; title: string; lines: string[] }) {
  return (
    <div className="flex gap-5">
      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
        <Icon className="h-4 w-4 text-gold" />
      </div>
      <div>
        <p className="eyebrow !text-[10px]">{title}</p>
        {lines.map((l) => <p key={l} className="font-serif text-lg">{l}</p>)}
      </div>
    </div>
  );
}

function Input({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className="block">
      <span className="eyebrow !text-[10px] mb-2 block">{label}</span>
      <input type={type} className="w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-gold transition-colors" />
    </label>
  );
}