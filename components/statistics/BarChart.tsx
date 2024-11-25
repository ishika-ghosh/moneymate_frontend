import { View, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";

export default function BarChartView({ barData }: any) {
  return (
    <View className="flex items-center m-5 bg-transparent w-[90%] pt-3 mb-20">
      <Text className="text-gray-10 text-lg font-bold mb-10 ">
        Monthly Expense Analysis
      </Text>
      <View className="w-full rounded-lg mb-10 h-screen">
        <BarChart
          height={200}
          initialSpacing={15}
          yAxisTextStyle={{ color: "lightgray" }}
          xAxisLabelTextStyle={{ color: "lightgray", fontSize: 15 }}
          barWidth={15}
          noOfSections={3}
          spacing={40}
          roundedTop
          frontColor="lightgray"
          data={barData}
          yAxisThickness={1}
          xAxisThickness={1}
          xAxisColor={"#ffffff"}
          yAxisColor={"#ffffff"}
          hideRules
          lineConfig={{
            curved: true,
            color: "#FFFFFF",
            dataPointsColor: "#FFFFFF",
          }}
          showValuesAsTopLabel
          topLabelTextStyle={{
            color: "white",

          }}
        />
      </View>
    </View>
  );
}
