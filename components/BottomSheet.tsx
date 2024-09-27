import {
  Text,
  TouchableOpacity,
  Pressable,
  TextInput,
  View,
} from "react-native";
import { FadeInDown, FadeOutDown } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { BottomSheetProps } from "@/types/type";

export default function BottomSheet({
  setShowModal,
  title,
  children
}:any) {
  
  return (
    <Pressable
      className="flex-1 absolute top-0 left-0 w-full h-full items-center justify-end z-100"
      style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
      onPress={setShowModal}
    >
      <Pressable className="h-[40%] w-full">
        <Animated.View
          entering={FadeInDown}
          exiting={FadeOutDown}
          className="h-full w-full bg-gray-80 rounded-t-3xl px-4 py-2 flex items-center z-50"
        >
          <TouchableOpacity onPress={setShowModal}>
            <Entypo name="chevron-thin-down" size={30} color={"white"} />
          </TouchableOpacity>

          <Text className="text-lg text-center text-gray-10 font-semibold">
            {title}
          </Text>
          {children}
        </Animated.View>
      </Pressable>
    </Pressable>
  );
}
