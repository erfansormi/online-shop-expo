import React from "react";
import { router } from "expo-router";
import Text from "@/components/ui/text";
import { FontAwesome5 } from "@expo/vector-icons";
import { useCartStore } from "@/store/cart-store";
import Container from "@/components/common/container";
import { Image, Pressable, ScrollView, TouchableOpacity, View } from "react-native";
import CartBottomNavbar from "./components/cart-bottom-navbar";
import BottomNavigation from "@/components/layout/bottom-navigation";
import ProductColorBadge from "@/components/common/product-color-badge";
import ProductPrice from "@/components/common/product-price";
import ProductCartButtons from "@/components/common/product-cart-buttons";
import { BottomNavigationHeight, colors } from "@/utils/constants/styles";
import AntDesign from "@expo/vector-icons/AntDesign";

const CartPage = () => {
  const cart = useCartStore();

  return (
    <>
      <Container withStatusBarOffset style={{ paddingBottom: BottomNavigationHeight + 69 }}>
        <View className="py-2 mb-2 border-b border-gray-200">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="mb-1">سبد خرید شما</Text>
              <Text size="sm" className="text-gray-500">
                {cart.products_counts} کالا
              </Text>
            </View>

            <TouchableOpacity onPress={() => router.back()}>
              <AntDesign name="arrowleft" size={24} color={colors.icon} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {cart?.products?.map(({ product, ...item }) => (
            <Pressable
              key={item._id}
              style={{ gap: 16 }}
              onPress={() => router.navigate(`/products/${product.slug}`)}
              className="flex border-b border-b-gray-200 flex-row py-4"
            >
              <View className="w-1/4">
                <Image
                  className="w-full h-32"
                  style={{ objectFit: "contain" }}
                  source={{ uri: product.image }}
                />
              </View>

              <View className="flex-col w-3/4 pl-4" style={{ gap: 6 }}>
                {/* TITLE */}
                <Text size="base">{product.title}</Text>

                {/* COLOR */}
                <View className="flex flex-row items-center">
                  <ProductColorBadge isMinimal color={item.variant.color} />
                  <Text size="sm" className="mr-1 capitalize text-gray-500">
                    {item.variant.color}
                  </Text>
                </View>

                {/* SIZE */}
                {item.variant.size && (
                  <View className="flex flex-row items-center">
                    <FontAwesome5 name="ruler" size={20} color="#666" />
                    <Text size="sm" className="mr-1 uppercase text-gray-500">
                      {item.variant.size}
                    </Text>
                  </View>
                )}

                {/* PRICE */}
                <View>
                  <ProductPrice price={item.variant.price} />
                </View>

                {/* BUTTONS */}
                <View className="self-end">
                  <ProductCartButtons
                    requestBody={{
                      productId: product._id,
                      selectedVariant: { _id: item.variant._id, selectedColor: item.variant.color },
                      sellerId: item.seller._id,
                    }}
                    variantId={item.variant._id}
                    quantity={item.variant.quantity}
                  />
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </Container>

      <CartBottomNavbar />
      <BottomNavigation />
    </>
  );
};

export default CartPage;
