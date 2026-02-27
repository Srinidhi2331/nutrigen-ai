import { Leaf, Sparkles } from "lucide-react";

const Header = () => (
  <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
    <div className="container flex h-16 items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <Leaf className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="font-display text-xl font-bold tracking-tight">
          NutriGen<span className="text-gradient-primary"> AI</span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="hidden items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground sm:flex">
          <Sparkles className="h-3 w-3" />
          AI-Powered
        </span>
      </div>
    </div>
  </header>
);

export default Header;
