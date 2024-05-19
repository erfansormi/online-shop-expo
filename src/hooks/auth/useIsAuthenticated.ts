import { useEffect } from "react";
import { getUserInfo } from "@/services/auth";
import * as SecureStore from "expo-secure-store";
import { useUserStore } from "@/store/user-store";
import { router, useRootNavigationState } from "expo-router";
import { useCartStore } from "@/store/cart-store";

export const useIsAuthenticated = () => {
  const token = SecureStore.getItem("token");
  const { setUser } = useUserStore();
  const cartSetter = useCartStore.setState;
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (!rootNavigationState?.key) return;

    if (!token) {
      router.push("/auth/login");
      return;
    }
    const fetchData = async () => {
      await getUserInfo()
        .then((res) => {
          setUser(res.data);
          cartSetter(res.data.cart as any);
        })
        .catch((err) => {
          setUser(null);
          router.push("/auth/login");
          return;
        });
    };
    fetchData();
  }, [token, rootNavigationState?.key]);
};
