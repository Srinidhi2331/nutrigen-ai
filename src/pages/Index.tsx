import { useState } from "react";
import heroIllustration from "@/assets/hero-illustration.png";
import { toast } from "sonner";
import Header from "@/components/Header";
import RecipeInput from "@/components/RecipeInput";
import MacroCards from "@/components/MacroCards";
import MacroCharts from "@/components/MacroCharts";
import FSSAILabel from "@/components/FSSAILabel";
import HealthScore from "@/components/HealthScore";
import IngredientTable from "@/components/IngredientTable";
import { Leaf, Zap, FileText, ArrowDownUp, Sparkles, ChefHat } from "lucide-react";
import { parseRecipe, NutritionResult } from "@/lib/nutrition-engine";

const features = [
  { icon: Sparkles, title: "AI Recipe Parsing", desc: "Enter natural language recipes — our engine extracts ingredients automatically" },
  { icon: ArrowDownUp, title: "Unit Conversion", desc: "Cups, tbsp, pieces — all converted to grams for precise calculation" },
  { icon: FileText, title: "FSSAI Label Generation", desc: "Generate ready-to-print FSSAI-compliant nutrition labels instantly" },
  { icon: Zap, title: "Health Score", desc: "Get an instant health assessment based on macro balance and fibre content" },
];

const Index = () => {
  const [result, setResult] = useState<NutritionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = (text: string) => {
    setIsAnalyzing(true);
    // Simulate AI processing delay
    setTimeout(() => {
      const parsed = parseRecipe(text);
      if (parsed.ingredients.length === 0) {
        toast.error("Could not find any recognizable ingredients. Please try again with different phrasing.");
        setResult(null);
      } else {
        setResult(parsed);
      }
      setIsAnalyzing(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero-subtle py-16 sm:py-24">
        <div className="container grid items-center gap-8 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <Leaf className="h-4 w-4" />
              Smart Nutrition Intelligence
            </div>
            <h1 className="max-w-xl font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              From Kitchen to{" "}
              <span className="text-gradient-primary">Compliance</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              AI that understands your recipe. Parse natural language, calculate nutrition, and generate FSSAI-compliant labels — instantly.
            </p>
          </div>
          <div className="hidden md:block">
            <img src={heroIllustration} alt="NutriGen AI nutrition analysis illustration" className="w-full rounded-2xl shadow-elevated" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-border py-12">
        <div className="container grid grid-cols-2 gap-4 sm:grid-cols-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center gap-2 rounded-xl p-4 text-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display text-sm font-semibold text-foreground">{title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Analyzer */}
      <section className="py-12 sm:py-16">
        <div className="container max-w-4xl">
          <div className="mb-8 flex items-center gap-3">
            <ChefHat className="h-6 w-6 text-primary" />
            <h2 className="font-display text-2xl font-bold text-foreground">Recipe Analyzer</h2>
          </div>

          <RecipeInput onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
        </div>
      </section>

      {/* Results */}
      {result && result.ingredients.length > 0 && (
        <section className="border-t border-border bg-muted/30 py-12 sm:py-16">
          <div className="container max-w-5xl space-y-8">
            <h2 className="font-display text-2xl font-bold text-foreground">Nutrition Analysis</h2>

            <MacroCards result={result} />

            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <MacroCharts result={result} />
              </div>
              <HealthScore result={result} />
            </div>

            <IngredientTable result={result} />

            <FSSAILabel result={result} />
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            NutriGen AI — Smart Recipe & FSSAI Nutrition Analyzer
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
