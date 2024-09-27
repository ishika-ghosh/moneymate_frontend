import { View, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";

export default function BarChartView({barData}:any) {
  // const barData = [
  //   {
  //     value: 230,
  //     label: "Jan",
  //     frontColor: "#4ABFF4",
  //     sideColor: "#23A7F3",

  //   },
  //   {
  //     value: 180,
  //     label: "Feb",
  //     frontColor: "#79C3DB",
  //     sideColor: "#68BCD7",

  //   },
  //   {
  //     value: 195,
  //     label: "Mar",
  //     frontColor: "#28B2B3",
  //     sideColor: "#0FAAAB",

  //   },
  //   {
  //     value: 250,
  //     label: "Apr",
  //     frontColor: "#4ADDBA",
  //     sideColor: "#36D9B2",

  //   },
  //   {
  //     value: 300,
  //     label: "May",
  //     frontColor: "#91E3E3",
  //     sideColor: "#85E0E0",

  //   },
  //   {
  //     value: 200,
  //     label: "Jun",
  //     frontColor: "#91E3E3",
  //     sideColor: "#85E0E0",

  //   },
  //   {
  //     value: 120,
  //     label: "Jul",
  //     frontColor: "#91E3E3",
  //     sideColor: "#85E0E0",

  //   },
  // ];
  return (
    <View className="flex items-center m-5 bg-transparent w-[90%] pt-3 mb-20">
      <Text className="text-gray-10 text-lg font-bold mb-10 ">
        Monthly Expense Analysis
      </Text>
      <View className="w-full rounded-lg mb-10">
        <BarChart
          yAxisLabelSuffix="k"
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
