import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Address, Order, ShoppingItem, UserProfile } from "../backend";
import { OrderStatus } from "../backend";
import { useAuth } from "./useAuth";

function useBackendActor() {
  return useActor(createActor);
}

export function useMyOrders() {
  const { actor, isFetching } = useBackendActor();
  const { isAuthenticated } = useAuth();
  return useQuery<Order[]>({
    queryKey: ["my-orders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyOrders();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
    staleTime: 1000 * 60 * 2,
  });
}

export function useOrderById(orderId: bigint | null) {
  const { actor, isFetching } = useBackendActor();
  const { isAuthenticated } = useAuth();
  return useQuery<Order | null>({
    queryKey: ["order", orderId?.toString()],
    queryFn: async () => {
      if (!actor || orderId === null) return null;
      return actor.getOrderById(orderId);
    },
    enabled: !!actor && !isFetching && isAuthenticated && orderId !== null,
    staleTime: 1000 * 60,
  });
}

export function useUserProfile() {
  const { actor, isFetching } = useBackendActor();
  const { isAuthenticated } = useAuth();
  return useQuery<UserProfile | null>({
    queryKey: ["user-profile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
    staleTime: 1000 * 60 * 5,
  });
}

export function useSaveUserProfile() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("No actor");
      await actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["user-profile"] }),
  });
}

export function useAddAddress() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (address: Address) => {
      if (!actor) throw new Error("No actor");
      await actor.addAddress(address);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["user-profile"] }),
  });
}

export function useRemoveAddress() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (index: number) => {
      if (!actor) throw new Error("No actor");
      await actor.removeAddress(BigInt(index));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["user-profile"] }),
  });
}

export function useCreateCheckoutSession() {
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: async ({
      items,
      successUrl,
      cancelUrl,
    }: {
      items: ShoppingItem[];
      successUrl: string;
      cancelUrl: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.createCheckoutSession(items, successUrl, cancelUrl);
    },
  });
}

export function useStripeSessionStatus(sessionId: string | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["stripe-session", sessionId],
    queryFn: async () => {
      if (!actor || !sessionId) return null;
      return actor.getStripeSessionStatus(sessionId);
    },
    enabled: !!actor && !isFetching && !!sessionId,
    refetchInterval: 2000,
    staleTime: 0,
  });
}

export { OrderStatus };
