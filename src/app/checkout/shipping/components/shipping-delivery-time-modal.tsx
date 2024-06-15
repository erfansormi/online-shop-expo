import React, { useEffect, useRef } from "react";
import {
  Animated,
  ScrollView,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import moment from "moment-jalaali";
import Text from "@/components/ui/text";
import Modal from "@/components/ui/modal";
import { colors } from "@/utils/constants/styles";
import { useShippingStore } from "@/store/shipping-store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RadioButton from "@/components/ui/radio-button";

let dates = [];
for (let i = 2; i < 7; i++) {
  dates.push(moment().add(i, "days"));
}
useShippingStore.setState({ activeDateTab: dates[0].date() });

const ShippingSelectDateModal = () => {
  const setter = useShippingStore.setState;
  const { deliverTimeModal, deliveryDate, deliveryHour, activeDateTab } = useShippingStore();
  const setOpen = (value: boolean) => setter({ deliverTimeModal: value });
  const xPos = useRef(new Animated.Value(200)).current;

  useEffect(() => {
    Animated.timing(xPos, {
      toValue: 200,
      duration: 0,
      useNativeDriver: false,
    }).reset();

    Animated.timing(xPos, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [deliverTimeModal]);

  return (
    <Modal
      open={deliverTimeModal}
      setOpen={setOpen as any}
      title="انتخاب بازه زمانی"
      description={
        <View className="flex-row-reverse items-center" style={{ gap: 8 }}>
          <MaterialCommunityIcons name="truck-fast-outline" size={26} color={colors.primary} />
          <Text className="text-gray-500" size="sm">
            ارسال کالاهای معمولی
          </Text>
        </View>
      }
    >
      <View className="pb-3" style={{ gap: 10 }}>
        {/* DATES TABS */}
        <ScrollView
          horizontal
          style={{ width: "100%" }}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ width: "100%", direction: "rtl" }}
        >
          <View className="flex flex-row-reverse items-center justify-between">
            {dates.map((date, i) => (
              <View
                key={date.day()}
                className={`w-1/5 ${date.date() === activeDateTab && "border-b-[3px] border-b-cyan-500"}`}
              >
                <TouchableNativeFeedback
                  onPress={() => {
                    Animated.timing(xPos, {
                      duration: 0,
                      isInteraction: true,
                      useNativeDriver: true,
                      toValue: activeDateTab && activeDateTab > date.date() ? -400 : 200,
                    }).start(({ finished }) => {
                      if (finished) {
                        Animated.timing(xPos, {
                          toValue: 0,
                          duration: 400,
                          useNativeDriver: true,
                        }).start();
                      }
                    });

                    setter({ activeDateTab: date.date() });
                  }}
                >
                  <View className="items-center p-2 rounded-lg">
                    <Text size="sm" className="text-gray-600">
                      {Intl.DateTimeFormat("fa", { weekday: "long" }).format(
                        new Date(date.format()).getTime()
                      )}
                    </Text>

                    <Text className="text-gray-600">{date.jDate()}</Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* HOURS */}
        <Animated.View
          className="px-5"
          style={{
            transform: [{ translateX: xPos }],
          }}
        >
          {hours.map((item, i) => (
            <View
              key={item.title}
              className={`py-3 border-b border-b-gray-200/70 ${i + 1 >= hours.length && "border-b-0"}`}
            >
              <TouchableOpacity
                onPress={() =>
                  setter((get) => ({
                    deliveryHour: item.value,
                    deliveryDate: dates.find((item) => item.date() === get.activeDateTab),
                  }))
                }
              >
                <View className="items-center flex-row-reverse" style={{ gap: 8 }}>
                  <RadioButton
                    isActive={item.value === deliveryHour && deliveryDate?.date() === activeDateTab}
                  />
                  <View className="flex-row-reverse items-center" style={{ gap: 8 }}>
                    <Text size={"sm"}>ساعت</Text>
                    <Text size={"sm"}>{item.title}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ShippingSelectDateModal;

type Hour = { title: string; value: `${number}${"am" | "pm"}-${number}${"am" | "pm"}` };
const hours: Hour[] = [
  { title: "9 تا 12", value: "9am-12am" },
  { title: "12 تا 15", value: "12am-15pm" },
  { title: "15 تا 18", value: "15pm-18pm" },
  { title: "18 تا 21", value: "18pm-21pm" },
];
