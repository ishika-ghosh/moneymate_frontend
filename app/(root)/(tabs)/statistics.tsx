import { View, Text, ScrollView } from "react-native";
import React from "react";
import { PieChartView } from "@/components/statistics/PieChartView";
import BarChartView from '../../../components/statistics/BarChart';

export default function StatisticsScreen() {
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center" }}
    >
      <Text className="text-xl mb-5 text-gray-10 font-JakartaBold">Statistics</Text>
      <PieChartView />
      <BarChartView />
    </ScrollView>
  );
}
