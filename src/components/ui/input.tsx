import React, { forwardRef } from "react";
import { TextInput, TextInputProps, View } from "react-native";
import Text from "./text";

interface Props {
  label?: string;
  error?: string;
  required?: boolean;
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
  fontFamily?: keyof typeof fontFamilies;
}

const Input = forwardRef<TextInput, Props & TextInputProps>(
  (
    {
      style,
      label,
      error,
      required,
      size = "sm",
      variant = "filled",
      fontFamily = "vazir",
      ...props
    },
    ref,
  ) => {
    return (
      <View>
        {label && (
          <View className="flex-row items-center gap-x-1">
            <Text size="sm" className="mb-1">
              {label}
            </Text>
            {required ? <Text className="text-red-500">*</Text> : null}
          </View>
        )}
        <TextInput
          ref={ref}
          className={`rounded-lg px-3 ${sizes[size]} ${variants[variant]}`}
          style={[
            { fontFamily, paddingVertical: 0, paddingHorizontal: 0 },
            style,
          ]}
          {...props}
        />

        <View className="mt-1 h-5">
          {error && (
            <Text size="xs" className="text-red-500">
              {error}
            </Text>
          )}
        </View>
      </View>
    );
  },
);

Input.displayName = "Input";
export default Input;

const sizes = {
  base: "py-2.5",
  sm: "py-2",
};

const variants = {
  filled: "bg-gray-50 border-gray-300 border",
  white: "bg-white border border-gray-200",
};

const fontFamilies = {
  vazirLight: "vazirLight",
  vazir: "vazir",
  vazirBold: "vazirBold",
  vazirBlack: "vazirBlack",
};
