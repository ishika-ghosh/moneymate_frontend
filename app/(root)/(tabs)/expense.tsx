import { Text, ScrollView, TouchableOpacity, Alert, TextInput, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-expo";
import axios from "axios";
import moment from "moment";
import { useUserInfoStore } from "@/store";
import ExpenseList from "@/components/expense/ExpenseList";
import { ExpenseHeader } from "@/components/expense/ExpenseHeader";
import Loading from "@/components/Loading";
import BottomSheet from "@/components/BottomSheet";
import { baseUrl } from "@/constants";
import CustomButton from "@/components/CustomButton";

export default function ExpenseScreen() {
  const { getToken } = useAuth()
  const { userCreatedAt, userExpenseList, setExpenseList, setPieChartData, } = useUserInfoStore()
  const startDate = String(moment(userCreatedAt, "DD/MM/YYYY"));
  const monthList = getMonthsBetweenDates(startDate)
  const [expenseList, setLocalExpenseList] = useState<Array<any>>([])
  const [months, setMonths] = useState<any>(monthList.reverse());
  const [monthValue, setMonthValue] = useState<any>(months[0]);
  const [currentMonthTotal, setCurrentMonthTotal] = useState<any>(0)
  const [openDropDown, setOpenDropDown] = useState<any>(false);
  const [loading, setLoading] = useState<boolean>(false)
  const [showupdateModal, setShowUpdateModal] = useState<boolean>(false)
  const [selectedExpense, setSelectedExpense] = useState<any>(null)
  const fetchExpenses = async (date: any) => {
    try {
      setLoading(true)
      const token = await getToken();
      const { data } = await axios.get(`${baseUrl}/expenses?date=${date}`, {
        headers: {
          Authorization: `bearer ${token}`
        }
      })
      let total = 0;
      setLocalExpenseList(data)
      data.forEach((expense: any) => {
        total += expense.totalExpense
      });
      setCurrentMonthTotal(total)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  useEffect(() => {
    const date = moment(`${monthValue.split(" ")[0]} ${monthValue.split(" ")[1]}`, 'MMMM YYYY');
    const formattedDate = date.format('MM/YYYY')
    fetchExpenses(formattedDate)
  }, [monthValue, userExpenseList]);

  const handleMonthSelection = (val: string) => {
    setMonthValue(val);
    setOpenDropDown(false);
  };

  const deleteItem = async (item: any, date: any) => {
    const token = await getToken()
    try {
      setLoading(true)
      const { data } = await axios.delete(`${baseUrl}/expenses/${item._id}`, {
        headers: {
          Authorization: `bearer ${token}`
        }
      })
      Alert.alert("success", data?.message)
      let res = expenseList.map(entry => {
        if (entry._id === moment(item.createdAt).format('DD/MM/YYYY')) {
          const updatedExpenses = entry.expenses.filter((exp: any) => exp._id !== item._id);
          const newTotalAmount = updatedExpenses.reduce((sum: any, exp: any) => sum + exp.amount, 0);
          return {
            ...entry,
            expenses: updatedExpenses,
            totalExpense: newTotalAmount,
          };
        }
        return entry;
      });
      setLocalExpenseList(res)
      let total = 0;
      res.forEach((expense: any) => {
        total += expense.totalExpense
      });
      setCurrentMonthTotal(total)
      if (moment(item.createdAt).format("DD/MM/YYYY") === moment(new Date()).format("DD/MM/YYYY")) {
        const expenseDetails = res.find(expense => expense._id === moment(new Date()).format("DD/MM/YYYY"))
        setExpenseList({ expenseList: expenseDetails.expenses })
        const { data: { data: { scaledData, totalSum }, barChartData } } = await axios.get(`${baseUrl}/analytics?startdate=${userCreatedAt}`, {
          headers: {
            Authorization: `bearer ${token}`
          }
        })
        setPieChartData({ list: scaledData, total: totalSum, barchartData: barChartData })
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)

  }
  const updateItem = async (item: any,) => {
    const token = await getToken()
    setShowUpdateModal(false)
    setLoading(true)
    try {
      const { data } = await axios.put(`${baseUrl}/expenses/${item._id}`, {
        amount: item.amount,
        desc: item.desc
      }, {
        headers: {
          Authorization: `bearer ${token}`
        }
      })
      const { _id: expenseId, createdAt } = data;
      let res = expenseList.map(entry => {
        if (entry._id === moment(createdAt).format('DD/MM/YYYY')) {
          const updatedExpenses = entry.expenses.map((exp: any) =>
            exp._id === expenseId ? data : exp
          )
          const newTotalAmount = updatedExpenses.reduce((sum: any, exp: any) => sum + exp.amount, 0);


          return {
            ...entry,
            expenses: updatedExpenses,
            totalExpense: newTotalAmount,
          };
        }
        return entry;
      });
      setLocalExpenseList(res)
      let total = 0;
      res.forEach((expense: any) => {
        total += expense.totalExpense
      });
      setCurrentMonthTotal(total)
      if (moment(data.createdAt).format("DD/MM/YYYY") === moment(new Date()).format("DD/MM/YYYY")) {
        const expenseDetails = res.find(expense => expense._id === moment(new Date()).format("DD/MM/YYYY"))
        setExpenseList({ expenseList: expenseDetails.expenses })
        const { data: { data: { scaledData, totalSum }, barChartData } } = await axios.get(`${baseUrl}/analytics?startdate=${userCreatedAt}`, {
          headers: {
            Authorization: `bearer ${token}`
          }
        })
        setPieChartData({ list: scaledData, total: totalSum, barchartData: barChartData })
      }
    } catch (error) {
      console.log(error)
    }
    setSelectedExpense(null)
    setLoading(false)
  }
  const handleClose = () => {
    setShowUpdateModal(false)
    setSelectedExpense(null)
  }
  return (
    <GestureHandlerRootView>
      <ScrollView className="mb-12" nestedScrollEnabled={true}>
        <ExpenseHeader
          monthValue={monthValue}
          setOpenDropDown={setOpenDropDown}
          openDropDown={openDropDown}
          currentMonthTotal={currentMonthTotal}
        />{

        }
        {loading ? <Loading /> :
          expenseList.length === 0 ?
            <View className="h-1/2">
              <Text className="text-gray-30 font-JakartaMedium text-center mt-10">No expenses to show</Text>
            </View> :
            expenseList.map(({ totalExpense, expenses, _id }) =>
              expenses.length > 0 &&
              <View key={_id} className="flex items-center justify-center">
                <View className="w-[85%] h-10 border-b-[1px] border-b-gray-40 flex flex-row items-center justify-between">
                  <Text className="text-md font-JakartaLight text-gray-20">{moment(_id, 'DD/MM/YYYY').format('Do MMMM YYYY')}</Text>
                  <Text className="text-md font-JakartaBold text-gray-20">₹{totalExpense}</Text>
                </View>
                <ExpenseList
                  expenseList={expenses}
                  deleteItem={deleteItem}
                  updateItem={(item: any, index: number) => {
                    setSelectedExpense({
                      _id: item._id,
                      category: item.category.name,
                      amount: item.amount,
                      desc: item.desc,
                      index: index
                    })
                    setShowUpdateModal(true)
                  }} />
              </View>

            )
        }
        {openDropDown && months.length > 1 && (
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            className="absolute w-32 h-auto bg-gray-100 top-[8%] left-[55%] rounded-xl border-[0.5px] border-gray-20"
          >
            {months.map((month: string, i: number) => (
              <TouchableOpacity
                key={i}
                onPress={() => handleMonthSelection(month)}
              >
                <Text className="text-center text-gray-10 p-2 py-3">
                  {month}
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
            onChangeText={(e) => { setSelectedExpense({ ...selectedExpense, amount: Number(e) }) }}
            value={String(selectedExpense?.amount)}
          />
          <TextInput
            className="text-md border-gray-10 text-gray-10 border-[0.5px] p-1 rounded-md w-full mt-3 px-2"
            placeholder="Expense Desc"
            placeholderTextColor={"white"}
            onChangeText={(e) => { setSelectedExpense({ ...selectedExpense, desc: e }) }}
            value={selectedExpense?.desc}
          />
          <CustomButton title="Update this expense" className="mt-2 rounded-md" onPress={() => updateItem(selectedExpense)} />
        </BottomSheet>}
    </GestureHandlerRootView>
  );
}

function getMonthsBetweenDates(startDate: string) {
  const start = new Date(startDate);
  const end = new Date();
  const months = [];
  while (start <= end) {
    const month = start.toLocaleString('default', { month: 'long' });
    const year = start.getFullYear();
    months.push(`${month} ${year}`);
    start.setMonth(start.getMonth() + 1);
    start.setDate(1)
  }

  return months;
}



