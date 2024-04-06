import Hr from "../../components/ui/hr";
import React, { useEffect, useState } from "react";
import TopBanners from "./components/top-banners";
import Navbar from "../../components/layout/navbar";
import FourthBanner from "./components/fourth-banner";
import { MainPageResponse } from "../../types/main-page";
import ProductsSlider from "../../components/sliders/products-slider";
import { ScrollView, View } from "react-native";
import SupermarketAmazing from "./components/supermarket-amazing";
import MainCategories from "./components/main-categories";
import PopularBrands from "./components/popular-brands";
import BottomNavigation from "@/components/layout/bottom-navigation";
import LoadingScreen from "@/components/common/loading-screen";
import { BottomNavigationHeight } from "@/utils/constants/styles";

const Home = () => {
  const [data, setData] = useState<MainPageResponse | null>(null);

  useEffect(() => {
    const fetcher = async () => {
      const data = await fetch(
        process.env.EXPO_PUBLIC_BASE_URL + "/api/v1/home-data",
      );
      const res = await data.json();
      setData(res);
    };
    fetcher();
  }, []);

  return (
    <>
      {!data ? (
        <LoadingScreen />
      ) : (
        <View className="flex-1">
          <Navbar />

          <ScrollView>
            <View
              className="space-y-10"
              style={{ paddingBottom: BottomNavigationHeight }}
            >
              <Hr />
              <TopBanners />
              <ProductsSlider products={data.most_discount} />

              <SupermarketAmazing />
              <FourthBanner />
              <MainCategories />
              <PopularBrands />

              {/* <ProductsSlider products={data.cheapest} /> */}
              {/* <ProductsSlider products={data.highest_rate} /> */}
            </View>
          </ScrollView>

          <BottomNavigation />
        </View>
      )}
    </>
  );
};

export default Home;
