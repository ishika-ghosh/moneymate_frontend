import { View, Text } from "react-native";
import { CircularProgressBase } from "react-native-circular-progress-indicator";

export default function HomeStatistics({category,total}:any) {
  const props = {
    activeStrokeWidth: 10,
    inActiveStrokeWidth: 15,
    inActiveStrokeOpacity: 0,
  };
  return (
    <View className="w-full h-auto bg-gray-80 flex items-center pt-3 rounded-b-3xl">
      {category.length>2?<>
      <CircularProgressBase
        {...props}
        value={(category[0]?.scaledAmount)}
        radius={110}
        activeStrokeColor={"#904aff"}
        activeStrokeSecondaryColor={"#cbb0f7"}
      >
        <CircularProgressBase
          {...props}
          value={(category[1]?.scaledAmount)}
          radius={95}
          activeStrokeColor={"#00fad9"}
          activeStrokeSecondaryColor={"#cdf7f2"}
        >
          <CircularProgressBase
            {...props}
            value={(category[2]?.scaledAmount)}
            radius={80}
            activeStrokeColor={"#ff7966"}
            activeStrokeSecondaryColor={"#faa79b"}
          >
            <Text className="text-[30px] text-gray-10 font-bold">₹{total}</Text>
            <Text className="text-gray-20">This Day</Text>
          </CircularProgressBase>
        </CircularProgressBase>
      </CircularProgressBase>
      <View className="w-full h-auto py-5 px-10 flex flex-row gap-3 items-center justify-between">
        <View className="flex items-center justify-around bg-gray-90 px-4 py-2 rounded-lg border-b-[1px] border-[#904aff] ">
          <Text className="text-gray-30 text-[12px] font-medium">{category[0]?.category}</Text>
          <Text className="text-gray-10 font-bold">₹ {category[0]?.totalAmount}</Text>
        </View>
        <View className="flex items-center justify-center bg-gray-90 px-4 py-2 rounded-lg border-b-[1px] border-[#00fad9]">
          <Text className="text-gray-30 text-[12px] font-medium">{category[1]?.category}</Text>
          <Text className="text-gray-10 font-bold">₹ {category[1]?.totalAmount}</Text>
        </View>
        <View className="flex items-center justify-center bg-gray-90 px-4 py-2 rounded-lg border-b-[1px] border-[#ff7966]">
          <Text className="text-gray-30 text-[12px] font-medium">{category[2]?.category}</Text>
          <Text className="text-gray-10 font-bold">₹ {category[2]?.totalAmount}</Text>
        </View>
      </View>
      </>:
      <View className="px-5">
        <Text className="text-2xl font-JakartaBold text-gray-10 text-center mt-10">Welcome to MoneyMate</Text>
        <Text className="p-4 text-center text-gray-20 mt-2 mb-9">Start by creating a category to organize your expenses. Add your expenses and track them with detailed daily and monthly statistical analysis. For shared budgets, manage group expenses seamlessly and get automatic calculations on how much each person owes.</Text>
      </View>}
    </View>
  );
}
