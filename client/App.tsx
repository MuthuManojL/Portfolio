import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import MainLayout from "./components/layout/MainLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { BitsCursorLayer } from "@/bits/BitsCursorLayer";
import { AnimatePresence } from "framer-motion";
import WelcomeMessage from "./components/WelcomeMessage";

// Lazy-load pages for code-splitting
const Projects = lazy(() => import("./pages/Projects"));
const Resume = lazy(() => import("./pages/Resume"));
const About = lazy(() => import("./pages/About"));
const TechScreen = lazy(() => import("./pages/TechScreen"));
const Contact = lazy(() => import("./pages/Contact"));
const Internship = lazy(() => import("./pages/Internship"));

const queryClient = new QueryClient();

const PageWithLayout = ({ children }: { children: React.ReactNode }) => (
  <MainLayout>{children}</MainLayout>
);

const AppContent = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <WelcomeMessage />
      <BitsCursorLayer />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route
              path="/"
              element={
                <PageWithLayout>
                  <Index />
                </PageWithLayout>
              }
            />
            <Route
              path="/about"
              element={
                <PageWithLayout>
                  <Suspense fallback={<div className="p-8">Loading...</div>}>
                    <About />
                  </Suspense>
                </PageWithLayout>
              }
            />
            <Route
              path="/projects"
              element={
                <PageWithLayout>
                  <Suspense fallback={<div className="p-8">Loading...</div>}>
                    <Projects />
                  </Suspense>
                </PageWithLayout>
              }
            />
            {/* Portfolio route removed to avoid duplication with Projects */}
            <Route
              path="/techscreen"
              element={
                <PageWithLayout>
                  <Suspense fallback={<div className="p-8">Loading...</div>}>
                    <TechScreen />
                  </Suspense>
                </PageWithLayout>
              }
            />
            <Route
              path="/contact"
              element={
                <PageWithLayout>
                  <Suspense fallback={<div className="p-8">Loading...</div>}>
                    <Contact />
                  </Suspense>
                </PageWithLayout>
              }
            />
            <Route
              path="/internship"
              element={
                <PageWithLayout>
                  <Suspense fallback={<div className="p-8">Loading...</div>}>
                    <Internship />
                  </Suspense>
                </PageWithLayout>
              }
            />
            <Route
              path="/resume"
              element={
                <PageWithLayout>
                  <Suspense fallback={<div className="p-8">Loading resume...</div>}>
                    <Resume />
                  </Suspense>
                </PageWithLayout>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route
              path="*"
              element={
                <PageWithLayout>
                  <NotFound />
                </PageWithLayout>
              }
            />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
