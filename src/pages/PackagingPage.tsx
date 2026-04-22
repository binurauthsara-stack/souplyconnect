import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import {
  getDraft, setDraft,
  type PackagingPref, type PriceRange, type PurchaseIntent,
} from "@/lib/storage";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const packs: { id: PackagingPref; label: string; desc: string }[] = [
  { id: "sachet", label: "Single-use sachet", desc: "Compact & travel-friendly" },
  { id: "pouch", label: "Resealable pouch", desc: "Family-size & reusable" },
  { id: "cup", label: "Cup-style packaging", desc: "Just add water — instant" },
];

const prices: { id: PriceRange; label: string }[] = [
  { id: "80-100", label: "Rs 80 – 100" },
  { id: "100-150", label: "Rs 100 – 150" },
  { id: "150-200", label: "Rs 150 – 200" },
];

const purchases: { id: PurchaseIntent; label: string }[] = [
  { id: "definitely_yes", label: "Definitely yes" },
  { id: "probably_yes", label: "Probably yes" },
  { id: "not_sure", label: "Not sure" },
  { id: "probably_no", label: "Probably no" },
  { id: "definitely_no", label: "Definitely no" },
];

const PackagingPage = () => {
  const navigate = useNavigate();
  const [pack, setPack] = useState<PackagingPref | null>(null);
  const [price, setPrice] = useState<PriceRange | null>(null);
  const [purchase, setPurchase] = useState<PurchaseIntent | null>(null);

  useEffect(() => {
    const d = getDraft();
    if (!d.recommended) { navigate("/"); return; }
    if (d.packaging) setPack(d.packaging);
    if (d.price) setPrice(d.price);
    if (d.purchase) setPurchase(d.purchase);
  }, [navigate]);

  const submit = () => {
    if (!pack || !price || !purchase) {
      toast.error("Please complete all questions");
      return;
    }
    setDraft({ packaging: pack, price, purchase });
    navigate("/suggestions");
  };

  return (
    <PageShell step={4}>
      <div className="animate-fade-up">
        <p className="text-xs uppercase tracking-wider text-accent font-semibold">
          Packaging & Price
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold mt-1">
          Help us shape the next Souply
        </h1>

        <Section title="Preferred packaging type">
          <div className="grid gap-3">
            {packs.map((p) => (
              <Choice
                key={p.id}
                active={pack === p.id}
                onClick={() => setPack(p.id)}
                title={p.label}
                subtitle={p.desc}
              />
            ))}
          </div>
        </Section>

        <Section title="Expected price range per serving">
          <div className="grid grid-cols-3 gap-2">
            {prices.map((p) => (
              <Pill key={p.id} active={price === p.id} onClick={() => setPrice(p.id)}>
                {p.label}
              </Pill>
            ))}
          </div>
        </Section>

        <Section title="Would you purchase Souply again?">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {purchases.map((p) => (
              <Pill key={p.id} active={purchase === p.id} onClick={() => setPurchase(p.id)}>
                {p.label}
              </Pill>
            ))}
          </div>
        </Section>

        <Button variant="hero" size="xl" className="w-full mt-8" onClick={submit}>
          Continue →
        </Button>
      </div>
    </PageShell>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mt-7">
    <h2 className="font-semibold text-foreground mb-3">{title}</h2>
    {children}
  </div>
);

const Choice = ({
  active, onClick, title, subtitle,
}: { active: boolean; onClick: () => void; title: string; subtitle: string }) => (
  <button
    onClick={onClick}
    className={cn(
      "text-left p-4 rounded-2xl border-2 transition-smooth",
      active ? "border-primary bg-primary/5 shadow-soft" : "border-border bg-card hover:border-primary/40"
    )}
  >
    <div className="font-medium">{title}</div>
    <div className="text-xs text-muted-foreground mt-0.5">{subtitle}</div>
  </button>
);

const Pill = ({
  active, onClick, children,
}: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className={cn(
      "px-3 py-2.5 rounded-xl text-sm font-medium border-2 transition-smooth",
      active
        ? "border-primary bg-primary text-primary-foreground"
        : "border-border bg-card hover:border-primary/40"
    )}
  >
    {children}
  </button>
);

export default PackagingPage;
