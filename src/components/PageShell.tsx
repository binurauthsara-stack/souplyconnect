import { ReactNode } from "react";
import { SouplyLogo } from "./SouplyLogo";
import { Link } from "react-router-dom";
import { LayoutDashboard, BookOpen } from "lucide-react";

interface Props {
  children: ReactNode;
  step?: number;
  totalSteps?: number;
}

export const PageShell = ({ children, step, totalSteps = 6 }: Props) => (
  <div className="min-h-screen bg-gradient-warm">
    <header className="sticky top-0 z-30 backdrop-blur-md bg-background/70 border-b border-border/60">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <SouplyLogo />
        <nav className="flex items-center gap-1">
          <Link
            to="/prepare"
            className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-secondary transition-smooth"
            aria-label="Preparation guide"
          >
            <BookOpen className="h-5 w-5" />
          </Link>
          <Link
            to="/dashboard"
            className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-secondary transition-smooth"
            aria-label="Dashboard"
          >
            <LayoutDashboard className="h-5 w-5" />
          </Link>
        </nav>
      </div>
      {step != null && (
        <div className="max-w-2xl mx-auto px-4 pb-3">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-smooth ${
                  i < step ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Step {step} of {totalSteps}
          </p>
        </div>
      )}
    </header>
    <main className="max-w-2xl mx-auto px-4 py-6 sm:py-10 pb-20">{children}</main>
  </div>
);
