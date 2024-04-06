import BottomNavigation from "@/components/layout/bottom-navigation";
import Navbar from "@/components/layout/navbar";
import Text from "@/components/ui/text";
import React from "react";
import { View } from "react-native";

const Products = () => {
  return (
    <View className="flex-1">
      <Navbar />
      <Text className="grow">products</Text>
      <BottomNavigation />
    </View>
  );
};

export default Products;
