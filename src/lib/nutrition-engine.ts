export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  grams: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fibre: number;
}

export interface NutritionResult {
  ingredients: Ingredient[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalFibre: number;
  servings: number;
  healthScore: number;
  allergens: string[];
}

// Mock nutrition database (per 100g)
const nutritionDB: Record<string, { calories: number; protein: number; carbs: number; fat: number; fibre: number }> = {
  rice: { calories: 130, protein: 2.7, carbs: 28, fat: 0.3, fibre: 0.4 },
  onion: { calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1, fibre: 1.7 },
  oil: { calories: 884, protein: 0, carbs: 0, fat: 100, fibre: 0 },
  chicken: { calories: 239, protein: 27, carbs: 0, fat: 14, fibre: 0 },
  tomato: { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fibre: 1.2 },
  potato: { calories: 77, protein: 2, carbs: 17, fat: 0.1, fibre: 2.2 },
  milk: { calories: 42, protein: 3.4, carbs: 5, fat: 1, fibre: 0 },
  egg: { calories: 155, protein: 13, carbs: 1.1, fat: 11, fibre: 0 },
  butter: { calories: 717, protein: 0.9, carbs: 0.1, fat: 81, fibre: 0 },
  sugar: { calories: 387, protein: 0, carbs: 100, fat: 0, fibre: 0 },
  flour: { calories: 364, protein: 10, carbs: 76, fat: 1, fibre: 2.7 },
  salt: { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 },
  garlic: { calories: 149, protein: 6.4, carbs: 33, fat: 0.5, fibre: 2.1 },
  ginger: { calories: 80, protein: 1.8, carbs: 18, fat: 0.8, fibre: 2 },
  paneer: { calories: 265, protein: 18, carbs: 1.2, fat: 21, fibre: 0 },
  dal: { calories: 116, protein: 9, carbs: 20, fat: 0.4, fibre: 8 },
  lentils: { calories: 116, protein: 9, carbs: 20, fat: 0.4, fibre: 8 },
  spinach: { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fibre: 2.2 },
  yogurt: { calories: 59, protein: 10, carbs: 3.6, fat: 0.7, fibre: 0 },
  cream: { calories: 340, protein: 2.1, carbs: 2.8, fat: 36, fibre: 0 },
  cheese: { calories: 402, protein: 25, carbs: 1.3, fat: 33, fibre: 0 },
  capsicum: { calories: 20, protein: 0.9, carbs: 4.6, fat: 0.2, fibre: 1.7 },
  cumin: { calories: 375, protein: 18, carbs: 44, fat: 22, fibre: 11 },
  turmeric: { calories: 312, protein: 10, carbs: 67, fat: 3.3, fibre: 22.7 },
  coriander: { calories: 23, protein: 2.1, carbs: 3.7, fat: 0.5, fibre: 2.8 },
  peas: { calories: 81, protein: 5.4, carbs: 14, fat: 0.4, fibre: 5.7 },
  carrot: { calories: 41, protein: 0.9, carbs: 10, fat: 0.2, fibre: 2.8 },
  coconut: { calories: 354, protein: 3.3, carbs: 15, fat: 33, fibre: 9 },
  ghee: { calories: 900, protein: 0, carbs: 0, fat: 100, fibre: 0 },
  wheat: { calories: 340, protein: 13, carbs: 72, fat: 2.5, fibre: 11 },
  oats: { calories: 389, protein: 17, carbs: 66, fat: 7, fibre: 11 },
  almond: { calories: 579, protein: 21, carbs: 22, fat: 50, fibre: 12 },
  peanut: { calories: 567, protein: 26, carbs: 16, fat: 49, fibre: 8.5 },
  soy: { calories: 173, protein: 17, carbs: 10, fat: 9, fibre: 6 },
  apple: { calories: 52, protein: 0.3, carbs: 14, fat: 0.2, fibre: 2.4 },
  banana: { calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fibre: 2.6 },
  beef: { calories: 250, protein: 26, carbs: 0, fat: 15, fibre: 0 },
  fish: { calories: 206, protein: 22, carbs: 0, fat: 12, fibre: 0 },
  mutton: { calories: 294, protein: 25, carbs: 0, fat: 21, fibre: 0 },
  honey: { calories: 304, protein: 0.3, carbs: 82, fat: 0, fibre: 0.2 },
};

// Unit to grams conversion
const unitToGrams: Record<string, number> = {
  cup: 240,
  cups: 240,
  tbsp: 15,
  tablespoon: 15,
  tablespoons: 15,
  tsp: 5,
  teaspoon: 5,
  teaspoons: 5,
  g: 1,
  gm: 1,
  grams: 1,
  gram: 1,
  kg: 1000,
  ml: 1,
  litre: 1000,
  liter: 1000,
  piece: 50,
  pieces: 50,
  slice: 30,
  slices: 30,
  pinch: 0.5,
  handful: 30,
};

// Allergen mapping
const allergenMap: Record<string, string> = {
  milk: "Milk",
  cream: "Milk",
  butter: "Milk",
  cheese: "Milk",
  paneer: "Milk",
  yogurt: "Milk",
  ghee: "Milk",
  egg: "Eggs",
  wheat: "Gluten",
  flour: "Gluten",
  peanut: "Peanuts",
  soy: "Soy",
  coconut: "Tree Nuts",
};

export function parseRecipe(text: string): NutritionResult {
  const lines = text.split(/[,\n]+/).map(l => l.trim()).filter(Boolean);
  const ingredients: Ingredient[] = [];
  const allergens = new Set<string>();

  for (const line of lines) {
    // Handle fractions like "1/2 cup" or "1.5 cups"
    const match = line.match(/(\d+\/?\d*|\d*\.\d+)\s*(cup|tbsp|tablespoon|tsp|teaspoon|g|gm|gram|kg|ml|litre|liter|piece|slice|pinch|handful)s?\s+(?:of\s+)?(.+)/i);

    let ingredientName: string;
    let quantity: number;
    let unit: string;

    if (match) {
      if (match[1].includes("/")) {
        const [num, den] = match[1].split("/");
        quantity = parseFloat(num) / parseFloat(den);
      } else {
        quantity = parseFloat(match[1]);
      }
      unit = match[2].toLowerCase();
      ingredientName = match[3].toLowerCase().trim();
    } else {
      // Try simpler pattern: "ingredient" or "number ingredient"
      const simpleMatch = line.match(/(\d+\/?\d*|\d*\.\d+)?\s*(.+)/);
      if (!simpleMatch || !simpleMatch[2]) continue;

      if (simpleMatch[1]) {
        if (simpleMatch[1].includes("/")) {
          const [num, den] = simpleMatch[1].split("/");
          quantity = parseFloat(num) / parseFloat(den);
        } else {
          quantity = parseFloat(simpleMatch[1]);
        }
      } else {
        quantity = 100; // Default if no number
      }
      unit = "g";
      ingredientName = simpleMatch[2].toLowerCase().trim();
    }

    // Remove common cooking verbs
    ingredientName = ingredientName
      .replace(/^(boil|fry|chop|dice|mince|slice|add|mix|stir|cook|bake|roast|grill|steam|sauté|saute|blend|crush|grate|peel)\s+/i, '')
      .replace(/\s*(boiled|fried|chopped|diced|minced|sliced|cooked|baked|roasted|grilled|steamed|blended|crushed|grated|peeled)$/i, '')
      .trim();

    // Find best match in DB
    const dbKey = Object.keys(nutritionDB).find(k => ingredientName.includes(k)) || ingredientName;
    const nutrition = nutritionDB[dbKey];
    if (!nutrition) continue;

    const gramsMultiplier = unitToGrams[unit] || 1;
    const grams = quantity * gramsMultiplier;
    const factor = grams / 100;

    // Check allergens
    if (allergenMap[dbKey]) allergens.add(allergenMap[dbKey]);

    ingredients.push({
      name: dbKey.charAt(0).toUpperCase() + dbKey.slice(1),
      quantity,
      unit,
      grams: Math.round(grams),
      calories: Math.round(nutrition.calories * factor),
      protein: Math.round(nutrition.protein * factor * 10) / 10,
      carbs: Math.round(nutrition.carbs * factor * 10) / 10,
      fat: Math.round(nutrition.fat * factor * 10) / 10,
      fibre: Math.round(nutrition.fibre * factor * 10) / 10,
    });
  }

  const totals = ingredients.reduce(
    (acc, ing) => ({
      calories: acc.calories + ing.calories,
      protein: acc.protein + ing.protein,
      carbs: acc.carbs + ing.carbs,
      fat: acc.fat + ing.fat,
      fibre: acc.fibre + ing.fibre,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 }
  );

  // Health score: 0-100 based on protein ratio, fibre, and calorie density
  const totalMacroG = totals.protein + totals.carbs + totals.fat;
  const proteinRatio = totalMacroG > 0 ? totals.protein / totalMacroG : 0;
  const fibreBonus = Math.min(totals.fibre / 10, 1) * 20;
  const healthScore = Math.min(100, Math.round(proteinRatio * 60 + fibreBonus + 20));

  return {
    ingredients,
    totalCalories: Math.round(totals.calories),
    totalProtein: Math.round(totals.protein * 10) / 10,
    totalCarbs: Math.round(totals.carbs * 10) / 10,
    totalFat: Math.round(totals.fat * 10) / 10,
    totalFibre: Math.round(totals.fibre * 10) / 10,
    servings: 2,
    healthScore,
    allergens: Array.from(allergens),
  };
}
