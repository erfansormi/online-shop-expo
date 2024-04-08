import { popularBrands } from "@/data/home-page";
import React from "react";
import { FlatList, Image, View } from "react-native";
import SectionTitle from "@/components/common/section-title";

const PopularBrands = () => {
  return (
    <View className="mb-5">
      <SectionTitle title="محبوب ترین برندها" />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={Separator}
        data={popularBrands}
        renderItem={({ item }) => (
          <View className="px-4" key={item.id}>
            <Image
              width={80}
              height={80}
              style={{ objectFit: "contain" }}
              source={{
                uri: item.logo.url[0],
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

export default PopularBrands;

const Separator = () => {
  return <View className="h-full w-px bg-slate-200" />;
};
