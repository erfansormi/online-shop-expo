import LoadingScreen from "@/components/common/loading-screen";
import BottomNavigation from "@/components/layout/bottom-navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Product } from "@/types/main-page";
import { Link, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import useSWR from "swr";
import Container from "@/components/common/container";
import Text from "@/components/ui/text";
import ProductDetailsHeader from "./components/product-details-header";
import Hr from "@/components/ui/hr";

const ProductDetails = () => {
  const { slug } = useLocalSearchParams();
  const { data, error, isLoading } = useSWR<{
    success: boolean;
    product: Product;
  }>(`/api/v1/products/${slug}`);
  const product = data?.product;

  const colors: any = {
    sky: "bg-sky-500",
    cyan: "bg-cyan-500",
    purple: "bg-purple-500",
    pink: "bg-pink-500",
    yellow: "bg-yellow-500",
    green: "bg-green-500",
    slate: "bg-slate-500",
    gray: "bg-gray-500",
    lime: "bg-lime-500",
    blue: "bg-blue-500",
    rose: "bg-rose-500",
    teal: "bg-teal-500",
    red: "bg-red-500",
    black: "bg-black",
    white: "bg-white",
  };

  return (
    <View className="flex-1">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        product && (
          <Container withStatusBarOffset>
            {/* HEADER */}
            <ProductDetailsHeader />

            <ScrollView style={{ marginTop: 20 }}>
              <View style={{ gap: 20 }}>
                {/* IMAGE */}
                <View className="w-full items-center">
                  <Image
                    style={{ objectFit: "contain" }}
                    source={{ uri: product.image }}
                    width={250}
                    height={250}
                  />
                </View>

                {/* TITLE */}
                <View style={{ gap: 4 }}>
                  <Text className="text-cyan-500" size="sm">
                    {product.category}
                  </Text>
                  <Text size="lg">{product.title}</Text>
                </View>

                {/* RATES */}
                <View className="flex-row items-center" style={{ gap: 15 }}>
                  {/* RATES */}
                  <View className="flex-row items-center" style={{ gap: 4 }}>
                    <MaterialCommunityIcons
                      style={{ marginTop: -3 }}
                      name="star"
                      color={"orange"}
                      size={22}
                    />
                    <View>
                      <Text className="text-gray-500" size="xs">
                        {product.rating.rate}
                      </Text>
                    </View>
                    <View>
                      <Text className="text-gray-400" size="xs">
                        (امتیاز {product.rating.count} خریدار)
                      </Text>
                    </View>
                  </View>

                  <View className="rounded-full bg-gray-300 w-3 h-3 -mt-1" />

                  {/* COMMENTS COUNT */}
                  <View className="flex-row items-center" style={{ gap: 4 }}>
                    <Text size="xs" className="text-cyan-500">
                      {product.comments ? product.comments.length : 0}
                    </Text>
                    <Text size="xs" className="text-cyan-500">
                      دیدگاه
                    </Text>
                  </View>
                </View>

                {/* ATTRIBUTES */}
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ gap: 10 }}
                >
                  {product.attributes.map((item) => (
                    <View key={item._id} className="px-3 py-1 bg-gray-200/60 rounded-lg">
                      <Text className="text-gray-500 capitalize" size="xs">
                        {item.name}
                      </Text>
                      <Text className="capitalize" size="sm">
                        {item.value}
                      </Text>
                    </View>
                  ))}
                </ScrollView>

                <View className="my-2">
                  <Hr />
                </View>

                {/* COLORS */}
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ gap: 6 }}
                >
                  {product.sellers[0].variants[0].colors.map((item) => (
                    <View
                      key={item}
                      style={{ gap: 4 }}
                      className="rounded-full px-3 py-2 border border-gray-200 flex-row items-center"
                    >
                      <View
                        // style={{ backgroundColor: item }}
                        className={`w-5 h-5 rounded-full border border-gray-300 ${colors[item] ? colors[item] : ""}`}
                      />
                      <Text size="sm" className="capitalize">
                        {item}
                      </Text>
                    </View>
                  ))}
                </ScrollView>

                {/* SIZES */}
                {product.sellers[0].variants.find((item) => item.size) ? (
                  <View className="flex-row" style={{ gap: 10 }}>
                    {product.sellers[0].variants.map((item) =>
                      item.size ? (
                        <View className="rounded-full border border-gray-200 px-3 py-2">
                          <Text size="sm" className="uppercase">
                            {item.size}
                          </Text>
                        </View>
                      ) : null
                    )}
                  </View>
                ) : null}
              </View>
            </ScrollView>
          </Container>
        )
      )}

      <BottomNavigation />
    </View>
  );
};

export default ProductDetails;
