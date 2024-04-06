import React from "react";
import Text from "@/components/ui/text";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Container from "@/components/common/container";
import { Controller } from "react-hook-form";
import { useLogin } from "@/hooks/auth/useLogin";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

const Login = () => {
  const { form, loading, onSubmit } = useLogin();
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
              ورود
            </Text>

            {/* EMAIL */}
            <View>
              <Controller
                name="email"
                control={control}
                render={({ field: { onBlur, onChange, value } }) => (
                  <Input
                    value={value}
                    onChange={onBlur}
                    onChangeText={onChange}
                    label="ایمیل"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="ایمیل خود را وارد کنید"
                    error={errors.email && errors.email.message}
                  />
                )}
              />
            </View>

            {/* PASSWORD */}
            <View>
              <Controller
                name="password"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    value={value}
                    onChange={onBlur}
                    onChangeText={onChange}
                    label="پسورد"
                    secureTextEntry
                    autoComplete="password"
                    placeholder="رمز عبور خود را وارد کنید"
                    error={errors.password && errors.password.message}
                  />
                )}
              />
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

export default Login;
