import { Metadata } from "next";

import { FlipWordsDemo } from "@/components/main/Words";
import { FeaturesSectionDemo } from "@/components/main/Feature";

export const metadata: Metadata = {
  title: "Legion Grappling Academy",
  description: "Login to Grappling Academy to gain access",
};

export default function AuthenticationPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full">
      <section className="mx-auto hidden w-full flex-col items-center justify-center !overflow-visible p-10 pt-5 antialiased lg:flex xl:pt-0">
        <FlipWordsDemo />
        <FeaturesSectionDemo />
      </section>
      {children}
    </div>
  );
}
