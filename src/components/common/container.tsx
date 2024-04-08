import { Dimensions, StatusBar, View, ViewProps } from "react-native";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  screenHeight?: boolean;
  withStatusBarOffset?: boolean;
}

const Container = ({
  children,
  withStatusBarOffset = false,
  screenHeight = false,
  style,
  ...props
}: Props & ViewProps) => {
  return (
    <View
      className="flex-1 px-4"
      style={[
        {
          paddingTop: withStatusBarOffset ? StatusBar.currentHeight : 0,
          height: screenHeight ? Dimensions.get("screen").height : "auto",
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

export default Container;
