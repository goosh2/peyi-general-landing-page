import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "hero" | "heroOutline" | "ghost";
    size?: "sm" | "default" | "lg" | "xl";
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                ref={ref}
                className={cn(
                    // Motion is limited to compositor-friendly properties (transform/opacity/color)
                    // so presses stay smooth. Press feedback fires on pointer-down, not on release.
                    "inline-flex items-center justify-center rounded-md font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
                    "transition-[transform,opacity,background-color,border-color,color] duration-200 ease-[var(--ease-spring)] will-change-transform",
                    "active:duration-100",
                    // Variants
                    variant === "default" && "bg-primary text-primary-foreground shadow hover:scale-[1.03] active:scale-[0.97]",
                    variant === "hero" && "bg-[image:var(--gradient-ai)] text-white shadow-lg bg-[length:200%_200%] animate-gradient hover:scale-[1.03] active:scale-[0.97] group relative overflow-hidden",
                    variant === "heroOutline" && "bg-transparent border-2 border-foreground/20 text-foreground backdrop-blur-sm hover:bg-foreground/10 hover:border-foreground/40 active:scale-[0.97] active:bg-foreground/15",
                    variant === "ghost" && "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground active:scale-[0.97] active:bg-accent/80",

                    // Sizes
                    size === "sm" && "h-9 px-3 text-xs",
                    size === "default" && "h-10 px-4 py-2 text-sm",
                    size === "lg" && "h-12 px-8 text-base",
                    size === "xl" && "h-14 px-10 text-lg",
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
