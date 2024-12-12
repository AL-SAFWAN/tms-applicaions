import { Metadata } from "next";

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
              Reset Your Password
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your new password below
            </p>
          </div>
          <div className="space-y-6">
            <SignUpForm />
          </div>
        </div>
      </section>
    </div>
  );
}
