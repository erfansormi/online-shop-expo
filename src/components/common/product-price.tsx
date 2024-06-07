import React from "react";
import { View } from "react-native";
import Text from "../ui/text";
import { fontSizes } from "@/utils/constants/styles";

interface Props {
  price?: number;
  oldPrice?: number;
  priceSize?: keyof typeof fontSizes | number;
  oldPriceSize?: keyof typeof fontSizes | number;
}

const ProductPrice = ({ price, oldPrice, priceSize, oldPriceSize = "sm" }: Props) => {
  if (oldPrice) {
    return (
      <View className="h-5">
        <Text
          size={oldPriceSize}
          fontFamily="vazirBold"
          className="ml-8 text-neutral-400 line-through"
        >
          {oldPrice ? Number(oldPrice + "0000").toLocaleString("fa") : null}
        </Text>
      </View>
    );
  }

  if (price)
    return (
      <View className="flex-row items-center">
        <Text size={priceSize} fontFamily="vazirBold" className="text-neutral-700">
          {Number(price + "0000").toLocaleString("fa")}
        </Text>
        <Text size="2xs" fontFamily="vazirBold" className="mr-1">
          تومان
        </Text>
      </View>
    );
};

export default ProductPrice;
