import { Link } from "react-router-dom";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Heart, BookOpen, Home } from "lucide-react";

const ThankYou = () => (
  <PageShell>
    <div className="text-center animate-scale-in pt-6">
      <div className="mx-auto h-20 w-20 rounded-full bg-gradient-accent grid place-items-center shadow-warm">
        <Heart className="h-10 w-10 text-accent-foreground" fill="currentColor" />
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold mt-6">Thank you!</h1>
      <p className="text-foreground/80 mt-3 max-w-md mx-auto">
        Thank you for supporting Souply product development. Your feedback helps
        us craft a better, healthier soup for everyone.
      </p>

      <div className="mt-8 rounded-2xl bg-gradient-card border border-border p-6 shadow-soft text-left">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl bg-secondary text-primary grid place-items-center">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold">Make the perfect bowl</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Check our quick preparation guide for the best Souply experience.
            </p>
          </div>
        </div>
        <Button asChild variant="warm" size="lg" className="w-full mt-4">
          <Link to="/prepare">View preparation guide</Link>
        </Button>
      </div>

      <Button asChild variant="soft" size="lg" className="w-full mt-3">
        <Link to="/"><Home className="h-4 w-4" /> Back to home</Link>
      </Button>
    </div>
  </PageShell>
);

export default ThankYou;
