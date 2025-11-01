import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ApplicationModal } from "@/components/ApplicationModal";
import Index from "./pages/Index";
import Category from "./pages/Category";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";
import SmeethGenerator from "./pages/SmeethGenerator";
import PowerCalculator from "./pages/PowerCalculator";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenModal = () => setIsModalOpen(true);
    window.addEventListener('openApplicationModal', handleOpenModal);
    return () => window.removeEventListener('openApplicationModal', handleOpenModal);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ApplicationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/smeeth-generator" element={<SmeethGenerator />} />
            <Route path="/power-calculator" element={<PowerCalculator />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
