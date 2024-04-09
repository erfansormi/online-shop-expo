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

// CHANGE EMAIL
export const changeEmailSchema = z.object({
    email: z
        .string({ required_error: errorMessages.required("ایمیل") })
        .email()
        .trim(),
});
export type ChangeEmailData = z.infer<typeof changeEmailSchema>;

// CHANGE PASSWORD
export const changePasswordSchema = z.object({
    current: z.string({
        required_error: errorMessages.required("رمز عبور کنونی"),
    })
        .min(8, errorMessages.minLength("رمز عبور کنونی", 8)),
    new: z.string({
        required_error: errorMessages.required("رمز عبور جدید"),
    })
        .min(8, errorMessages.minLength("رمز عبور جدید", 8)),
    newRepeat: z.string({
        required_error: errorMessages.required("تکرار رمز عبور جدید"),
    })
        .min(8, errorMessages.minLength("تکرار رمز عبور جدید", 8)),
}).refine((data) => data.new === data.newRepeat, {
    message: "رمز عبور های جدید یکسان نیستند!",
    path: ["newRepeat"],
})
export type ChangePasswordData = z.infer<typeof changePasswordSchema>;