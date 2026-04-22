import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SouplyLogo } from "@/components/SouplyLogo";
import heroImg from "@/assets/hero-soup.jpg";
import mushroomImg from "@/assets/mushroom-souply.jpg";
import chickenImg from "@/assets/chicken-souply.jpg";
import { setDraft, type Flavour } from "@/lib/storage";
import { useNavigate } from "react-router-dom";
import { Leaf, Sparkles, MessageCircle } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();
  const pick = (f: Flavour) => {
    setDraft({ flavour: f });
    navigate("/rate");
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      <header className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <SouplyLogo />
        <Link to="/admin" className="text-xs text-muted-foreground hover:text-primary transition-smooth">
          Admin
        </Link>
      </header>

      <main className="max-w-2xl mx-auto px-4 pt-6 pb-16">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl shadow-elegant animate-scale-in">
          <img
            src={heroImg}
            alt="A warm bowl of natural Souply mushroom soup"
            width={1280}
            height={960}
            className="w-full h-64 sm:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background/90 backdrop-blur text-xs font-medium text-primary mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              Souply Connect
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-foreground leading-tight">
              Welcome to <br />Souply Connect
            </h1>
            <p className="text-primary-foreground/90 mt-2 text-sm sm:text-base">
              Help us improve your soup experience through your valuable feedback.
            </p>
          </div>
        </section>

        {/* Description */}
        <section className="mt-6 rounded-2xl bg-card border border-border p-5 shadow-soft animate-fade-up">
          <p className="text-foreground/80 leading-relaxed text-sm sm:text-base">
            <span className="font-semibold text-primary">Souply</span> is a
            natural soup powder designed for convenient and healthy consumption.
            Rate your experience and receive personalised flavour recommendations.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <Feature icon={<Leaf className="h-4 w-4" />} label="100% Natural" />
            <Feature icon={<Sparkles className="h-4 w-4" />} label="Smart Picks" />
            <Feature icon={<MessageCircle className="h-4 w-4" />} label="Quick Survey" />
          </div>
        </section>

        {/* Choice */}
        <section className="mt-8 animate-fade-up" style={{ animationDelay: "100ms" }}>
          <h2 className="text-lg font-semibold text-center mb-4">
            Which Souply did you try?
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <FlavourCard
              title="Mushroom Souply"
              tagline="Earthy & nourishing"
              img={mushroomImg}
              onClick={() => pick("mushroom")}
            />
            <FlavourCard
              title="Chicken Souply"
              tagline="Hearty & comforting"
              img={chickenImg}
              onClick={() => pick("chicken")}
            />
          </div>
        </section>

        <div className="text-center mt-8">
          <Link to="/prepare" className="text-sm text-primary underline-offset-4 hover:underline font-medium">
            How to prepare Souply →
          </Link>
        </div>
      </main>
    </div>
  );
};

const Feature = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
    <div className="h-8 w-8 rounded-full bg-secondary text-primary grid place-items-center">
      {icon}
    </div>
    {label}
  </div>
);

const FlavourCard = ({
  title,
  tagline,
  img,
  onClick,
}: {
  title: string;
  tagline: string;
  img: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="group text-left rounded-2xl overflow-hidden bg-card border border-border shadow-soft hover:shadow-warm hover:-translate-y-1 transition-smooth"
  >
    <div className="aspect-[4/3] overflow-hidden">
      <img
        src={img}
        alt={title}
        loading="lazy"
        width={800}
        height={600}
        className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
      />
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-foreground">{title}</h3>
      <p className="text-xs text-muted-foreground mt-0.5">{tagline}</p>
      <div className="mt-3">
        <Button variant="hero" size="sm" asChild>
          <span>I tried this →</span>
        </Button>
      </div>
    </div>
  </button>
);

export default Welcome;
