import { View, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";

export default function BarChartView({barData}:any) {
  return (
    <View className="flex items-center m-5 bg-transparent w-[90%] pt-3 mb-20">
      <Text className="text-gray-10 text-lg font-bold mb-10 ">
        Monthly Expense Analysis
      </Text>
      <View className="w-full rounded-lg mb-10">
        <BarChart
          height={300}
          initialSpacing={15}
          yAxisTextStyle={{ color: "lightgray" }}
          xAxisLabelTextStyle={{ color: "lightgray", fontSize: 15 }}
          barWidth={15}
          noOfSections={3}
          spacing={40}
          roundedBottom
          roundedTop
          frontColor="lightgray"
          data={barData}
          yAxisThickness={0}
          xAxisThickness={0}
          hideRules
          showLine
          lineConfig={{
            curved: true,
            color: "#FFFFFF",
            dataPointsColor: "#FFFFFF",
          }}
          renderTooltip={(item:any, index:any) => {
            return (
              <View
                style={{
                  marginBottom: -70,
                  marginLeft: -12,
                  backgroundColor: item.frontColor,
                  paddingHorizontal: 6,
                  paddingVertical: 4,
                  borderRadius: 4,
                }}
              >
                <Text>{item?.amount}</Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}
