
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StudyGroupProvider } from "./context/StudyGroupContext";
import Index from "./pages/Index";
import CreateStudyGroup from "./pages/CreateStudyGroup";
import StudyGroupDetail from "./pages/StudyGroupDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <StudyGroupProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/create" element={<CreateStudyGroup />} />
            <Route path="/study/:id" element={<StudyGroupDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </StudyGroupProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
