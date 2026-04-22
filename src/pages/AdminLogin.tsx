import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { SouplyLogo } from "@/components/SouplyLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";
import { toast } from "sonner";

// NOTE: Client-side password gate. Anyone with code access can read this value.
// For real security, enable Lovable Cloud and use proper auth + a server check.
const ADMIN_PASSWORD = "souply-admin-2025";
const SESSION_KEY = "souply_admin_ok";

export const isAdminAuthed = () =>
  typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY) === "1";

export const clearAdminAuth = () => sessionStorage.removeItem(SESSION_KEY);

const AdminLogin = () => {
  const navigate = useNavigate();
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (pw === ADMIN_PASSWORD) {
        sessionStorage.setItem(SESSION_KEY, "1");
        toast.success("Welcome, admin");
        navigate("/dashboard", { replace: true });
      } else {
        toast.error("Incorrect password");
      }
      setLoading(false);
    }, 200);
  };

  return (
    <div className="min-h-screen bg-gradient-warm grid place-items-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <SouplyLogo />
        </div>
        <form
          onSubmit={submit}
          className="rounded-2xl bg-card border border-border p-6 shadow-soft animate-fade-up"
        >
          <div className="flex items-center gap-2 text-primary">
            <Lock className="h-4 w-4" />
            <h1 className="font-semibold">Admin sign in</h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Enter the admin password to view the insights dashboard.
          </p>
          <div className="mt-4 space-y-2">
            <Label htmlFor="pw">Password</Label>
            <Input
              id="pw"
              type="password"
              autoFocus
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <Button
            type="submit"
            variant="hero"
            size="lg"
            className="w-full mt-5"
            disabled={loading || !pw}
          >
            {loading ? "Checking…" : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
