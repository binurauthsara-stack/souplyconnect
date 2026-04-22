import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { getDraft, setDraft, recommendFlavour, type Lifestyle } from "@/lib/storage";
import { GraduationCap, Moon, Leaf, Dumbbell, Briefcase, Check } from "lucide-react";
import { toast } from "sonner";

const options: { id: Lifestyle; label: string; icon: React.ReactNode }[] = [
  { id: "quick_meal", label: "Quick meal after lectures", icon: <GraduationCap className="h-5 w-5" /> },
  { id: "evening_snack", label: "Evening snack", icon: <Moon className="h-5 w-5" /> },
  { id: "healthy_diet", label: "Healthy diet support", icon: <Leaf className="h-5 w-5" /> },
  { id: "post_workout", label: "Post-workout recovery", icon: <Dumbbell className="h-5 w-5" /> },
  { id: "busy_workday", label: "Busy workday meal", icon: <Briefcase className="h-5 w-5" /> },
];

const LifestylePage = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Lifestyle | null>(null);

  useEffect(() => {
    const d = getDraft();
    if (!d.ratings) { navigate("/"); return; }
    if (d.lifestyle) setSelected(d.lifestyle);
  }, [navigate]);

  const submit = () => {
    if (!selected) { toast.error("Please choose an option"); return; }
    setDraft({ lifestyle: selected, recommended: recommendFlavour(selected) });
    navigate("/recommendation");
  };

  return (
    <PageShell step={2}>
      <div className="animate-fade-up">
        <p className="text-xs uppercase tracking-wider text-accent font-semibold">
          Smart Recommendation
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold mt-1">
          When do you usually consume soup?
        </h1>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base">
          Pick the moment that fits you best — we'll match a Souply for it.
        </p>

        <div className="mt-6 grid gap-3">
          {options.map((o) => {
            const active = selected === o.id;
            return (
              <button
                key={o.id}
                onClick={() => setSelected(o.id)}
                className={`text-left flex items-center gap-4 p-4 rounded-2xl border-2 transition-smooth ${
                  active
                    ? "border-primary bg-primary/5 shadow-soft"
                    : "border-border bg-card hover:border-primary/40"
                }`}
              >
                <div className={`h-11 w-11 rounded-xl grid place-items-center transition-smooth ${
                  active ? "bg-gradient-hero text-primary-foreground" : "bg-secondary text-primary"
                }`}>
                  {o.icon}
                </div>
                <span className="flex-1 font-medium">{o.label}</span>
                {active && (
                  <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground grid place-items-center animate-scale-in">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <Button variant="hero" size="xl" className="w-full mt-6" onClick={submit}>
          See my recommendation →
        </Button>
      </div>
    </PageShell>
  );
};

export default LifestylePage;
