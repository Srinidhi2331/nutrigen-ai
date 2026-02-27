import { Flame, Beef, Wheat, Droplets, Leaf } from "lucide-react";

interface MacroCardsProps {
  result: NutritionResult;
}

const MacroCards = ({ result }: MacroCardsProps) => {
  const macros = [
    { label: "Calories", value: result.totalCalories, unit: "kcal", icon: Flame, color: "bg-destructive/10 text-destructive" },
    { label: "Protein", value: result.totalProtein, unit: "g", icon: Beef, color: "bg-chart-protein/10 text-chart-protein" },
    { label: "Carbs", value: result.totalCarbs, unit: "g", icon: Wheat, color: "bg-chart-carbs/10 text-chart-carbs" },
    { label: "Fat", value: result.totalFat, unit: "g", icon: Droplets, color: "bg-chart-fat/10 text-chart-fat" },
    { label: "Fibre", value: result.totalFibre, unit: "g", icon: Leaf, color: "bg-chart-fibre/10 text-chart-fibre" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
      {macros.map(({ label, value, unit, icon: Icon, color }) => (
        <div
          key={label}
          className="flex flex-col items-center gap-1 rounded-xl bg-card p-4 shadow-soft animate-fade-in"
        >
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
            <Icon className="h-5 w-5" />
          </div>
          <span className="text-2xl font-bold font-display text-foreground">{value}</span>
          <span className="text-xs text-muted-foreground">{unit} {label}</span>
        </div>
      ))}
    </div>
  );
};

export default MacroCards;
