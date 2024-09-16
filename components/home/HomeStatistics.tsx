import { View, Text } from "react-native";
import { CircularProgressBase } from "react-native-circular-progress-indicator";

export default function HomeStatistics() {
  const props = {
    activeStrokeWidth: 10,
    inActiveStrokeWidth: 15,
    inActiveStrokeOpacity: 0,
  };
  return (
    <View className="w-full h-auto bg-gray-80 flex items-center pt-3 rounded-b-3xl">
      <CircularProgressBase
        {...props}
        value={70}
        radius={110}
        activeStrokeColor={"#904aff"}
        activeStrokeSecondaryColor={"#cbb0f7"}
      >
        <CircularProgressBase
          {...props}
          value={65}
          radius={95}
          activeStrokeColor={"#00fad9"}
          activeStrokeSecondaryColor={"#cdf7f2"}
        >
          <CircularProgressBase
            {...props}
            value={55}
            radius={80}
            activeStrokeColor={"#ff7966"}
            activeStrokeSecondaryColor={"#faa79b"}
          >
            <Text className="text-[30px] text-gray-10 font-bold">₹50000</Text>
            <Text className="text-gray-20">This month</Text>
          </CircularProgressBase>
        </CircularProgressBase>
      </CircularProgressBase>
      <View className="w-full h-auto py-5 px-10 flex flex-row gap-3 items-center justify-between">
        <View className="flex items-center justify-around bg-gray-90 px-4 py-2 rounded-lg border-b-[1px] border-[#904aff] ">
          <Text className="text-gray-30 text-[12px] font-medium">Today</Text>
          <Text className="text-gray-10 font-bold">₹ 1000</Text>
        </View>
        <View className="flex items-center justify-center bg-gray-90 px-4 py-2 rounded-lg border-b-[1px] border-[#00fad9]">
          <Text className="text-gray-30 text-[12px] font-medium">Today</Text>
          <Text className="text-gray-10 font-bold">₹ 1000</Text>
        </View>
        <View className="flex items-center justify-center bg-gray-90 px-4 py-2 rounded-lg border-b-[1px] border-[#ff7966]">
          <Text className="text-gray-30 text-[12px] font-medium">Today</Text>
          <Text className="text-gray-10 font-bold">₹ 1000</Text>
        </View>
      </View>
    </View>
  );
}
