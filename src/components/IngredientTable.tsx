import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface IngredientTableProps {
  result: NutritionResult;
}

const IngredientTable = ({ result }: IngredientTableProps) => (
  <div className="rounded-xl bg-card p-6 shadow-soft animate-fade-in">
    <h3 className="mb-4 font-display text-lg font-semibold text-foreground">Ingredient Details</h3>
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ingredient</TableHead>
            <TableHead className="text-right">Qty</TableHead>
            <TableHead className="text-right">Grams</TableHead>
            <TableHead className="text-right">Calories</TableHead>
            <TableHead className="text-right">Protein</TableHead>
            <TableHead className="text-right">Carbs</TableHead>
            <TableHead className="text-right">Fat</TableHead>
            <TableHead className="text-right">Fibre</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.ingredients.map((ing, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{ing.name}</TableCell>
              <TableCell className="text-right">{ing.quantity} {ing.unit}</TableCell>
              <TableCell className="text-right">{ing.grams}g</TableCell>
              <TableCell className="text-right">{ing.calories}</TableCell>
              <TableCell className="text-right">{ing.protein}g</TableCell>
              <TableCell className="text-right">{ing.carbs}g</TableCell>
              <TableCell className="text-right">{ing.fat}g</TableCell>
              <TableCell className="text-right">{ing.fibre}g</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);

export default IngredientTable;
