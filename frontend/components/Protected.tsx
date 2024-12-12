"use client";

import React, { ComponentType, useEffect, useCallback } from "react";
import { useUser } from "@/hooks/auth";
import { useRouter } from "next/navigation";
import { roleEnum } from "@/schemas/authSchema";

type WithProtectedProps<P> = P;

function Protected<P extends object>(WrappedComponent: ComponentType<P>) {
  const ProtectedComponent: React.FC<WithProtectedProps<P>> = (props) => {
    const { data: user, isPending, isError } = useUser();
    const router = useRouter();

    const checkAuthentication = useCallback(() => {
      if (!isPending) {
        if (isError || !user) {
          router.push("/login");
        } else if (user.role !== roleEnum.admin) {
          router.push("/403");
        }
      }
    }, [isPending, isError, user, router]);

    useEffect(() => {
      checkAuthentication();
    }, [checkAuthentication]);

    if (isPending) {
      return <div>Loading...</div>; // Or a spinner/loading component
    }

    if (isError || !user || user.role !== roleEnum.admin) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";
  ProtectedComponent.displayName = `Protected(${wrappedComponentName})`;

  return ProtectedComponent;
}

export default Protected;
