import React from "react";
import { Link } from "expo-router";
import { View } from "react-native";
import Text from "@/components/ui/text";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProductDetailsHeader = () => {
  return (
    <View className="w-full h-10 items-center mt-1 flex-row justify-between" style={{ gap: 10 }}>
      <Link href={"/"}>
        <View className="flex-row items-center" style={{ gap: 10 }}>
          <Text fontFamily="vazirBlack" size="sm" className="text-primary">
            بازشگت به صفحه اصلی
          </Text>
          <MaterialCommunityIcons name="arrow-right" size={24} color="#666" />
        </View>
      </Link>

      <View className="flex-row" style={{ gap: 20 }}>
        <MaterialCommunityIcons name="cart-outline" size={24} color="#666" />
        <MaterialCommunityIcons name="heart-outline" size={24} color="#666" />
      </View>
    </View>
  );
};

export default ProductDetailsHeader;
