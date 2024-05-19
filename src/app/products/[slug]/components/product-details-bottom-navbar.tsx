import Button from "@/components/ui/button";
import Text from "@/components/ui/text";
import { useProductDetails } from "@/hooks/fetching/products";
import { addProductToCart, removeProductFromCart } from "@/services/cart";
import { useCartStore } from "@/store/cart-store";
import { useProductStore } from "@/store/product-store";
import { AxiosError } from "axios";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import reactotron from "reactotron-react-native";

const ProductDetailsBottomNavbar = () => {
  const toast = useToast();
  const productStore = useProductStore();
  const cartStore = useCartStore();
  const cartSetter = useCartStore.setState;
  const { slug } = useLocalSearchParams();
  const { data } = useProductDetails(slug as string);
  const product = data?.product;
  const [loading, setLoading] = useState(false);
  reactotron.log("cartStore: ", cartStore);
  reactotron.log("productStore: ", productStore);

  const addToCart = () => {
    setLoading(true);
    addProductToCart(productStore)
      .then((res) => {
        cartSetter({ ...cartStore, ...res.data.user.cart });
      })
      .catch((err: AxiosError<{ message: any }>) => {
        toast.show(err.response?.data?.message || err.message, { type: "error" });
      })
      .finally(() => setLoading(false));
  };

  const removeFromCart = () => {
    setLoading(true);
    removeProductFromCart(productStore)
      .then((res) => {
        cartSetter({ ...cartStore, ...res.data.user.cart });
      })
      .catch((err: AxiosError<{ message: any }>) => {
        toast.show(err.response?.data?.message || err.message, { type: "error" });
      })
      .finally(() => setLoading(false));
  };

  return (
    <View className="border-t-2 border-t-gray-200 basis-[70px] inset-x-0 ">
      <View className="flex-row items-center justify-between w-full h-full px-5">
        <View style={{ width: 170 }}>
          {cartStore &&
          cartStore.products &&
          cartStore.products.find(
            (item) =>
              item.variant._id === productStore.selectedVariant?._id &&
              item.variant.color === productStore.selectedVariant.selectedColor
          ) ? (
            <>
              {loading ? (
                <Button loading> </Button>
              ) : (
                <View className="w-full flex-row justify-between items-center">
                  <Button onPress={addToCart} style={{ flexBasis: "33.33333%" }}>
                    +
                  </Button>
                  <Text style={{ flexBasis: "33.33333%", textAlign: "center" }}>
                    {
                      cartStore?.products.find(
                        (item) =>
                          item.variant._id === productStore.selectedVariant?._id &&
                          item.variant.color === productStore.selectedVariant.selectedColor
                      )?.variant.quantity
                    }
                  </Text>
                  <Button onPress={removeFromCart} style={{ flexBasis: "33.33333%" }}>
                    -
                  </Button>
                </View>
              )}
            </>
          ) : (
            <Button style={{ width: "100%" }} onPress={addToCart} loading={loading}>
              افزودن به سبد خرید
            </Button>
          )}
        </View>
        <View>
          <View className="flex-row">
            <Text>{Number(product?.sellers[0].variants[0].price + "0000").toLocaleString()}</Text>
            <Text size="sm" className="mr-1">
              تومان
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductDetailsBottomNavbar;
