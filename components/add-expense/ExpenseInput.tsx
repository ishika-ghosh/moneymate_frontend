import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Animated, { FadeInLeft } from "react-native-reanimated";
import CustomButton from "../CustomButton";

export default function ExpenseInput({ details, setDetails, handleSubmit }:any) {
  return (
    <Animated.View className="px-5 mt-5" entering={FadeInLeft.duration(2000)}>
      <TextInput
        className="text-md border-gray-40 text-gray-10 border-[1px] p-3 w-full rounded-xl"
        placeholder="Description"
        placeholderTextColor={"#83839c"}
        onChangeText={(e) => setDetails({ ...details, desc: e })}
        value={details.desc}
      />

      <TextInput
        className="text-md border-gray-40 text-gray-10 border-[1px] p-3 rounded-xl w-full mt-5"
        placeholder="Avg Amount"
        placeholderTextColor={"#83839c"}
        onChangeText={(e) => setDetails({ ...details, amt: e })}
        value={String(details.amt)}
        keyboardType="numeric"
      />
      <CustomButton title="Submit" onPress={handleSubmit} className="mt-10"/>
    </Animated.View>
  );
}
