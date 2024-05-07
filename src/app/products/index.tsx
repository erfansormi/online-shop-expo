import useSWR from "swr";
import React from "react";
import { Product } from "@/types/main-page";
import { ScrollView, View } from "react-native";
import Navbar from "@/components/layout/navbar";
import Container from "@/components/common/container";
import LoadingScreen from "@/components/common/loading-screen";
import ProductCardV2 from "@/components/common/product-card-v2";
import BottomNavigation from "@/components/layout/bottom-navigation";
import { screenHeight } from "@/utils/dimensions";
import { BottomNavigationHeight } from "@/utils/constants/styles";

const Products = () => {
  const { data, error, isLoading } = useSWR<{
    success: boolean;
    products: Product[];
  }>("/api/v1/products");

  return (
    <View className="flex-1">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        data && (
          <>
            <Navbar />
            <Container screenHeight>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View className="flex-1" style={{ minHeight: screenHeight }}>
                  <View
                    className="flex-row flex-wrap"
                    style={{
                      gap: 10,
                      paddingBottom: BottomNavigationHeight + 10,
                    }}
                  >
                    {data.products.map((item, index) => (
                      <ProductCardV2 key={item._id} product={item} />
                    ))}
                  </View>
                </View>
              </ScrollView>
            </Container>
          </>
        )
      )}
      <BottomNavigation />
    </View>
  );
};

export default Products;
