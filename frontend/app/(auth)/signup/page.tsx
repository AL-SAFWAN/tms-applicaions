import { Metadata } from "next";
import Link from "next/link";

import { SignUpForm } from "./SignUpForm";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <div className="relative h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <section className="relative hidden h-full flex-col p-10 text-white lg:flex">
        <div className="absolute inset-0" />

        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            {/* <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer> */}
          </blockquote>
        </div>
      </section>

      <section className="flex h-full flex-col rounded-tl-2xl bg-muted p-8">
        <div className="mx-auto flex h-full w-full flex-col justify-center space-y-12 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your details below to create your account
            </p>
          </div>
          <div className="space-y-6">
            <SignUpForm />

            <div className="my-0 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
            <div className="space-y-2">
              <p className="text-center text-sm text-muted-foreground">
                Already have an Account?{" "}
                <Link
                  // className={cn(
                  //   "group/btn relative flex h-10 w-full items-center justify-center rounded-md bg-gradient-to-br from-neutral-300 to-neutral-300 font-medium text-neutral-900 shadow-[0px_1px_0px_0px_#ffffff_inset,0px_-1px_0px_0px_#ffffff_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:text-white dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]",
                  // )}
                  className="underline underline-offset-4 hover:text-primary"
                  type="submit"
                  href={"/login"}
                >
                  Login
                </Link>
              </p>

              <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our{" "}
                <Link
                  href="/terms"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
