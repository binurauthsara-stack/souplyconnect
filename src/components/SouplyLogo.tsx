import { Link } from "react-router-dom";

export const SouplyLogo = ({ className = "" }: { className?: string }) => (
  <Link to="/" className={`inline-flex items-center gap-2 group ${className}`}>
    <div className="relative h-9 w-9 rounded-full bg-gradient-hero grid place-items-center shadow-soft">
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11h18l-2 7a3 3 0 0 1-3 2H8a3 3 0 0 1-3-2l-2-7Z" />
        <path d="M8 8c0-2 1-3 2-3M12 7c0-2 1-3 2-3M16 8c0-2 1-3 2-3" />
      </svg>
    </div>
    <span className="font-semibold tracking-tight text-lg">
      Souply<span className="text-accent">.</span>
    </span>
  </Link>
);
