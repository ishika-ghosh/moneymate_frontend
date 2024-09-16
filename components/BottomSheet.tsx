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
  setBudget,
  setSubmit,
  budget,
}:BottomSheetProps) {
  const [input, setInput] = useState(String(budget));
  return (
    <Pressable
      className="flex-1 absolute top-0 left-0 w-full h-full items-center justify-end z-100"
      style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
      onPress={() => setShowModal(false)}
    >
      <Pressable className="h-[40%] w-full">
        <Animated.View
          entering={FadeInDown}
          exiting={FadeOutDown}
          className="h-full w-full bg-gray-80 rounded-t-3xl px-4 py-2 flex items-center z-50"
        >
          <TouchableOpacity onPress={() => setShowModal(false)}>
            <Entypo name="chevron-thin-down" size={30} color={"white"} />
          </TouchableOpacity>

          <Text className="text-lg text-center text-gray-10 font-semibold">
            Whould You like to add a monthly plan for this category?
          </Text>
          <TextInput
            className="text-md border-gray-10 text-gray-10 border-[1px] p-2 rounded-xl w-full mt-3"
            keyboardType="numeric"
            placeholder="Add Budget"
            placeholderTextColor={"white"}
            onChangeText={(e) => setInput(e)}
            value={input}
          />
          <TouchableOpacity
            className="mt-2 py-3 w-full border-[1px] rounded-3xl border-primary-100"
            onPress={() => {
              setShowModal(false);
              setSubmit(true);
            }}
          >
            <Text className="text-center text-primary-100 text-lg font-bold">
              Skip It For Now
            </Text>
          </TouchableOpacity>
          {input.length > 0 && (
            <TouchableOpacity
              className="mt-2 py-3 w-full border-[1px] rounded-3xl border-primary-100 bg-primary-100"
              onPress={() => {
                setBudget(Number(input));
                setShowModal(false);
                setSubmit(true);
              }}
            >
              <Text className="text-center text-gray-10 text-lg font-bold">
                Add Budget
              </Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </Pressable>
    </Pressable>
  );
}
