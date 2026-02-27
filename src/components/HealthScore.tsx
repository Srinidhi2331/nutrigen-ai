import { Activity } from "lucide-react";

interface HealthScoreProps {
  result: NutritionResult;
}

const HealthScore = ({ result }: HealthScoreProps) => {
  const score = result.healthScore;
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score >= 70) return "stroke-primary";
    if (score >= 40) return "stroke-accent";
    return "stroke-destructive";
  };

  const getLabel = () => {
    if (score >= 70) return "Excellent";
    if (score >= 50) return "Good";
    if (score >= 30) return "Fair";
    return "Needs Improvement";
  };

  return (
    <div className="flex flex-col items-center gap-3 rounded-xl bg-card p-6 shadow-soft animate-fade-in">
      <div className="flex items-center gap-2">
        <Activity className="h-5 w-5 text-primary" />
        <h3 className="font-display text-lg font-semibold text-foreground">Health Score</h3>
      </div>

      <div className="relative flex items-center justify-center">
        <svg width="128" height="128" viewBox="0 0 128 128">
          <circle
            cx="64" cy="64" r="54"
            fill="none"
            className="stroke-muted"
            strokeWidth="8"
          />
          <circle
            cx="64" cy="64" r="54"
            fill="none"
            className={getColor()}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 64 64)"
            style={{ transition: "stroke-dashoffset 1s ease-out" }}
          />
        </svg>
        <span className="absolute text-3xl font-bold font-display text-foreground">{score}</span>
      </div>

      <span className="text-sm font-medium text-muted-foreground">{getLabel()}</span>
    </div>
  );
};

export default HealthScore;
