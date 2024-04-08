import React from "react";
import { View } from "react-native";
import Text from "@/components/ui/text";
import Card from "@/components/ui/card";
import ProfilePanel from "../profile-panel";
import { useUserStore } from "@/store/user-store";
import Container from "@/components/common/container";
import LoadingScreen from "@/components/common/loading-screen";
import BottomNavigation from "@/components/layout/bottom-navigation";
import ChangeNameModal from "./change-name-modal";

const PersonalInfo = () => {
  const { user } = useUserStore();

  if (!user) return <LoadingScreen />;
  return (
    <Container withStatusBarOffset className="mt-2">
      <ProfilePanel />

      <Card className="p-0">
        <View className="flex-row items-center justify-between p-5">
          <View className="gap-y-3">
            <Text>نام و نام خانوادگی</Text>
            <View className="flex-row">
              <Text>
                {user.first_name} {user.last_name}
              </Text>
            </View>
          </View>

          <View>
            <ChangeNameModal />
          </View>
        </View>
      </Card>

      <BottomNavigation />
    </Container>
  );
};

export default PersonalInfo;
