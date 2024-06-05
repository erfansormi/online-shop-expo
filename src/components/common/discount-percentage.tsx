import React from "react";
import Text from "../ui/text";
import { View } from "react-native";

const DiscountPercentage = ({ discountPercentage }: { discountPercentage: number }) => {
  return (
    <View className="rounded-full bg-primary px-2.5 py-0.5 flex justify-center items-center">
      <Text color="#fff" size="2xs" fontFamily="vazirBlack">
        {discountPercentage.toLocaleString("fa")}%
      </Text>
    </View>
  );
};

export default DiscountPercentage;
