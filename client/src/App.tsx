import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import WhatIsAiVisibility from "./pages/WhatIsAiVisibility";
import RealtorsPage from "./pages/RealtorsPage";
import WineriesPage from "./pages/WineriesPage";
import TrainingWorkshops from "./pages/TrainingWorkshops";
import ResultsCaseStudies from "./pages/ResultsCaseStudies";
import FaqPage from "./pages/FaqPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import AdminPage from "./pages/AdminPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/what-is-ai-visibility" component={WhatIsAiVisibility} />
      <Route path="/ai-visibility-for-realtors" component={RealtorsPage} />
      <Route path="/ai-visibility-for-wineries" component={WineriesPage} />
      <Route path="/training-workshops" component={TrainingWorkshops} />
      <Route path="/results-case-studies" component={ResultsCaseStudies} />
      <Route path="/faq" component={FaqPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms" component={TermsOfUse} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
