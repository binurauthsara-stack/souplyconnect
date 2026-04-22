import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { getDraft, type Flavour } from "@/lib/storage";
import mushroomImg from "@/assets/mushroom-souply.jpg";
import chickenImg from "@/assets/chicken-souply.jpg";
import { Sparkles } from "lucide-react";

const messages: Record<Flavour, { title: string; body: string; img: string; tagline: string }> = {
  mushroom: {
    title: "Mushroom Souply",
    tagline: "Earthy · Light · Nourishing",
    img: mushroomImg,
    body: "We recommend Mushroom Souply as a healthy natural option for your lifestyle.",
  },
  chicken: {
    title: "Chicken Souply",
    tagline: "Hearty · Protein-rich · Comforting",
    img: chickenImg,
    body: "We recommend Chicken Souply — a comforting, energising bowl that fits your day.",
  },
};

const Recommendation = () => {
  const navigate = useNavigate();
  const [rec, setRec] = useState<Flavour | null>(null);

  useEffect(() => {
    const d = getDraft();
    if (!d.recommended) { navigate("/"); return; }
    setRec(d.recommended);
  }, [navigate]);

  if (!rec) return null;
  const m = messages[rec];

  return (
    <PageShell step={3}>
      <div className="animate-fade-up text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-soft text-accent text-xs font-semibold">
          <Sparkles className="h-3.5 w-3.5" />
          Your match
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold mt-3">
          A perfect Souply for you
        </h1>
      </div>

      <div className="mt-6 rounded-3xl overflow-hidden bg-gradient-card border border-border shadow-elegant animate-scale-in">
        <div className="aspect-[16/10] overflow-hidden">
          <img src={m.img} alt={m.title} loading="lazy" width={800} height={500} className="w-full h-full object-cover" />
        </div>
        <div className="p-6 text-center">
          <p className="text-xs uppercase tracking-wider text-accent font-semibold">
            {m.tagline}
          </p>
          <h2 className="text-2xl font-bold mt-1 text-primary">{m.title}</h2>
          <p className="mt-3 text-foreground/80 leading-relaxed">{m.body}</p>
        </div>
      </div>

      <Button variant="hero" size="xl" className="w-full mt-6" onClick={() => navigate("/packaging")}>
        Continue →
      </Button>
    </PageShell>
  );
};

export default Recommendation;
