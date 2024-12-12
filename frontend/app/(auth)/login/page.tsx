import { LoginForm } from "./LoginForm";
import Link from "next/link";

export default function AuthenticationPage() {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center rounded-tl-3xl bg-transparent p-8 pb-60 lg:bg-muted">
      <div className="mx-auto flex w-full flex-col justify-center space-y-12 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Login to your account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your details below to gain access
          </p>
        </div>
        <div className="space-y-6">
          <LoginForm />
          <div className="my-0 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an Account?{" "}
            <Link
              className="underline underline-offset-4 hover:text-primary"
              type="button"
              href={"/signup"}
            >
              Sign Up
            </Link>{" "}
            or{" "}
            <Link
              className="underline underline-offset-4 hover:cursor-pointer hover:text-primary"
              href={"/login/password-recover"}
            >
              Forgot your password
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
