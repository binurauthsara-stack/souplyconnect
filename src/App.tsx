import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Welcome from "./pages/Welcome";
import Rate from "./pages/Rate";
import LifestylePage from "./pages/LifestylePage";
import Recommendation from "./pages/Recommendation";
import PackagingPage from "./pages/PackagingPage";
import Suggestions from "./pages/Suggestions";
import ThankYou from "./pages/ThankYou";
import Prepare from "./pages/Prepare";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/rate" element={<Rate />} />
          <Route path="/lifestyle" element={<LifestylePage />} />
          <Route path="/recommendation" element={<Recommendation />} />
          <Route path="/packaging" element={<PackagingPage />} />
          <Route path="/suggestions" element={<Suggestions />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/prepare" element={<Prepare />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
