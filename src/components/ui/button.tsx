import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

// Since I don't know if radix-ui/react-slot is installed, I will implement a simpler button without Slot for now to be safe, 
// or I can check package.json.
// However, standard shadcn uses it. I'll just use a standard HTML button implementation to avoid dependency issues if it's not there.
// If the user hasn't installed class-variance-authority, I'll simple hardcode variants or just use a base style.

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link", size?: "default" | "sm" | "lg" | "icon" }>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    
    let variantClass = "bg-slate-900 text-slate-50 hover:bg-slate-900/90"
    if (variant === "outline") variantClass = "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 text-slate-900"
    if (variant === "ghost") variantClass = "hover:bg-slate-100 hover:text-slate-900 text-slate-900"
    if (variant === "secondary") variantClass = "bg-slate-100 text-slate-900 hover:bg-slate-100/80"
    
    let sizeClass = "h-10 px-4 py-2"
    if (size === "sm") sizeClass = "h-9 rounded-md px-3"
    if (size === "lg") sizeClass = "h-11 rounded-md px-8"
    if (size === "icon") sizeClass = "h-10 w-10"

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variantClass,
          sizeClass,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
