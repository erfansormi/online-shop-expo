import React from "react";
import Text from "@/components/ui/text";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { Controller } from "react-hook-form";
import Container from "@/components/common/container";
import { useSignup } from "@/hooks/auth/useSignup";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SignupSchemaData } from "@/utils/schemas";

const Signup = () => {
  const { form, loading, onSubmit } = useSignup();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = form;

  return (
    <Container>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={"padding"}
          className="flex-1 justify-center"
          keyboardVerticalOffset={Platform.OS === "android" ? 75 : 0}
          contentContainerStyle={{ flex: 1, justifyContent: "center" }}
        >
          <View className="w-full">
            {/* TITLE */}
            <Text
              size="3xl"
              fontFamily="vazirBold"
              className="text-center text-rose-600"
            >
              بهمان کالا
            </Text>

            <Text size="xl" className="pt-2 text-center">
              ثبت نام
            </Text>

            {/* INPUTS */}
            <View style={{ gap: 10 }}>
              {inputs.map((input) => (
                <View style={{ flexBasis: input.width }} key={input.name}>
                  <Controller
                    name={input.name}
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        value={value}
                        onChange={onBlur}
                        onChangeText={onChange}
                        label={input.label}
                        placeholder={input.placeholder}
                        error={
                          errors[input.name] && errors[input.name]?.message
                        }
                        secureTextEntry={
                          input.name === "password" ||
                          input.name === "confirmPassword"
                        }
                      />
                    )}
                  />
                </View>
              ))}
            </View>

            <View className="pt-3">
              <Button
                touchableProps={{
                  onPress: handleSubmit(onSubmit),
                  disabled: loading,
                }}
                loading={loading}
              >
                ورود
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </Container>
  );
};

export default Signup;

interface Input {
  label: string;
  width: `${number}%`;
  placeholder: string;
  name: keyof SignupSchemaData;
}

export const inputs: Input[] = [
  {
    label: "نام",
    width: "48%",
    name: "first_name",
    placeholder: "نام خود را وارد کنید",
  },
  {
    label: "نام خانوادگی",
    width: "48%",
    name: "last_name",
    placeholder: "نام خانوادگی خود را وارد کنید",
  },
  {
    label: "ایمیل",
    width: "100%",
    name: "email",
    placeholder: "ایمیل خود را وارد کنید",
  },
  {
    label: "رمز عبور",
    width: "100%",
    name: "password",
    placeholder: "رمز عبور خود را وارد کنید",
  },
  {
    label: "تکرار رمز عبور",
    width: "100%",
    name: "confirmPassword",
    placeholder: "رمز عبور خود را تکرار کنید",
  },
];
