import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageShell } from "@/components/PageShell";
import { StarRating } from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import { getDraft, setDraft, type Ratings } from "@/lib/storage";
import { toast } from "sonner";

const empty: Ratings = {
  taste: 0, aroma: 0, texture: 0, thickness: 0, packaging: 0, overall: 0,
};

const Rate = () => {
  const navigate = useNavigate();
  const [r, setR] = useState<Ratings>(empty);
  const [flavour, setFlavour] = useState<string>("");

  useEffect(() => {
    const d = getDraft();
    if (!d.flavour) { navigate("/"); return; }
    setFlavour(d.flavour);
    if (d.ratings) setR(d.ratings);
  }, [navigate]);

  const set = (k: keyof Ratings) => (v: number) => setR((p) => ({ ...p, [k]: v }));

  const submit = () => {
    if (Object.values(r).some((v) => v === 0)) {
      toast.error("Please rate every category to continue");
      return;
    }
    setDraft({ ratings: r });
    navigate("/lifestyle");
  };

  const flavourLabel = flavour === "mushroom" ? "Mushroom" : "Chicken";

  return (
    <PageShell step={1}>
      <div className="animate-fade-up">
        <p className="text-xs uppercase tracking-wider text-accent font-semibold">
          {flavourLabel} Souply
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold mt-1">Rate your experience</h1>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base">
          Tap the stars to rate each category — your feedback shapes our next batch.
        </p>

        <div className="mt-6 rounded-2xl bg-card border border-border shadow-soft p-5 sm:p-6">
          <StarRating label="Taste" value={r.taste} onChange={set("taste")} />
          <StarRating label="Aroma" value={r.aroma} onChange={set("aroma")} />
          <StarRating label="Texture" value={r.texture} onChange={set("texture")} />
          <StarRating label="Thickness consistency" value={r.thickness} onChange={set("thickness")} />
          <StarRating label="Packaging convenience" value={r.packaging} onChange={set("packaging")} />
          <StarRating label="Overall satisfaction" value={r.overall} onChange={set("overall")} />
        </div>

        <Button variant="hero" size="xl" className="w-full mt-6" onClick={submit}>
          Continue →
        </Button>
      </div>
    </PageShell>
  );
};

export default Rate;
