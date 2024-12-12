"use client";

import { Input } from "@/components/ui/input";
import { SignUpFormInputs } from "@/schemas/authSchema";
import { Check, Eye, EyeOff, X } from "lucide-react";
import { ChangeEvent, useMemo, useState } from "react";
import {
  FieldError,
  UseFormRegister,
  UseFormRegisterReturn,
} from "react-hook-form";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "./tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";

export default function Password({
  register,
  errors,
  disabled,
}: {
  register: UseFormRegister<any>;
  errors?: FieldError;
  disabled: boolean;
}) {
  const { onChange, onBlur, name, ref } = register("password", {
    required: true,
  });

  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    onChange(e);
  };
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[0-9]/, text: "At least 1 number" },
      { regex: /[a-z]/, text: "At least 1 lowercase letter" },
      { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
    ];

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = checkStrength(password);

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-border";
    if (score <= 1) return "bg-red-500";
    if (score <= 2) return "bg-orange-500";
    if (score === 3) return "bg-amber-500";
    return "bg-emerald-500";
  };
  const getStrengthTextColor = (score: number) => {
    if (score === 0) return "";
    if (score <= 1) return "text-red-500";
    if (score <= 2) return "text-red-500";
    if (score === 3) return "text-red-500";
    return "text-emerald-500";
  };

  const getStrengthText = (score: number) => {
    if (score === 0) return "Enter a password";
    if (score <= 2) return "Weak password";
    if (score === 3) return "Medium password";
    return "Strong password";
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <div className="relative">
          <TooltipTrigger asChild>
            <Input
              id="password"
              type={isVisible ? "text" : "password"}
              value={password}
              placeholder="••••••••"
              onChange={onChangeHandler} // assign onChange event
              onBlur={onBlur} // assign onBlur event
              name={name} // assign name prop
              ref={ref} // assign ref prop
              aria-invalid={strengthScore < 4}
              aria-describedby="password-strength"
              error={errors}
              disabled={disabled}
            />
          </TooltipTrigger>
          <button
            className="absolute inset-y-0 end-1 mt-1 flex h-9 w-9 items-center justify-center rounded-e-md bg-slate-500/10 text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            onClick={toggleVisibility}
            aria-label={isVisible ? "Hide password" : "Show password"}
            aria-pressed={isVisible}
            aria-controls="password"
          >
            {isVisible ? (
              <Eye size={16} strokeWidth={2} aria-hidden="true" />
            ) : (
              <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Password strength indicator */}
        {password && (
          <div className="px-1">
            <div
              className="mt-2 h-1 w-full overflow-hidden rounded-full bg-slate-600"
              role="progressbar"
              aria-valuenow={strengthScore}
              aria-valuemin={0}
              aria-valuemax={4}
              aria-label="Password strength"
            >
              <div
                className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
                style={{ width: `${(strengthScore / 4) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
        {
          <TooltipContent side="right">
            <div className="space-y-2 pt-2">
              {/* Password strength description */}
              <p
                id="password-strength"
                className="text-sm font-light text-foreground"
              >
                <span
                  className={`${getStrengthTextColor(strengthScore)} font-medium`}
                >
                  {getStrengthText(strengthScore)}.
                </span>{" "}
                Must contain:
              </p>

              {/* Password requirements list */}
              <ul className="space-y-1.5" aria-label="Password requirements">
                {strength.map((req, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {req.met ? (
                      <Check
                        size={16}
                        className="text-emerald-500"
                        aria-hidden="true"
                      />
                    ) : (
                      <X
                        size={16}
                        className="text-muted-foreground/80"
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={`text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"}`}
                    >
                      {req.text}
                      <span className="sr-only">
                        {req.met
                          ? " - Requirement met"
                          : " - Requirement not met"}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <TooltipArrow className="fill-neutral-200 stroke-stone-200 dark:fill-neutral-700 dark:stroke-neutral-700" />
          </TooltipContent>
        }
      </Tooltip>
    </TooltipProvider>
  );
}
export function TogglePassword({
  register,
  errors,
  divClassName,
  ...props
}: {
  register: UseFormRegisterReturn;
  errors?: FieldError;
  divClassName?: string;
  [key: string]: any;
}) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  console.log(props);
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);
  return (
    <div className={"relative " + divClassName}>
      <Input
        id="input-confirm"
        placeholder="••••••••"
        type={isVisible ? "text" : "password"}
        {...register}
        aria-describedby="password-strength"
        error={errors}
        {...props}
      />
      <button
        className="absolute inset-y-0 end-1 mt-1 flex h-9 w-9 items-center justify-center rounded-e-sm bg-slate-500/10 text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        type="button"
        onClick={toggleVisibility}
        aria-label={isVisible ? "Hide password" : "Show password"}
        aria-pressed={isVisible}
        aria-controls="password"
      >
        {isVisible ? (
          <Eye size={16} strokeWidth={2} aria-hidden="true" />
        ) : (
          <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
