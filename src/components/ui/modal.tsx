import React, { ReactNode } from "react";
import Text from "./text";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Pressable,
  Modal as RNModal,
  TouchableNativeFeedback,
} from "react-native";

interface Props {
  title?: string;
  open: boolean;
  children: ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ open, setOpen, children, title }: Props) => {
  return (
    <RNModal
      animationType="fade"
      transparent
      visible={open}
      onRequestClose={() => setOpen(false)}
    >
      <View className="flex-1 items-center justify-center">
        <View
          style={{ width: "90%" }}
          className="rounded-lg border border-gray-300 bg-white px-4 pb-5"
        >
          {/* HEADER */}
          {title && (
            <View className="mb-5 flex-row items-center justify-between border-b border-b-gray-200 py-5">
              <View>
                <Text style={{ fontSize: 15 }}>{title}</Text>
              </View>
              <TouchableNativeFeedback
                onPress={() => setOpen(false)}
                background={TouchableNativeFeedback.Ripple("#e0e0e0", false)}
              >
                <View>
                  <Ionicons name="close-outline" size={26} color="#333" />
                </View>
              </TouchableNativeFeedback>
            </View>
          )}

          {/* BODY */}
          {children}
        </View>

        {/* BLACK BACKGROUND TO CLOSE MODAL */}
        <Pressable
          onPress={() => setOpen(false)}
          className="absolute -z-10 h-screen w-screen"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
        />
      </View>
    </RNModal>
  );
};

export default Modal;
