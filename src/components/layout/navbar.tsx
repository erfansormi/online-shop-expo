import React from "react";
import { Feather } from "@expo/vector-icons";
import { StatusBar, TextInput, View } from "react-native";

const Navbar = () => {
  return (
    <View
      style={{ marginTop: StatusBar.currentHeight }}
      className="justify-end px-3 py-2"
    >
      <View className="relative">
        <TextInput
          cursorColor={"#888"}
          placeholderTextColor={"#999"}
          placeholder="جستجو در بهمان کالا"
          className="flex h-10 flex-row justify-center rounded-md bg-gray-200/70 pl-10 pr-3 text-right"
          style={{
            fontFamily: "vazir",
            paddingHorizontal: 0,
            paddingVertical: 0,
          }}
        />
        <View className="absolute left-3 top-2">
          <Feather name="search" size={24} color={"#aaa"} />
        </View>
      </View>
    </View>
  );
};

export default Navbar;
