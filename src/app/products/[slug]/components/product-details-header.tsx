import React from "react";
import { Link, router } from "expo-router";
import { Pressable, TouchableOpacity, View } from "react-native";
import Text from "@/components/ui/text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCartStore } from "@/store/cart-store";
import { colors } from "@/utils/constants/styles";

const ProductDetailsHeader = () => {
  const cart = useCartStore();

  return (
    <View className="w-full basis-6 items-center mt-1 flex-row justify-between" style={{ gap: 10 }}>
      <TouchableOpacity onPress={() => router.navigate("/")}>
        <View className="flex-row items-center" style={{ gap: 10 }}>
          <MaterialCommunityIcons name="arrow-right" size={24} color={colors.icon} />
          <Text fontFamily="vazirBlack" size="sm" className="text-primary">
            بازشگت به صفحه اصلی
          </Text>
        </View>
      </TouchableOpacity>

      <View className="flex-row" style={{ gap: 20 }}>
        <Pressable onPress={() => router.navigate("/checkout/cart")}>
          <MaterialCommunityIcons name="cart-outline" size={24} color={colors.icon} />
          {cart.products_counts ? (
            <View className="absolute -bottom-2 -right-2.5 px-1 bg-primary rounded">
              <Text style={{ fontSize: 10, lineHeight: 16 }} color="#fff">
                {cart.products_counts}
              </Text>
            </View>
          ) : null}
        </Pressable>
        <View>
          <MaterialCommunityIcons name="heart-outline" size={24} color={colors.icon} />
        </View>
      </View>
    </View>
  );
};

export default ProductDetailsHeader;
