import { PieChart } from "react-native-gifted-charts";
import { View, Text } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";

export const PieChartView = () => {
  
  const pieData = [
    {
      id: 1,
      value: 30,
      color: "#009FFF",
      focused: true,
      category: "FOOD",
    },
    {
      id: 2,
      value: 40,
      color: "#93FCF8",
      category: "Transport",
    },
    {
      id: 3,
      value: 15,
      color: "#BDB2FA",
      category: "Flat",
    },
    {
      id: 4,
      value: 15,
      color: "#FFA5BA",
      category: "Electricity",
    },
  ];
  var items = pieData.filter((value) => value.focused === true)[0];
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
          focusedPieIndex={2}
          donut
          showGradient
          sectionAutoFocus
          focusOnPress
          onPress={(item:any, i:any) => (items = item)}
          showValuesAsLabels
          radius={90}
          innerRadius={60}
          innerCircleColor={"#090017"}
          toggleFocusOnPress={false}
          shadow={true}
          shadowColor="#c1c1cd"
          shadowWidth={2}
          centerLabelComponent={() => {
            return (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  elevation: 10,
                }}
              >
                <Text className="text-gray-10 text-2xl font-bold">
                  {items?.value}%
                </Text>
                <Text className="font-medium text-gray-20 text-md">
                  {/* {items?.value ? items.value + "%" : null} */}
                  {items?.category}
                </Text>
              </View>
            );
          }}
        />
        <View className="w-full pt-3 px-7">
          {pieData?.map((item) => (
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
