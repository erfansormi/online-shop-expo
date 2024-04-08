import { useEffect } from "react"
import { getUserInfo } from "@/services/auth";
import * as SecureStore from "expo-secure-store"
import { useUserStore } from "@/store/user-store";
import { router, useRootNavigationState } from "expo-router";

export const useIsAuthenticated = () => {
    const token = SecureStore.getItem("token");
    const { setUser } = useUserStore()
    const rootNavigationState = useRootNavigationState()

    useEffect(() => {
        if (!rootNavigationState?.key) return

        if (!token) {
            router.push("/auth/login")
            return
        }
        const fetchData = async () => {
            const user = await getUserInfo()
            setUser(user.data)
        }
        fetchData()
    }, [token, rootNavigationState?.key])
}