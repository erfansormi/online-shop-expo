import React, { ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { useUserStore } from "@/store/user-store";
import Container from "@/components/common/container";
import ProfilePanel from "./profile-panel";
import LoadingScreen from "@/components/common/loading-screen";
import { BottomNavigationHeight } from "@/utils/constants/styles";
import BottomNavigation from "@/components/layout/bottom-navigation";

const ProfileLayout = ({ children }: { children?: ReactNode }) => {
  const { user } = useUserStore();

  if (!user) return <LoadingScreen />;
  return (
    <Container withStatusBarOffset className="pt-2">
      <ScrollView showsVerticalScrollIndicator={false}>
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
