import Loading from '@/components/Loading'
import { baseUrl } from '@/constants'
import { useUserInfoStore } from '@/store'
import { useAuth } from '@clerk/clerk-expo'
import axios from 'axios'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { View, Text, ScrollView, Pressable, KeyboardAvoidingView,TextInput, TouchableOpacity } from 'react-native'
import moment from 'moment'
import CustomButton from '@/components/CustomButton'
import {Entypo,AntDesign }from '@expo/vector-icons';


export default function SharedBudgetDetails() {
  const {details}=useLocalSearchParams()
  const {getToken}=useAuth()
  const [loading,setLoading]=useState(false)
  const [expenses,setExpense]=useState<Array<any>>([])
  const [selectedBudget,setSelectedBudget]=useState<any>(null)
  const {userSharedBudget,userEmail}=useUserInfoStore()
  const [modal,setModal]=useState(false)
  const [expenseDetails,setExpenseDetails]=useState({
    title:"",
    createdBy:""
  })

  const fetchExpenses=async()=>{
    const token=await getToken()
    try {
      setLoading(true)
      setSelectedBudget(userSharedBudget.find((item:any)=>item._id===details))
      const {data}=await axios.get(`${baseUrl}/shared/expense/${details}`,{headers:{Authorization:`bearer ${token}`}})
      setExpense(data)
      
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  useEffect(()=>{
      fetchExpenses()
  },[details])
  return (
    loading?<Loading/>:
    <>
    <ScrollView className='px-4'>
      <Text className='text-gray-20 font-JakartaBold text-xl text-center mt-2'>{selectedBudget?.name}</Text>
      <Text className='text-gray-30 font-JakartaLight text-sm text-center mt-2'>Created At: {moment(selectedBudget?.createdAt).format('DD-MM-YYYY')}</Text>
      <Text className='text-gray-20 font-JakartaSemiBold text-xl mt-2'>Owner: {selectedBudget?.createdBy?.name}</Text>
      <View className='flex flex-row items-start'>
        <Text className='text-gray-20 font-JakartaSemiBold text-xl mt-2'>Member(s):</Text>
        <View className='ml-3'>{selectedBudget?.participants?.map((item:String,i:any)=>item!==selectedBudget?.createdBy?.email && <Text className='text-gray-30 font-JakartaMedium text-md mt-2' key={i}>{item}</Text>)}</View>
      </View>
      <CustomButton title='Add New Expense' className='mt-3 rounded-xl' onPress={()=>setModal(true)}/>
      {
        expenses.length>0?
        expenses.map((item:any,index:any)=><Text key={index}>{item}</Text>)
        :<Text className='text-gray-30 text-lg font-JakartaLight text-center mt-6'>No Expenses in this budget</Text>
      }
    </ScrollView>
      {modal && 
      <ScrollView className='w-full h-screen absolute top-0 left-0 bg-gray-80'>
        <View className='w-full p-2 flex items-end'>
          <Pressable onPress={()=>setModal(false)}>
            <Entypo name="cross" size={30} color="white" />
          </Pressable>
        </View>
        <Text className='text-gray-20 text-lg text-center font-JakartaSemiBold mb-3'>Add New Expense in {selectedBudget?.name}</Text>
        <KeyboardAvoidingView className='mx-4'>
          <TextInput
            className="text-md border-gray-20 text-gray-10 border-[1px] p-2 rounded-xl w-full mt-3"
            placeholder="Title"
            placeholderTextColor={"#979899"}
            value={expenseDetails.title}
            onChangeText={(t)=>setExpenseDetails({...expenseDetails,title:t})}
          />
          <Text className='relative font-JakartaBold text-lg text-gray-20 ml-1 mt-3'>Paid By</Text>
          {
            selectedBudget?.participants?.map((email:any,index:number)=>{
              return(
                  <View key={index} className='flex flex-row mt-2 mx-1 items-center justify-between w-[80%]'>
                    <Text className='text-md text-gray-10 font-JakartaMedium '>{email}</Text>
                    {
                      selectedBudget?.participants.length >1 &&
                      <Pressable className='ml-7' onPress={()=>setExpenseDetails({...expenseDetails,createdBy:email})}>
                        {email===expenseDetails.createdBy?
                        <AntDesign name="checkcircle" size={15} color="green" />:
                        <Entypo name="circle" size={15} color="white" />}

                      </Pressable>                      
                    }
                  </View>)
            })
          }
          
          
        </KeyboardAvoidingView>
      </ScrollView>}
      </>
  )
}