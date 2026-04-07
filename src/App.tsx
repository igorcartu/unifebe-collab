import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import PainelLayout from "./components/PainelLayout";
import Dashboard from "./pages/painel/Dashboard";
import Colaboradores from "./pages/painel/Colaboradores";
import Presenca from "./pages/painel/Presenca";
import Relatorios from "./pages/painel/Relatorios";
import Certificados from "./pages/painel/Certificados";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/painel" element={<PainelLayout><Dashboard /></PainelLayout>} />
          <Route path="/painel/colaboradores" element={<PainelLayout><Colaboradores /></PainelLayout>} />
          <Route path="/painel/presenca" element={<PainelLayout><Presenca /></PainelLayout>} />
          <Route path="/painel/relatorios" element={<PainelLayout><Relatorios /></PainelLayout>} />
          <Route path="/painel/certificados" element={<PainelLayout><Certificados /></PainelLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
