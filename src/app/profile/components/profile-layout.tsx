import { AxiosError } from "axios";
import { router } from "expo-router";
import ProfilePanel from "./profile-panel";
import { getUserInfo } from "@/services/auth";
import { useUserStore } from "@/store/user-store";
import Container from "@/components/common/container";
import reactotron from "reactotron-react-native";
import { useCartStore } from "@/store/cart-store";
import React, { ReactNode, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import LoadingScreen from "@/components/common/loading-screen";
import { BottomNavigationHeight } from "@/utils/constants/styles";
import BottomNavigation from "@/components/layout/bottom-navigation";
import { useActivitiesApi } from "@/hooks/fetching/profile";

const ProfileLayout = ({ children }: { children?: ReactNode }) => {
  const { mutate } = useActivitiesApi();
  const { user, setUser } = useUserStore();
  const cartSetter = useCartStore.setState;
  const [refreshing, setRefreshing] = useState(false);

  if (!user) return <LoadingScreen />;
  return (
    <Container withStatusBarOffset className="pt-2">
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              mutate();
              const fetchData = async () => {
                await getUserInfo()
                  .then((res) => {
                    setUser(res.data);
                    cartSetter(res.data.cart as any);
                  })
                  .catch((err: AxiosError<any>) => {
                    reactotron.log(err.response?.data);

                    setUser(null);
                    router.navigate("/auth/login");
                    return;
                  })
                  .finally(() => {
                    setRefreshing(false);
                  });
              };

              fetchData();
            }}
          />
        }
      >
        <View style={{ paddingBottom: BottomNavigationHeight + 20 }}>
          <ProfilePanel />
          {children}
        </View>
      </ScrollView>

      <BottomNavigation />
    </Container>
  );
};

export default ProfileLayout;
