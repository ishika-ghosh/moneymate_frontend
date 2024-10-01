import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";


export default function SharedBudgetHeader() {
  return (
    <View className="flex items-center py-5 rounded-b-xl">
      <Text className="text-center text-lg text-gray-10 font-light">
        Find The budgets that are shared with you
      </Text>
      <TouchableOpacity
        className="p-2 rounded-xl bg-primary-100 mt-4"
        onPress={() =>router.push("/(root)/null")}
      >
        <Text className="font-medium text-gray-10">
          Create a Budget with your friends
        </Text>
      </TouchableOpacity>
    </View>
  );
}
