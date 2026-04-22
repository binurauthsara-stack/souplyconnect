import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SouplyLogo } from "@/components/SouplyLogo";
import { Button } from "@/components/ui/button";
import { getResponses, type SurveyResponse } from "@/lib/storage";
import { clearAdminAuth } from "@/pages/AdminLogin";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { ArrowLeft, Star, Users, TrendingUp, ThumbsUp, LogOut, Loader2 } from "lucide-react";

const COLORS = ["hsl(110 32% 32%)", "hsl(24 88% 58%)", "hsl(38 92% 55%)", "hsl(110 38% 55%)", "hsl(18 92% 52%)"];

const labels = {
  packaging: { sachet: "Sachet", pouch: "Pouch", cup: "Cup" } as Record<string, string>,
  price: { "80-100": "Rs 80–100", "100-150": "Rs 100–150", "150-200": "Rs 150–200" } as Record<string, string>,
  purchase: {
    definitely_yes: "Definitely", probably_yes: "Probably", not_sure: "Not sure",
    probably_no: "Probably no", definitely_no: "Definitely no",
  } as Record<string, string>,
  recommended: { mushroom: "Mushroom", chicken: "Chicken" } as Record<string, string>,
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const n = responses.length;

  useEffect(() => {
    getResponses()
      .then(setResponses)
      .finally(() => setLoading(false));
  }, []);

  const logout = () => {
    clearAdminAuth();
    navigate("/", { replace: true });
  };

  const data = useMemo(() => {
    const avg = (k: keyof typeof responses[0]["ratings"]) =>
      n ? responses.reduce((s, r) => s + r.ratings[k], 0) / n : 0;

    const ratings = [
      { name: "Taste", value: +avg("taste").toFixed(2) },
      { name: "Aroma", value: +avg("aroma").toFixed(2) },
      { name: "Texture", value: +avg("texture").toFixed(2) },
      { name: "Thickness", value: +avg("thickness").toFixed(2) },
      { name: "Packaging", value: +avg("packaging").toFixed(2) },
      { name: "Overall", value: +avg("overall").toFixed(2) },
    ];

    const dist = <T extends string>(key: keyof typeof responses[0], map: Record<string, string>) => {
      const m = new Map<string, number>();
      responses.forEach((r) => {
        const v = r[key] as unknown as T;
        m.set(v, (m.get(v) || 0) + 1);
      });
      return Array.from(m.entries()).map(([k, v]) => ({ name: map[k] || k, value: v }));
    };

    return {
      ratings,
      packaging: dist("packaging", labels.packaging),
      price: dist("price", labels.price),
      purchase: dist("purchase", labels.purchase),
      recommended: dist("recommended", labels.recommended),
    };
  }, [responses, n]);

  const wouldRecommend = n
    ? Math.round((responses.filter((r) => r.recommend === "yes").length / n) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-warm">
      <header className="sticky top-0 z-30 backdrop-blur-md bg-background/70 border-b border-border/60">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <SouplyLogo />
          <div className="flex items-center gap-1">
            <Button asChild variant="ghost" size="sm">
              <Link to="/"><ArrowLeft className="h-4 w-4" /> Back to app</Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="animate-fade-up">
          <p className="text-xs uppercase tracking-wider text-accent font-semibold">Admin</p>
          <h1 className="text-3xl sm:text-4xl font-bold mt-1">Souply Insights Dashboard</h1>
          <p className="text-muted-foreground mt-2">Live summary of customer feedback collected via QR code.</p>
        </div>

        {n === 0 ? (
          <div className="mt-10 p-10 rounded-3xl bg-card border border-dashed border-border text-center">
            <h2 className="font-semibold text-lg">No responses yet</h2>
            <p className="text-muted-foreground mt-2">
              Submit a survey from the home page to see analytics here.
            </p>
            <Button asChild variant="hero" className="mt-4">
              <Link to="/">Take the survey →</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              <Stat icon={<Users className="h-4 w-4" />} label="Responses" value={n.toString()} />
              <Stat
                icon={<Star className="h-4 w-4" />}
                label="Avg overall"
                value={(responses.reduce((s, r) => s + r.ratings.overall, 0) / n).toFixed(2) + " / 5"}
              />
              <Stat
                icon={<ThumbsUp className="h-4 w-4" />}
                label="Would recommend"
                value={wouldRecommend + "%"}
              />
              <Stat
                icon={<TrendingUp className="h-4 w-4" />}
                label="Top pick"
                value={
                  data.recommended.sort((a, b) => b.value - a.value)[0]?.name ?? "—"
                }
              />
            </div>

            <Card title="Average ratings (out of 5)">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={data.ratings}>
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis domain={[0, 5]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <Card title="Packaging preference">
                <DonutChart data={data.packaging} />
              </Card>
              <Card title="Price expectation">
                <DonutChart data={data.price} />
              </Card>
              <Card title="Purchase intention">
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={data.purchase} layout="vertical" margin={{ left: 10 }}>
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} width={90} />
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                    <Bar dataKey="value" fill="hsl(var(--accent))" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
              <Card title="Recommendation trends">
                <DonutChart data={data.recommended} />
              </Card>
            </div>

            <Card title="Recent suggestions">
              <ul className="divide-y divide-border">
                {responses.slice(-6).reverse().filter(r => r.suggestions).map((r) => (
                  <li key={r.id} className="py-3">
                    <p className="text-sm text-foreground">"{r.suggestions}"</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {labels.recommended[r.flavour]} · {new Date(r.createdAt).toLocaleString()}
                    </p>
                  </li>
                ))}
                {responses.every(r => !r.suggestions) && (
                  <li className="py-6 text-center text-sm text-muted-foreground">No suggestions submitted yet.</li>
                )}
              </ul>
            </Card>
          </>
        )}
      </main>
    </div>
  );
};

const Stat = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="rounded-2xl bg-card border border-border p-4 shadow-soft">
    <div className="flex items-center gap-2 text-muted-foreground text-xs">
      {icon} {label}
    </div>
    <div className="text-2xl font-bold mt-1">{value}</div>
  </div>
);

const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mt-4 rounded-2xl bg-card border border-border p-5 shadow-soft animate-fade-up">
    <h2 className="font-semibold mb-3">{title}</h2>
    {children}
  </section>
);

const DonutChart = ({ data }: { data: { name: string; value: number }[] }) => (
  <ResponsiveContainer width="100%" height={240}>
    <PieChart>
      <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85} paddingAngle={2}>
        {data.map((_, i) => (
          <Cell key={i} fill={COLORS[i % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
      <Legend wrapperStyle={{ fontSize: 12 }} />
    </PieChart>
  </ResponsiveContainer>
);

export default Dashboard;
