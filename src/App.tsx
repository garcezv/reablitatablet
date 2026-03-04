import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RequestAccessPage from "./pages/RequestAccessPage";
import HomePage from "./pages/HomePage";
import PanelPage from "./pages/PanelPage";
import InstructionsPage from "./pages/InstructionsPage";
import NoiseCheckPage from "./pages/NoiseCheckPage";
import ManageParticipantsPage from "./pages/ManageParticipantsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/request-access" element={<RequestAccessPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/panel" element={<PanelPage />} />
          <Route path="/instructions" element={<InstructionsPage />} />
          <Route path="/noise-check" element={<NoiseCheckPage />} />
          <Route path="/manage-participants" element={<ManageParticipantsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
