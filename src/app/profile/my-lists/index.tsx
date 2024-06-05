import React from "react";
import Card from "@/components/ui/card";
import Text from "@/components/ui/text";
import ProfileLayout from "../components/profile-layout";
import { useUserStore } from "@/store/user-store";
import { Dimensions, Image, Pressable, View } from "react-native";
import ProductPrice from "@/components/common/product-price";
import DiscountPercentage from "@/components/common/discount-percentage";
import { router } from "expo-router";

const MyLists = () => {
  const { user } = useUserStore();

  return (
    <ProfileLayout>
      <Card isEmpty={!!user && user.favorites_list.length <= 0}>
        <Text fontFamily="vazirBold" className="mb-1 pb-3 border-b border-b-gray-200">
          لیست ها
        </Text>

        {user?.favorites_list.map((item, index) => (
          <Pressable
            key={item._id}
            onPress={() => {
              router.navigate(`/products/${item.slug}`);
            }}
          >
            <View
              className={`border-b border-b-gray-300 py-5 ${user.favorites_list.length === index + 1 && "border-b-0"}`}
              style={{ gap: 12 }}
            >
              <View className="flex-row items-center" style={{ gap: 8 }}>
                <View style={{ flexBasis: 120 }}>
                  <Image
                    width={120}
                    height={120}
                    source={{ uri: item.image }}
                    style={{ objectFit: "contain" }}
                  />
                </View>

                <View style={{ flexBasis: Dimensions.get("window").width - 120 - 70 }}>
                  <Text numberOfLines={3}>{item.title}</Text>
                </View>
              </View>

              <View className="w-full justify-end">
                <View className="flex-row w-full justify-between">
                  {item.sellers[0].variants[0].discount_percentage && (
                    <DiscountPercentage
                      discountPercentage={item.sellers[0].variants[0].discount_percentage}
                    />
                  )}
                  <ProductPrice price={item.sellers[0].variants[0].price} />
                </View>
                <ProductPrice oldPrice={item.sellers[0].variants[0].old_price} />
              </View>
            </View>
          </Pressable>
        ))}
      </Card>
    </ProfileLayout>
  );
};

export default MyLists;
