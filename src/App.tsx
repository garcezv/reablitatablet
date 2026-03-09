import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
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
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/request-access" element={<RequestAccessPage />} />
            <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="/panel" element={<ProtectedRoute><PanelPage /></ProtectedRoute>} />
            <Route path="/instructions" element={<ProtectedRoute><InstructionsPage /></ProtectedRoute>} />
            <Route path="/noise-check" element={<ProtectedRoute><NoiseCheckPage /></ProtectedRoute>} />
            <Route path="/manage-participants" element={<ProtectedRoute><ManageParticipantsPage /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
