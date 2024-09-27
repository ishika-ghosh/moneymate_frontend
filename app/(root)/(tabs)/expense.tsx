import { Text, ScrollView, TouchableOpacity, Alert,TextInput } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@clerk/clerk-expo";
import axios from "axios";
import moment from "moment";
import { useUserInfoStore } from "@/store";
import ExpenseList from "@/components/expense/ExpenseList";
import { ExpenseHeader } from "@/components/expense/ExpenseHeader";
import Loading from "@/components/Loading";
import { router } from "expo-router";
import BottomSheet from "@/components/BottomSheet";
import { baseUrl } from "@/constants";
import CustomButton from "@/components/CustomButton";

export default function ExpenseScreen() {
  const {getToken}=useAuth()
  const {userCreatedAt,userExpenseList,setExpenseList,setPieChartData,}=useUserInfoStore()
  const startDate = moment(userCreatedAt,"DD/MM/YYYY");
  const monthList = Array.from({ length: moment().diff(startDate, 'months') + 1 }, (_, i) =>
    startDate.clone().add(i, 'months').format("MMMM YYYY")
);
  const [expenseList,setLocalExpenseList]=useState<Array<any>>(userExpenseList)
  const [months, setMonths] = useState<any>(monthList.reverse());
  const [dateList, setDateList] = useState<any>([]);
  const [currentDay, setCurrentDay] = useState<any>(moment().format("DD/MM/YYYY"));
  const [monthValue, setMonthValue] = useState<any>(months[0]);
  const [openDropDown, setOpenDropDown] = useState<any>(false);
  const [loading,setLoading]=useState<boolean>(false)
  const [showupdateModal,setShowUpdateModal]=useState<boolean>(false)
  const [selectedExpense,setSelectedExpense]=useState<any>(null)
  const flatListRef = useRef<any>(null);
  useEffect(() => {
    const list = getDateList(monthValue,userCreatedAt);
    // const list=getDatesFromStartOfMonth(monthValue,userCreatedAt)
    setLocalExpenseList(userExpenseList)
    setDateList(list);
    setCurrentDay(list[0].date);
  }, [monthValue,userExpenseList]);

  const scrollToBeginning = () => {
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  };
  const handleMonthSelection = (val:string) => {
    setMonthValue(val);
    scrollToBeginning();
    setOpenDropDown(false);
  };
  const fetchExpenses=async(date:any)=>{
    try {
      setLoading(true)
      const token=await getToken();
      setCurrentDay(date)
      const {data}=await axios.get(`${baseUrl}/expenses?date=${date}`,{
        headers:{
          Authorization:`bearer ${token}`
        }
      })
      setLocalExpenseList(data)
      
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  const deleteItem=async(item:any)=>{
    const token=await getToken()
    try {
      setLoading(true)
      const {data}=await axios.delete(`${baseUrl}/expenses/${item._id}`,{
        headers:{
          Authorization:`bearer ${token}`
        }
      })
      Alert.alert("success",data?.message)
      setLocalExpenseList(expenseList.filter((_item)=>_item._id!== item._id))
      if(currentDay===moment().format("DD/MM/YYYY")){
        setExpenseList({expenseList:expenseList.filter((_item)=>_item._id!== item._id)})
        const {data:{data:{scaledData,totalSum},barChartData}}=await axios.get(`${baseUrl}/analytics?startdate=${userCreatedAt}`,{
        headers:{
          Authorization:`bearer ${token}`
        }})
        setPieChartData({list:scaledData,total:totalSum,barchartData:barChartData})
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
    
  }
  const updateItem=async(item:any)=>{
    const token=await getToken()
    setShowUpdateModal(false)
    setLoading(true)
    try {
      const {data}=await axios.put(`${baseUrl}/expenses/${item._id}`,{
        amount:item.amount,
        desc:item.desc
      },{
        headers:{
          Authorization:`bearer ${token}`
        }
      })
      setLocalExpenseList(expenseList.map((_item)=>_item._id===data._id?data:_item))
      if(currentDay===moment().format("DD/MM/YYYY")){
        setExpenseList({expenseList:expenseList.map((_item)=>_item._id===data._id?data:_item)})
        const {data:{data:{scaledData,totalSum},barChartData}}=await axios.get(`${baseUrl}/analytics?startdate=${userCreatedAt}`,{
        headers:{
          Authorization:`bearer ${token}`
        }})
        setPieChartData({list:scaledData,total:totalSum,barchartData:barChartData})
      }
    } catch (error) {
      console.log(error)
    }
    setSelectedExpense(null)
    setLoading(false)
  }
  const handleClose=()=>{
    setShowUpdateModal(false)
    setSelectedExpense(null)
  }
  return (
    <GestureHandlerRootView>
      <ScrollView className="mb-12" nestedScrollEnabled={true}>
        <ExpenseHeader
          monthValue={monthValue}
          // setMonthValue={setMonthValue}
          currentDay={currentDay}
          handleDateChange={(date:any)=>fetchExpenses(date)}
          dateList={dateList}
          ref={flatListRef}
          setOpenDropDown={setOpenDropDown}
          openDropDown={openDropDown}
        />{

        }
        {loading?<Loading/>:
        <ExpenseList 
          expenseList={expenseList} 
          deleteItem={deleteItem} 
          updateItem={(item:any)=>{
            setSelectedExpense({
              _id:item._id,
              category:item.category.name,
              amount:item.amount,
              desc:item.desc
            })
            setShowUpdateModal(true)
          }}/>}
        {openDropDown && months.length>1 &&(
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            className="absolute w-32 h-auto bg-gray-100 top-[18%] left-[60%] rounded-3xl border-[0.5px] border-gray-20"
          >
            {months.map((month:string, i:number) => (
              <TouchableOpacity
                key={i}
                onPress={() => handleMonthSelection(month)}
              >
                <Text className="text-center text-gray-10 p-2 py-3">
                  {month.split(" ")[0]}
                </Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        )}
      </ScrollView>
        {showupdateModal && selectedExpense && 
          <BottomSheet setShowModal={handleClose} title={`Update Your expense from ${selectedExpense.category} category`}>
            <TextInput
            className="text-md border-gray-10 text-gray-10 border-[0.5px] p-1 rounded-md w-full mt-2 px-2"
            keyboardType="numeric"
            placeholder="Expense Amount"
            placeholderTextColor={"white"}
            onChangeText={(e) => {setSelectedExpense({...selectedExpense,amount:Number(e)})}}
            value={String(selectedExpense?.amount)}
          />
            <TextInput
            className="text-md border-gray-10 text-gray-10 border-[0.5px] p-1 rounded-md w-full mt-3 px-2"
            placeholder="Expense Desc"
            placeholderTextColor={"white"}
            onChangeText={(e)=>{setSelectedExpense({...selectedExpense,desc:e})}}
            value={selectedExpense?.desc}
          />
          <CustomButton title="Update this expense" className="mt-2 rounded-md" onPress={()=>updateItem(selectedExpense)}/>
          </BottomSheet>}
    </GestureHandlerRootView>
  );
}

const getDateList = (month:string,startDate:string) => {
  const start = moment(startDate, "DD/MM/YYYY")
  if (month=== moment().format("MMMM YYYY")) {
    const today = Number(moment().format("D"));
    const days = [];
    for (let i = today; i >= 1; i--) {
      const date = moment(`${month}-${i}`, "MMMM-D");
      if(date.isSameOrAfter(start)){
        days.push({
          date: date.format("DD/MM/YYYY"),
          day: date.format("ddd"),
        });

      }
    }

    return days;
  } else {
    const daysInMonth = moment(`${month}`, "MMMM YYYY").daysInMonth();
    const days = [];
    for (let i = daysInMonth; i >= 1; i--) {
      const date = moment(`${month}-${i}`, "MMMM-D");
      days.push({
        date: date.format("DD/MM/YYYY"),
        day: date.format("ddd"),
      });
    }

    return days;
  }
};
// function getDatesFromStartOfMonth(monthYear:string, startDate:string) {
//   const start = moment(startDate, "DD/MM/YYYY");   // Start date
//   const monthStart = moment(monthYear, "MMMM YYYY"); // Given month
//   const today = moment(new Date());
//   console.log(today.format('DD/MM/YYYY'))
//   // console.log(new Date().getDate())
//   // If the start date is after today's date or after the last date of the given month, return an empty array
//   if (start.isAfter(today) || start.isAfter(monthStart.endOf('month'))) {
//     return [];
//   }

//   const result = [];
//   const daysInMonth = monthStart.daysInMonth();
//   // Loop through all days of the given month, but not beyond today
//   for (let day = 1; day <= daysInMonth; day++) {
//     const currentDay = monthStart.clone().date(day);
//     console.log(currentDay.isSameOrBefore(today),currentDay.format('DD/MM/YYYY'))
//     // Only consider days after the start date and not beyond today
//     if (currentDay.isAfter(start) && currentDay.isSameOrBefore(today)) {
//       result.push({
//         date: currentDay.format("DD/MM/YYYY"),
//         day: currentDay.format("ddd")
//       });
//     }
//   }
//   return result.reverse();
// }


