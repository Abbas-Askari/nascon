import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, icon, type, ...props }, ref) => {
  return (
    (<div
      tabIndex={-1}
      className={cn(
        "flex justify-center has-[:focus-visible]:ring-1 has-[:focus-visible]:ring-ring items-center h-9 w-full rounded-md border border-input bg-transparent shadow-sm transition-colors",
        className
      )} 
    >
    <input
      type={type}
      className={cn(
        "flex flex-1 h-9 w-full rounded-md bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props} />
      {icon && <button 
      tabIndex={-1}
      type="button" className="h-full focus-visible:outline-none px-3 py-1">
        {icon}
      </button>}
    </div>)
  );
})
Input.displayName = "Input"

export { Input }
