import React from "react";
import Text from "../ui/text";
import { Product } from "../../types/main-page";
import ProductCard from "../common/product-card";
import { FlatList, Image, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  products: Product[];
}

const ProductsSlider = ({ products }: Props) => {
  return (
    <View className="bg-primary py-2">
      <FlatList
        horizontal
        data={products}
        decelerationRate={0.8}
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          <View className="w-screen flex-1 items-center justify-center">
            <Text className="text-xl text-white">
              موردی برای نمایش وجود ندارد!
            </Text>
          </View>
        }
        renderItem={({ item, index }) => {
          return (
            <>
              {index === 0 ? (
                <View
                  style={{ width: 170 }}
                  className="flex-col items-center justify-around"
                >
                  <View className="flex-col items-center">
                    <Text size="xl" color="#fff" fontFamily="vazirBlack">
                      پیشنهاد
                    </Text>
                    <Text size="xl" color="#fff" fontFamily="vazirBlack">
                      شگـفـت
                    </Text>
                    <Text size="xl" color="#fff" fontFamily="vazirBlack">
                      انــگـیــز
                    </Text>
                  </View>
                  <View>
                    <Image
                      source={{
                        uri: "https://www.digikala.com/statics/img/png/specialCarousel/box.webp",
                      }}
                      className="h-32 w-32"
                    />
                  </View>
                  <View
                    style={{ marginRight: 12 }}
                    className="flex-row items-center gap-x-1"
                  >
                    <Text size="xs" color="#fff" fontFamily="vazirBold">
                      مشاهده همه
                    </Text>
                    <MaterialCommunityIcons
                      size={20}
                      color="#fff"
                      name="chevron-left"
                    />
                  </View>
                </View>
              ) : null}

              <ProductCard
                index={index}
                product={item}
                productsLength={products.length}
              />
            </>
          );
        }}
      />
    </View>
  );
};

export default ProductsSlider;
