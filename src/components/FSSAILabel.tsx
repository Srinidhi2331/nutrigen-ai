
interface FSSAILabelProps {
  result: NutritionResult;
}

const FSSAILabel = ({ result }: FSSAILabelProps) => {
  const totalWeight = result.ingredients.reduce((s, i) => s + i.grams, 0);
  const per100 = (val: number) => totalWeight > 0 ? Math.round((val / totalWeight) * 100 * 10) / 10 : 0;
  const perServing = (val: number) => Math.round((val / result.servings) * 10) / 10;

  const rows = [
    { nutrient: "Energy", total: `${result.totalCalories} kcal`, per100g: `${per100(result.totalCalories)} kcal`, perServing: `${perServing(result.totalCalories)} kcal` },
    { nutrient: "Protein", total: `${result.totalProtein} g`, per100g: `${per100(result.totalProtein)} g`, perServing: `${perServing(result.totalProtein)} g` },
    { nutrient: "Carbohydrate", total: `${result.totalCarbs} g`, per100g: `${per100(result.totalCarbs)} g`, perServing: `${perServing(result.totalCarbs)} g` },
    { nutrient: "Total Fat", total: `${result.totalFat} g`, per100g: `${per100(result.totalFat)} g`, perServing: `${perServing(result.totalFat)} g` },
    { nutrient: "Dietary Fibre", total: `${result.totalFibre} g`, per100g: `${per100(result.totalFibre)} g`, perServing: `${perServing(result.totalFibre)} g` },
  ];

  return (
    <div className="rounded-xl bg-card p-6 shadow-soft animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-semibold text-foreground">FSSAI Nutrition Label</h3>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">FSSAI Compliant</span>
      </div>

      <div className="fssai-label rounded-lg p-4">
        <div className="border-b-4 border-foreground pb-2 mb-2">
          <h4 className="text-center text-lg font-bold uppercase tracking-wider text-foreground">
            Nutrition Information
          </h4>
          <p className="text-center text-xs text-muted-foreground">
            Serving Size: {totalWeight > 0 ? Math.round(totalWeight / result.servings) : 0}g | Servings: {result.servings}
          </p>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-foreground">
              <th className="py-2 text-left font-semibold text-foreground">Nutrient</th>
              <th className="py-2 text-right font-semibold text-foreground">Total</th>
              <th className="py-2 text-right font-semibold text-foreground">Per 100g</th>
              <th className="py-2 text-right font-semibold text-foreground">Per Serving</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.nutrient} className={i < rows.length - 1 ? "border-b border-border" : ""}>
                <td className="py-2 font-medium text-foreground">{row.nutrient}</td>
                <td className="py-2 text-right text-foreground">{row.total}</td>
                <td className="py-2 text-right text-muted-foreground">{row.per100g}</td>
                <td className="py-2 text-right text-muted-foreground">{row.perServing}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {result.allergens.length > 0 && (
          <div className="mt-3 border-t-2 border-foreground pt-2">
            <p className="text-xs font-bold text-foreground">
              ALLERGEN WARNING: Contains {result.allergens.join(", ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FSSAILabel;
