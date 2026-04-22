import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  getDraft, setDraft, saveResponse, clearDraft,
  type RecommendIntent, type SurveyResponse,
} from "@/lib/storage";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const opts: { id: RecommendIntent; label: string }[] = [
  { id: "yes", label: "Yes" },
  { id: "maybe", label: "Maybe" },
  { id: "no", label: "No" },
];

const MAX = 1000;

const Suggestions = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [rec, setRec] = useState<RecommendIntent | null>(null);

  useEffect(() => {
    const d = getDraft();
    if (!d.purchase) { navigate("/"); return; }
    if (d.suggestions) setText(d.suggestions);
    if (d.recommend) setRec(d.recommend);
  }, [navigate]);

  const submit = () => {
    if (!rec) { toast.error("Please answer the recommendation question"); return; }
    const d = setDraft({ suggestions: text.trim().slice(0, MAX), recommend: rec });
    if (!d.flavour || !d.ratings || !d.lifestyle || !d.recommended || !d.packaging || !d.price || !d.purchase) {
      toast.error("Some answers are missing");
      return;
    }
    const r: SurveyResponse = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      flavour: d.flavour,
      ratings: d.ratings,
      lifestyle: d.lifestyle,
      recommended: d.recommended,
      packaging: d.packaging,
      price: d.price,
      purchase: d.purchase,
      suggestions: d.suggestions ?? "",
      recommend: d.recommend!,
    };
    saveResponse(r);
    clearDraft();
    navigate("/thank-you");
  };

  return (
    <PageShell step={5}>
      <div className="animate-fade-up">
        <p className="text-xs uppercase tracking-wider text-accent font-semibold">
          Improvement Suggestions
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold mt-1">
          What improvements would you like to see in Souply?
        </h1>

        <div className="mt-5">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, MAX))}
            placeholder="Share your honest thoughts — flavour, texture, packaging, anything…"
            className="min-h-[160px] rounded-2xl bg-card border-border focus-visible:ring-primary text-base"
          />
          <div className="text-right text-xs text-muted-foreground mt-1">
            {text.length}/{MAX}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="font-semibold mb-3">Would you recommend Souply to others?</h2>
          <div className="grid grid-cols-3 gap-2">
            {opts.map((o) => (
              <button
                key={o.id}
                onClick={() => setRec(o.id)}
                className={cn(
                  "py-3 rounded-xl font-medium border-2 transition-smooth",
                  rec === o.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:border-primary/40"
                )}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <Button variant="hero" size="xl" className="w-full mt-8" onClick={submit}>
          Submit feedback
        </Button>
      </div>
    </PageShell>
  );
};

export default Suggestions;
