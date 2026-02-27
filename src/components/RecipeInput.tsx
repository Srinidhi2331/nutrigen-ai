import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, ChefHat, List } from "lucide-react";
import { toast } from "sonner";

interface RecipeInputProps {
  onAnalyze: (text: string) => void;
  isAnalyzing: boolean;
}

const sampleRecipes = [
  "1 cup rice, 2 tbsp oil, 1 piece onion, 2 pieces tomato, 200g chicken, 1 tsp salt, 1 tsp turmeric, 1 tsp cumin",
  "200g paneer, 1 cup cream, 2 tbsp butter, 3 pieces tomato, 1 piece onion, 2 tsp ginger, 2 tsp garlic, 1 tsp turmeric, 1 tsp cumin",
  "2 cups dal, 1 piece onion, 2 pieces tomato, 2 tsp ghee, 1 tsp turmeric, 1 tsp cumin, 2 tsp garlic",
];

const RecipeInput = ({ onAnalyze, isAnalyzing }: RecipeInputProps) => {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"recipe" | "ingredients">("recipe");

  return (
    <div className="space-y-4">
      {/* Mode toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setMode("recipe")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${mode === "recipe"
              ? "bg-primary text-primary-foreground shadow-glow"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
        >
          <ChefHat className="h-4 w-4" />
          Natural Recipe
        </button>
        <button
          onClick={() => setMode("ingredients")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${mode === "ingredients"
              ? "bg-primary text-primary-foreground shadow-glow"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
        >
          <List className="h-4 w-4" />
          Ingredient List
        </button>
      </div>

      {/* Input */}
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={
          mode === "recipe"
            ? "Enter your recipe naturally, e.g.:\n\"Boil 1 cup rice, fry 1 onion in 2 tbsp oil, add 200g chicken, 2 tomatoes, salt and turmeric to taste...\""
            : "Enter ingredients one per line:\n1 cup rice\n2 tbsp oil\n200g chicken\n1 piece onion"
        }
        className="min-h-[160px] resize-none rounded-xl border-2 border-border bg-card text-base transition-all focus:border-primary focus:shadow-glow"
      />

      {/* Sample recipes */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs font-medium text-muted-foreground">Try:</span>
        {["Chicken Biryani", "Paneer Butter Masala", "Dal Tadka"].map((name, i) => (
          <button
            key={name}
            onClick={() => setText(sampleRecipes[i])}
            className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            {name}
          </button>
        ))}
      </div>

      {/* Analyze button */}
      <Button
        onClick={() => {
          if (!text.trim()) {
            toast.error("Please enter a recipe or ingredients first");
            return;
          }
          onAnalyze(text);
        }}
        disabled={isAnalyzing}
        className="w-full rounded-xl bg-primary py-6 text-base font-semibold text-primary-foreground shadow-glow transition-all hover:shadow-elevated"
        size="lg"
      >
        <Sparkles className="mr-2 h-5 w-5" />
        {isAnalyzing ? "Analyzing Recipe..." : "Analyze Nutrition"}
      </Button>
    </div>
  );
};

export default RecipeInput;
