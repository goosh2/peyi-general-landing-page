import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "hero" | "heroOutline" | "ghost";
    size?: "sm" | "default" | "lg" | "xl";
    asChild?: boolean;
}

/**
 * Pills with serif labels, as in the design comp. Primary is the coral gradient
 * lit from the top-left; secondary is ivory with a gold hairline. Press
 * feedback fires on pointer-down, and motion is compositor-only.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                ref={ref}
                data-variant={variant}
                className={cn(
                    "inline-flex items-center justify-center rounded-full font-heading font-semibold tracking-[-0.005em] cursor-pointer select-none",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
                    "disabled:pointer-events-none disabled:opacity-50",
                    "transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-[var(--ease-spring)] active:duration-100",
                    variant === "default" &&
                        "bg-ink text-cream hover:scale-[1.02] active:scale-[0.97] shadow-[0_10px_24px_-14px_rgba(6,32,28,0.6)]",
                    variant === "hero" &&
                        "bg-[image:var(--gradient-ai)] bg-[length:200%_200%] animate-gradient text-white hover:scale-[1.03] active:scale-[0.97] shadow-[0_14px_30px_-12px_rgba(232,102,75,0.6),inset_0_1px_0_rgba(255,255,255,0.35)]",
                    variant === "heroOutline" &&
                        "bg-paper/80 border-[1.5px] border-gold text-ink hover:bg-paper hover:border-gold-deep active:scale-[0.97] shadow-[0_8px_20px_-14px_rgba(120,90,40,0.5)]",
                    variant === "ghost" &&
                        "bg-transparent text-ink hover:bg-sand/70 active:scale-[0.97]",
                    size === "sm" && "h-9 px-4 text-sm",
                    size === "default" && "h-11 px-5 text-[15px]",
                    size === "lg" && "h-12 px-7 text-base",
                    size === "xl" && "h-14 px-8 text-lg",
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
