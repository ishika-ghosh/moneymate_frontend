import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";

export default function SharedBudgetList() {
  return (
    <View className="px-3">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
        <SharedBudget key={item} name={item} />
      ))}
    </View>
  );
}
const SharedBudget = ({ name }:any) => (
  <View className="px-3 border-[1px] h-20 w-full rounded-xl bg-gray-80 mt-4 flex flex-row items-center justify-between">
    <FontAwesome name="group" size={30} color="white" />
    <View className="w-[80%] h-full py-3">
      <Text className="text-gray-10 font-medium text-lg">
        Created By- <Text className="font-extrabold text-lg">{name}</Text> with
        3 others
      </Text>
      <Text className="text-gray-20 font-light text-md">
        Created At : {moment().format("MMMM Do YYYY")}
      </Text>
    </View>
  </View>
);
