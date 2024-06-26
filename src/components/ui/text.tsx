import React from "react";
import { Text as NativeText, TextProps } from "react-native";
import { fontFamilies, fontSizes } from "@/utils/constants/styles";

interface Props {
  color?: string;
  size?: keyof typeof fontSizes | number;
  fontFamily?: keyof typeof fontFamilies;
}

const Text = ({
  size = "base",
  color = "#333",
  fontFamily = "vazir",
  style,
  ...props
}: TextProps & Props) => {
  return (
    <NativeText
      style={[
        {
          fontFamily,
          color,
          fontSize: typeof size === "number" ? size : fontSizes[size],
        },
        style,
      ]}
      {...props}
    >
      {props.children}
    </NativeText>
  );
};

export default Text;
