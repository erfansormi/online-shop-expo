import { fontSizes } from "@/utils/constants/styles";
import Text from "./text";
import React, { ReactNode } from "react";
import {
  ActivityIndicator,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";

interface Props {
  loading?: boolean;
  style?: ViewStyle;
  children: ReactNode;
  onPress?: () => void;
  viewProps?: ViewProps;
  fontSizes?: keyof typeof fontSizes;
  size?: keyof typeof viewVariants.size;
  variant?: keyof typeof viewVariants.variant;
  touchableProps?: TouchableNativeFeedbackProps;
}

const Button = (props: Props) => {
  const { size = "sm", variant = "primary", fontSizes = "sm" } = props;

  return (
    <TouchableNativeFeedback
      disabled={props.loading}
      onPress={props.onPress}
      {...props.touchableProps}
    >
      <View
        {...props.viewProps}
        className={`rounded-lg ${viewVariants.variant[variant]} ${viewVariants.size[size]}`}
        style={[{ opacity: props.loading ? 0.8 : 1 }, props.style]}
      >
        <Text
          style={{ fontSize: textVariants.fontSizes[fontSizes] }}
          className={`text-center ${textVariants.variant[variant]}`}
        >
          {props.loading ? (
            <ActivityIndicator
              size={30}
              color={variant === "outline" ? "rgb(239, 64, 86)" : "#fff"}
            />
          ) : (
            props.children
          )}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default Button;

const viewVariants = {
  variant: {
    primary: "bg-rose-500 text-white",
    outline: "bg-white border border-solid border-rose-500 text-rose-500",
  },
  size: {
    base: "py-3 px-5",
    sm: "py-2 px-4",
    xs: "py-1.5 px-3",
  },
};

const textVariants = {
  variant: {
    primary: "text-white",
    outline: "text-rose-500",
  },
  fontSizes,
};
