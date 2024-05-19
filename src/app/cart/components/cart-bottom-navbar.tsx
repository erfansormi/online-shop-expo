import Text from "@/components/ui/text";
import { useCartStore } from "@/store/cart-store";
import React from "react";
import { View } from "react-native";

const CartBottomNavbar = () => {
  const cart = useCartStore();

  return (
    <View className="flex border-t border-t-gray-200 flex-row justify-between px-4">
      <View></View>
      <View>
        <Text>جمع سبد خرید</Text>
        <View>
          <Text>{cart.products_prices}</Text>
        </View>
      </View>
    </View>
  );
};

export default CartBottomNavbar;
