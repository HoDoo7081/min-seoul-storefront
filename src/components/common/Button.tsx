import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
};

export function Button({ variant = "primary", size = "md", className, ...rest }: Props) {
  const base = "inline-flex items-center justify-center rounded-btn font-medium transition-[background,color,border] duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-foreground text-background hover:bg-foreground/85",
    outline: "border border-foreground text-foreground hover:bg-foreground hover:text-background",
    ghost: "text-foreground hover:bg-muted",
    accent: "bg-accent text-accent-foreground hover:opacity-90",
  };
  const sizes = { sm: "h-9 px-4 text-sm", md: "h-11 px-6 text-sm", lg: "h-12 px-8 text-base" };
  return <button className={cn(base, variants[variant], sizes[size], className)} {...rest} />;
}
