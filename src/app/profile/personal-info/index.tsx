import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView, TouchableNativeFeedback, View } from "react-native";
import Text from "@/components/ui/text";
import Card from "@/components/ui/card";
import ProfilePanel from "../profile-panel";
import { useUserStore } from "@/store/user-store";
import Container from "@/components/common/container";
import LoadingScreen from "@/components/common/loading-screen";
import BottomNavigation from "@/components/layout/bottom-navigation";
import UpdateNameModal from "./update-name-modal";
import { User } from "@/types/user";
import { BottomNavigationHeight } from "@/utils/constants/styles";
import UpdateEmailModal from "./update-email-modal";
import UpdatePasswordModal from "./update-password-modal";
import UpdateBirthDateModal from "./update-birthdate-modal";

const PersonalInfo = () => {
  const { user } = useUserStore();
  const [nameModal, setNameModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [birthdateModal, setBirthdateModal] = useState(false);

  const modalSetters = {
    name: setNameModal,
    email: setEmailModal,
    password: setPasswordModal,
    birthdate: setBirthdateModal,
  };

  if (!user) return <LoadingScreen />;
  return (
    <Container withStatusBarOffset className="pt-2">
      {/* MODALS */}
      <UpdateNameModal open={nameModal} setOpen={setNameModal} />
      <UpdateEmailModal open={emailModal} setOpen={setEmailModal} />
      <UpdatePasswordModal open={passwordModal} setOpen={setPasswordModal} />
      <UpdateBirthDateModal open={birthdateModal} setOpen={setBirthdateModal} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingBottom: BottomNavigationHeight + 20 }}>
          <ProfilePanel />

          {/* PERSONAL INFO CARD CHANGABLE */}
          <Card
            className="p-0 border-b-0"
            style={{
              height: "auto",
              flex: 0,
            }}
          >
            {personalInfoItems(user).map((item) => (
              <View
                key={item.name}
                className="flex-row items-center justify-between p-5 border-b border-b-gray-200"
              >
                <View className="gap-y-3">
                  {/* TITLE */}
                  <Text size="sm" className="text-gray-500">
                    {item.title}
                  </Text>

                  {/* VALUE */}
                  <View className="flex-row">
                    <Text>{item.value}</Text>
                  </View>
                </View>

                <View>
                  <TouchableNativeFeedback onPress={() => modalSetters[item.name](true)}>
                    <View className="p-3">
                      <AntDesign name="edit" size={24} color="rgb(56, 189, 248)" />
                    </View>
                  </TouchableNativeFeedback>
                </View>
              </View>
            ))}
          </Card>
        </View>
      </ScrollView>

      <BottomNavigation />
    </Container>
  );
};

export default PersonalInfo;

interface PersonalInfoItems {
  title: string;
  value: string | null;
  name: "name" | "email" | "password" | "birthdate";
}

const personalInfoItems: (user: User) => PersonalInfoItems[] = (user) => [
  {
    name: "name",
    title: "نام و نام خانوادگی",
    value: `${user.first_name} ${user.last_name}`,
  },
  {
    name: "email",
    title: "ایمیل",
    value: user.email,
  },
  {
    name: "password",
    title: "رمز عبور",
    value: "•••••••",
  },
  {
    name: "birthdate",
    title: "تاریخ تولد",
    value: user.birth_date ? new Date(user.birth_date).toLocaleDateString("fa") : null,
  },
];
