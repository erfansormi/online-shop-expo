import React from "react";
import { View } from "react-native";

interface Props {
  isActive?: boolean;
}

const RadioButton = ({ isActive = false }: Props) => {
  return (
    <>
      <View
        className={`w-5 h-5 rounded-full border-gray-700 border-2  ${isActive && "border-cyan-500 border-4"}`}
      />
    </>
  );
};

export default RadioButton;
