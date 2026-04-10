import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useMemo } from "react";

export function useAuth() {
  const { identity, loginStatus, login, clear } = useInternetIdentity();

  const isAuthenticated = loginStatus === "success" && !!identity;
  const principal = useMemo(() => {
    if (!identity) return null;
    return identity.getPrincipal();
  }, [identity]);

  const principalText = principal?.toText() ?? null;

  return {
    identity,
    principal,
    principalText,
    isAuthenticated,
    loginStatus,
    login,
    logout: clear,
  };
}
