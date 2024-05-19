import React, { useEffect } from "react";
import Hr from "@/components/ui/hr";
import Text from "@/components/ui/text";
import { useLocalSearchParams } from "expo-router";
import Container from "@/components/common/container";
import { useProductStore } from "@/store/product-store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LoadingScreen from "@/components/common/loading-screen";
import ProductsSlider from "@/components/sliders/products-slider";
import { Image, Pressable, ScrollView, View } from "react-native";
import ProductDetailsHeader from "./components/product-details-header";
import ProductColorBadge from "@/components/common/product-color-badge";
import { useProductDetails, useProducts } from "@/hooks/fetching/products";
import ProductDetailsBottomNavbar from "./components/product-details-bottom-navbar";
import reactotron from "reactotron-react-native";
import { useCartStore } from "@/store/cart-store";

const ProductDetails = () => {
  const { slug } = useLocalSearchParams();
  const { data, isLoading } = useProductDetails(slug as string);
  const product = data?.product;
  const products = useProducts();
  const productStore = useProductStore();
  const setter = useProductStore.setState;

  return (
    <View className="flex-1">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        product && (
          <Container windowHeight withStatusBarOffset>
            {/* HEADER */}
            <ProductDetailsHeader />

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}
              style={{ marginTop: 20 }}
            >
              <View style={{ gap: 20 }}>
                {/* BREDCRUMB */}
                <View className="flex-row" style={{ gap: 4 }}>
                  <Text size="sm" className="text-gray-500">
                    بهمان کالا
                  </Text>
                  <Text size="sm" className="text-gray-500">
                    /
                  </Text>
                  <Text size="sm" className="text-gray-500">
                    {product.category}
                  </Text>
                </View>

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
                <View>
                  <View className="mb-1">
                    <Text>رنگ</Text>
                  </View>

                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 6 }}
                  >
                    {product.sellers[0].variants[0].colors.map((item) => (
                      <Pressable
                        key={item}
                        onPress={() => {
                          setter({
                            selectedVariant: {
                              ...productStore.selectedVariant,
                              selectedColor: item,
                            },
                          });
                        }}
                      >
                        <ProductColorBadge
                          color={item}
                          isActive={item === productStore.selectedVariant?.selectedColor}
                        />
                      </Pressable>
                    ))}
                  </ScrollView>
                </View>

                {/* SIZES */}
                {product.sellers[0].variants.find((item) => item.size) ? (
                  <View>
                    <View className="mb-1">
                      <Text>سایز</Text>
                    </View>
                    <View className="flex-row" style={{ gap: 10 }}>
                      {product.sellers[0].variants.map((item) =>
                        item.size ? (
                          <Pressable
                            key={item._id}
                            onPress={() => {
                              setter({
                                selectedVariant: {
                                  _id: item._id,
                                  selectedColor: item.colors[0],
                                },
                              });
                            }}
                            className={`rounded-full border border-gray-200 px-3 py-2 ${item._id === productStore.selectedVariant?._id && "border-2 border-cyan-500"}`}
                          >
                            <Text size="sm" className="uppercase">
                              {item.size}
                            </Text>
                          </Pressable>
                        ) : null
                      )}
                    </View>
                  </View>
                ) : null}

                {products.data?.products && (
                  <View>
                    <Text fontFamily="vazirBold" className="mb-2">
                      محصولات مرتبط
                    </Text>
                    <ProductsSlider
                      hasFirstBrandSlide={false}
                      products={products.data.products.filter(
                        (item) => item.category === product.category
                      )}
                    />
                  </View>
                )}
              </View>
            </ScrollView>

            {/* BOTTOM NAVIGATION IN PRODUCT DETAILS PAGES */}
            <ProductDetailsBottomNavbar />
          </Container>
        )
      )}
    </View>
  );
};

export default ProductDetails;
