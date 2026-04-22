import { PageShell } from "@/components/PageShell";

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

      <div className="mt-8 rounded-3xl overflow-hidden border border-border shadow-soft bg-card">
        <video
          src="/preparation-video.mp4"
          controls
          playsInline
          preload="metadata"
          className="w-full h-auto block"
        >
          Your browser does not support the video tag.
        </video>
        <div className="p-4 text-center">
          <h3 className="font-semibold">Watch the preparation video</h3>
          <p className="text-sm text-muted-foreground mt-1">
            A short visual walkthrough of how to prepare your Souply.
          </p>
        </div>
      </div>
    </div>
  </PageShell>
);

export default Prepare;
