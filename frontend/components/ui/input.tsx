"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { FieldError } from "react-hook-form";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  divClassName?: string;
  error?: FieldError;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, divClassName, type, error, ...props }, ref) => {
    const radius = 100; // change this to increase the rdaius of the hover effect
    const [visible, setVisible] = React.useState(false);
    const { theme } = useTheme();
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      let { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    //avoid hydration error based on useTheme
    const [isClient, setIsClient] = React.useState(false);
    React.useEffect(() => {
      setIsClient(true);
    }, []);

    return (
      <div className={cn("flex w-full flex-col", divClassName)}>
        <motion.div
          style={
            isClient && theme === "dark"
              ? {
                  background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          var(--red-700),
          transparent 80%
        )
      `,
                }
              : {
                  background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          var(--red-400),
          transparent 80%
        )
      `,
                }
          }
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
          className={cn(
            "group/input w-full rounded-lg p-[2px] transition duration-300",
          )}
        >
          <input
            type={type}
            className={cn(
              `dark:placeholder-text-neutral-600 duration-400 flex h-10 w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black !shadow-[0px_0px_1px_1px_var(--neutral-300)] shadow-input transition file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-red-400 disabled:cursor-not-allowed disabled:opacity-50 group-hover/input:!shadow-none dark:bg-zinc-800 dark:text-white dark:!shadow-[0px_0px_1px_1px_var(--neutral-700)] dark:focus-visible:ring-red-700`,

              className,
            )}
            ref={ref}
            {...props}
          />
        </motion.div>
        {error && (
          <p className="self-start p-1 pt-[2px] text-sm font-medium text-red-500">
            {error.message}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
