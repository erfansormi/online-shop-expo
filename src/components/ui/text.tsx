import { fontFamilies, fontSizes } from "@/utils/constants/styles";
import React from "react";
import { Text as NativeText, TextProps } from "react-native";

interface Props {
  color?: string;
  size?: keyof typeof fontSizes;
  fontFamily?: keyof typeof fontFamilies;
}

const Text = ({
  size = "base",
  color = "#222",
  fontFamily = "vazir",
  style,
  ...props
}: TextProps & Props) => {
  return (
    <NativeText style={[{ fontFamily, color, fontSize: fontSizes[size] }, style]} {...props}>
      {props.children}
    </NativeText>
  );
};

export default Text;
