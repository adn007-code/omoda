import { ArrowRight, CalendarDays } from "lucide-react";
import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<"a"> & {
  variant?: "primary" | "secondary";
  icon?: "arrow" | "calendar";
};

export function Button({ children, className = "", variant = "primary", icon = "arrow", ...props }: ButtonProps) {
  const Icon = icon === "calendar" ? CalendarDays : ArrowRight;

  return (
    <a
      className={`group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 text-sm font-semibold uppercase tracking-[0.24em] transition duration-300 ${
        variant === "primary"
          ? "bg-white text-neutral-950 shadow-[0_20px_80px_rgba(255,255,255,0.18)] hover:bg-[#d7dadd]"
          : "border border-white/25 bg-white/8 text-white backdrop-blur-xl hover:border-white/50 hover:bg-white/14"
      } ${className}`}
      {...props}
    >
      <span>{children}</span>
      <Icon className="h-4 w-4 transition duration-300 group-hover:translate-x-1" aria-hidden="true" />
    </a>
  );
}
