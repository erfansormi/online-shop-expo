import React from "react";
import { View } from "react-native";
import Text from "../ui/text";

interface Props {
  price?: number;
  oldPrice?: number;
}

const ProductPrice = ({ price, oldPrice }: Props) => {
  if (oldPrice) {
    return (
      <View className="h-5">
        <Text size="sm" fontFamily="vazirBold" className="ml-8 text-neutral-400 line-through">
          {oldPrice ? Number(oldPrice + "0000").toLocaleString("fa") : null}
        </Text>
      </View>
    );
  }

  if (price)
    return (
      <View className="flex-row items-center">
        <Text fontFamily="vazirBold" className="text-neutral-700">
          {Number(price + "0000").toLocaleString("fa")}
        </Text>
        <Text size="2xs" fontFamily="vazirBold" className="mr-1">
          تومان
        </Text>
      </View>
    );
};

export default ProductPrice;
