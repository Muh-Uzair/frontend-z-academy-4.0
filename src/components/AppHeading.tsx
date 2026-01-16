// src/components/AppHeading.tsx

import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface AppHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  variant?: "display" | "h1" | "h2" | "h3" | "h4";
  subtitle?: ReactNode;
  color?:
    | "default"
    | "brand"
    | "brand-light"
    | "brand-dark"
    | "brand-extra-light"
    | "brand-extra-dark";
  className?: string;
  subtitleClassName?: string;
}

const AppHeading = ({
  children,
  variant = "h1",
  subtitle,
  color = "default",
  className,
  subtitleClassName,
  ...props
}: AppHeadingProps) => {
  // Tailwind size classes (Shadcn standard)
  const sizeClasses = {
    display: "scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-6xl",
    h1: "scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl",
    h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
    h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
    h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  };

  // Brand color mapping using CSS variables
  const colorClasses = {
    default: "text-foreground",
    brand: "text-[var(--brand-color)]",
    "brand-light": "text-[var(--brand-color-light)]",
    "brand-dark": "text-[var(--brand-color-dark)]",
    "brand-extra-light": "text-[var(--brand-color-extra-light)]",
    "brand-extra-dark": "text-[var(--brand-color-extra-dark)]",
  };

  const HeadingTag = variant === "display" ? "h1" : variant;

  return (
    <div className="space-y-2">
      <HeadingTag
        className={cn(
          "leading-tight",
          sizeClasses[variant],
          colorClasses[color],
          className
        )}
        {...props}
      >
        {children}
      </HeadingTag>

      {subtitle && (
        <p
          className={cn(
            "text-muted-foreground",
            variant === "display" && "text-xl",
            variant === "h1" && "text-lg",
            variant === "h2" && "text-base",
            (variant === "h3" || variant === "h4") && "text-sm",
            color !== "default" && "text-muted-foreground/80",
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default AppHeading;
