import React from "react";
import { Link, router } from "expo-router";
import { Pressable, View } from "react-native";
import Text from "@/components/ui/text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCartStore } from "@/store/cart-store";

const ProductDetailsHeader = () => {
  const cart = useCartStore();

  return (
    <View className="w-full basis-6 items-center mt-1 flex-row justify-between" style={{ gap: 10 }}>
      <Link href={"/"}>
        <View className="flex-row items-center" style={{ gap: 10 }}>
          <Text fontFamily="vazirBlack" size="sm" className="text-primary">
            بازشگت به صفحه اصلی
          </Text>
          <MaterialCommunityIcons name="arrow-right" size={24} color="#666" />
        </View>
      </Link>

      <View className="flex-row" style={{ gap: 20 }}>
        <Pressable onPress={() => router.navigate("/cart")}>
          <MaterialCommunityIcons name="cart-outline" size={24} color="#666" />
          {cart.products_counts ? (
            <View className="absolute -bottom-2 -right-2.5 px-1 bg-primary rounded">
              <Text style={{ fontSize: 10, lineHeight: 16 }} color="#fff">
                {cart.products_counts}
              </Text>
            </View>
          ) : null}
        </Pressable>
        <View>
          <MaterialCommunityIcons name="heart-outline" size={24} color="#666" />
        </View>
      </View>
    </View>
  );
};

export default ProductDetailsHeader;
