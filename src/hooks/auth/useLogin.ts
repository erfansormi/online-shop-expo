import { useState } from "react";
import { login } from "@/services/auth";
import { useForm } from "react-hook-form";
import * as SecureStore from "expo-secure-store";
import { useLinkTo } from '@react-navigation/native';
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "react-native-toast-notifications";
import { loginSchema, LoginSchemaData } from "@/utils/schemas";
import { router } from "expo-router";

export const useLogin = () => {
    const toast = useToast()
    const [loading, setLoading] = useState(false);
    const form = useForm<LoginSchemaData>({ resolver: zodResolver(loginSchema) });

    const onSubmit = (data: LoginSchemaData) => {
        setLoading(true);
        login(data)
            .then((res) => {
                SecureStore.setItem("token", res.data.token);
                toast.show("ورود با موفقیت انجام شد", { type: "success" });
                router.push("/");
            })
            .catch((err) => {
                console.log(err);
                toast.show("خطا در ورود", { type: "danger" });
            })
            .finally(() => setLoading(false));
    };

    return {
        onSubmit,
        loading,
        form,
    }
}