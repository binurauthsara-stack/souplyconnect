import { PageShell } from "@/components/PageShell";
import { Play } from "lucide-react";

const steps = [
  { n: 1, title: "Add Souply powder into a cup", desc: "Use 2 heaping tablespoons (or one sachet)." },
  { n: 2, title: "Add 150ml hot water", desc: "Just-boiled water gives the richest flavour." },
  { n: 3, title: "Stir well for 10 seconds", desc: "Until smooth and silky — no lumps." },
  { n: 4, title: "Enjoy your healthy soup", desc: "Add herbs or pepper to taste. Sip warm." },
];

const Prepare = () => (
  <PageShell>
    <div className="animate-fade-up">
      <p className="text-xs uppercase tracking-wider text-accent font-semibold">
        Preparation Guide
      </p>
      <h1 className="text-3xl sm:text-4xl font-bold mt-1">How to Prepare Souply</h1>
      <p className="text-muted-foreground mt-2">
        Four simple steps to a warm, nourishing bowl in under a minute.
      </p>

      <ol className="mt-8 space-y-4">
        {steps.map((s) => (
          <li
            key={s.n}
            className="flex gap-4 p-5 rounded-2xl bg-card border border-border shadow-soft"
          >
            <div className="h-12 w-12 shrink-0 rounded-2xl bg-gradient-hero text-primary-foreground grid place-items-center font-bold text-lg shadow-soft">
              {s.n}
            </div>
            <div>
              <h3 className="font-semibold">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-3xl border-2 border-dashed border-border p-6 text-center bg-card/50">
        <div className="mx-auto h-14 w-14 rounded-full bg-accent text-accent-foreground grid place-items-center shadow-warm">
          <Play className="h-6 w-6" fill="currentColor" />
        </div>
        <h3 className="font-semibold mt-3">Preparation video coming soon</h3>
        <p className="text-sm text-muted-foreground mt-1">
          A short visual walkthrough will be added here.
        </p>
      </div>
    </div>
  </PageShell>
);

export default Prepare;
