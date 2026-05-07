import { cn } from "@/lib/utils";
export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border border-accent bg-background/80 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-accent backdrop-blur", className)}>
      {children}
    </span>
  );
}
