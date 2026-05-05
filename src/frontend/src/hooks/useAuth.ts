import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  principal: Principal | undefined;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export function useAuth(): AuthState {
  const { identity, loginStatus, isAuthenticated, login, clear } =
    useInternetIdentity();

  const isLoading =
    loginStatus === "logging-in" || loginStatus === "initializing";
  const principal = identity?.getPrincipal() as Principal | undefined;

  return {
    isAuthenticated,
    isLoading,
    principal,
    login: async () => {
      login();
    },
    logout: async () => {
      clear();
    },
  };
}
