import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { PieChartView } from "@/components/statistics/PieChartView";
import BarChartView from '../../../components/statistics/BarChart';
import { useUserInfoStore } from "@/store";
import { colors } from "@/constants";
import Loading from "@/components/Loading";

export default function StatisticsScreen() {
  const {pieChartData,todaysTotal,barChartData}=useUserInfoStore()
  const [formedPieChatData,setformedPieChatData]=useState<any>([])
  const [formatedBarChartData,serFormatedBarChartData]=useState<any>([])
  const [loading,setLoading]=useState<boolean>(false)
  useEffect(()=>{
    setLoading(true)
    const transformedBarChatData=barChartData.map((item:any, index:any)=>({
          id: index + 1,
          frontColor: "#91E3E3",
          value: Math.round(item?.totalAmount/1000),
          amount:item?.totalAmount,
          sideColor: colors[index % colors.length],
          label: `${item.month.trim()}`
    }))
    serFormatedBarChartData(transformedBarChatData)
    const transformedData = pieChartData.map((item:any, index:any) => ({
          id: index + 1,
          value: item.scaledAmount,
          color: colors[index % colors.length],
          category: item.category.trim().toUpperCase()
        }));
    setformedPieChatData(transformedData)    
    setLoading(false)    
  },[pieChartData])
  return (
    loading?<Loading/>:
    <ScrollView
      contentContainerStyle={{ alignItems: "center" }}
    >
      <Text className="text-xl mb-5 text-gray-10 font-JakartaBold">Statistics</Text>
      {formedPieChatData.length>0 && <PieChartView pieData={formedPieChatData} total={todaysTotal}/>}
      {formatedBarChartData.length>0 && <BarChartView barData={formatedBarChartData}/>}
    </ScrollView>
  );
}
