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
            await getUserInfo()
                .then(res => setUser(res.data))
                .catch(err => {
                    setUser(null)
                    router.push("/auth/login")
                    return
                })
        }
        fetchData()
    }, [token, rootNavigationState?.key])
}