import { StatusBar, View, ViewProps } from "react-native";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  withStatusBarOffset?: boolean;
}

const Container = ({
  children,
  withStatusBarOffset = false,
  style,
  ...props
}: Props & ViewProps) => {
  return (
    <View
      className="flex-1 px-4"
      style={[
        { paddingTop: withStatusBarOffset ? StatusBar.currentHeight : 0 },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

export default Container;
