import { useState } from "react";
import { router } from "expo-router";
import { signup } from "@/services/auth";
import { useForm } from "react-hook-form";
import * as SecureStore from "expo-secure-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "react-native-toast-notifications";
import { signupSchema, SignupSchemaData } from "@/utils/schemas"

export const useSignup = () => {
    const toast = useToast()
    const [loading, setLoading] = useState(false);
    const form = useForm<SignupSchemaData>({ resolver: zodResolver(signupSchema) });

    const onSubmit = (data: SignupSchemaData) => {
        setLoading(true);
        signup(data)
            .then((res) => {
                SecureStore.setItem("token", res.data.token);
                toast.show("ثبت نام با موفقیت انجام شد", { type: "success" });
                router.push("/home");
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