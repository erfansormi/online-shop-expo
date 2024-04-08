import { z } from "zod";
import { errorMessages } from "./error-messages";

// SIGNUP
export const signupSchema = z.object({
    email: z
        .string({ required_error: errorMessages.required("ایمیل") })
        .email({ message: "فرمت ایمیل وارد شده، صحیح نمی‌باشد" }),
    password: z
        .string({ required_error: errorMessages.required("رمز عبور") })
        .min(8, { message: errorMessages.minLength("رمز عبور", 8) }),
    confirmPassword: z
        .string({ required_error: errorMessages.required("رمز عبور") })
        .min(8, { message: errorMessages.minLength("رمز عبور", 8) }),
    first_name: z
        .string({ required_error: errorMessages.required("نام") })
        .min(3, errorMessages.minLength("نام", 3))
        .trim(),
    last_name: z
        .string({
            required_error: errorMessages.required("نام خانوادگی"),
        })
        .min(3, errorMessages.minLength("نام خانوادگی", 3))
        .trim(),
})
export type SignupSchemaData = z.infer<typeof signupSchema>;

// LOGIN
export const loginSchema = z.object({
    email: z
        .string({ required_error: errorMessages.required("ایمیل") })
        .email({ message: "فرمت ایمیل وارد شده، صحیح نمی‌باشد" }),
    password: z
        .string({ required_error: errorMessages.required("رمز عبور") })
        .min(8, { message: errorMessages.minLength("رمز عبور", 8) }),
});
export type LoginSchemaData = z.infer<typeof loginSchema>;

// CHANGE FIRST AND LAST NAME
export const changeNameSchema = z.object({
    first_name: z
        .string({ required_error: errorMessages.required("نام") })
        .min(3, errorMessages.minLength("نام", 3))
        .trim(),
    last_name: z
        .string({
            required_error: errorMessages.required("نام خانوادگی"),
        })
        .min(3, errorMessages.minLength("نام خانوادگی", 3))
        .trim(),
});
export type ChangeNameData = z.infer<typeof changeNameSchema>;