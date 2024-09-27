import { PieChart } from "react-native-gifted-charts";
import { View, Text } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";

export const PieChartView = ({pieData,total}:any) => {
  
  return (
    <View className="w-full items-center">
      <View
        style={{ alignItems: "center"}}
        className="w-[90%] pt-5 rounded-3xl border-[0.2px]"
      >
        <Text className="text-center mb-4 text-lg text-gray-10 font-bold">
          Category wise Expense Analysis
        </Text>
        <PieChart
          data={pieData}
          donut
          showGradient
          sectionAutoFocus
          focusOnPress
          showValuesAsLabels
          radius={90}
          innerRadius={60}
          innerCircleColor={"#090017"}
          toggleFocusOnPress={false}
          shadow={true}
          shadowColor="#c1c1cd"
          shadowWidth={2}
          centerLabelComponent={()=>
              <View style={{
                  justifyContent: "center",
                  alignItems: "center",
                  elevation: 10,
                }}>
                  <Text className="text-gray-10">Today</Text>
                  <Text className="text-gray-10">₹{total}</Text>
                </View>}
        />
        <View className="w-full pt-3 px-7">
          {pieData?.map((item:any) => (
            <View
              key={item.id}
              className={
                "w-full flex flex-row mb-3 items-center  rounded-2xl p-2 justify-between "
              }
            >
              <View className="flex flex-row items-center h-full">
                <View
                  className="w-6 h-6 rounded-2xl border-[0.5px] border-gray-20"
                  style={{ backgroundColor: item.color }}
                />
                <Text className="ml-3 text-gray-10 font-semibold">
                  {item.category}
                </Text>
              </View>
              <Text className="text-gray-10 font-bold text-md">
                {item.value}%
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};
