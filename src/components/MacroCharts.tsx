import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface MacroChartsProps {
  result: NutritionResult;
}

const COLORS = {
  Protein: "hsl(210, 80%, 55%)",
  Carbs: "hsl(38, 92%, 55%)",
  Fat: "hsl(0, 72%, 55%)",
  Fibre: "hsl(158, 64%, 45%)",
};

const MacroCharts = ({ result }: MacroChartsProps) => {
  const pieData = [
    { name: "Protein", value: result.totalProtein },
    { name: "Carbs", value: result.totalCarbs },
    { name: "Fat", value: result.totalFat },
    { name: "Fibre", value: result.totalFibre },
  ];

  const barData = result.ingredients.slice(0, 8).map((ing) => ({
    name: ing.name,
    Calories: ing.calories,
    Protein: ing.protein,
    Carbs: ing.carbs,
    Fat: ing.fat,
  }));

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Pie chart */}
      <div className="rounded-xl bg-card p-6 shadow-soft animate-fade-in">
        <h3 className="mb-4 font-display text-lg font-semibold text-foreground">Macro Distribution</h3>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
            >
              {pieData.map((entry) => (
                <Cell key={entry.name} fill={COLORS[entry.name as keyof typeof COLORS]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "13px",
              }}
              formatter={(value: number) => [`${value}g`, undefined]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar chart */}
      <div className="rounded-xl bg-card p-6 shadow-soft animate-fade-in">
        <h3 className="mb-4 font-display text-lg font-semibold text-foreground">Ingredient Breakdown</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={barData}>
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "13px",
              }}
            />
            <Bar dataKey="Calories" fill={COLORS.Carbs} radius={[4, 4, 0, 0]} />
            <Bar dataKey="Protein" fill={COLORS.Protein} radius={[4, 4, 0, 0]} />
            <Bar dataKey="Fat" fill={COLORS.Fat} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MacroCharts;
