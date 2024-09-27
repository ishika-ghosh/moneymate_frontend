import { Alert, ScrollView } from "react-native";
import React, { useState } from "react";
import CategorySlider from "@/components/add-expense/CategorySlider";
import ExpenseInput from "@/components/add-expense/ExpenseInput";
import { useAuth } from "@clerk/clerk-expo";
import axios from "axios";
import { useUserInfoStore } from "@/store";
import { router } from "expo-router";
import Loading from "@/components/Loading";
import { baseUrl } from "@/constants";


export default function AddExpenseScreen() {
  const {getToken}=useAuth();
  const {userExpenseList,setExpenseList,setPieChartData,userCreatedAt}=useUserInfoStore()
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [details, setDetails] = useState<any>({
    desc: "",
    amt: "",
  });
  const [loading,setLoading]=useState<boolean>(false)
  const handleSubmit = async() => {
    if(details.amt.length===0 || !selectedCategory){
      Alert.alert("Fill correctly","Amount is required")
      return
    }
    const token=await getToken();
    try {
      setLoading(true)
      const {data}=await axios.post(`${baseUrl}/expenses`,{desc:details.desc,amount:Number(details.amt),category:selectedCategory},{
        headers:{
          Authorization:`bearer ${token}`
        }
      })
      const {data:{data:{scaledData,totalSum},barChartData}}=await axios.get(`${baseUrl}/analytics?startdate=${userCreatedAt}`,{
        headers:{
          Authorization:`bearer ${token}`
        }})
      setExpenseList({expenseList:[...userExpenseList,data]})
      setPieChartData({list:scaledData,total:totalSum,barchartData:barChartData})
      setDetails({
        desc: "",
        amt: "",
      })
      setSelectedCategory(null)
      router.push("/(root)/(tabs)/home")
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  };

  return (
    loading?<Loading/>:
    <ScrollView>
      <CategorySlider
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ExpenseInput
        details={details}
        setDetails={setDetails}
        handleSubmit={handleSubmit}
      />
    </ScrollView>
  );
}
