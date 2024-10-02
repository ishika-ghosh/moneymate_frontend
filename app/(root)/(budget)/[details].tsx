import Loading from '@/components/Loading'
import { baseUrl } from '@/constants'
import { useUserInfoStore } from '@/store'
import { useAuth } from '@clerk/clerk-expo'
import axios from 'axios'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { View, Text, ScrollView, Pressable, KeyboardAvoidingView,TextInput, TouchableOpacity, Alert } from 'react-native'
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
  const [sameAmount,setSameAmount]=useState(false)
  const [totalAmount,setTotalAmount]=useState("")
  const [expenseDetails,setExpenseDetails]=useState({
    title:"",
    paidBy:""
  })
  const [paidFor,setPaidFor]=useState([{
    user:"",
    share:""
  }])
  const handleSubmit=async()=>{
    let paidForList;
    const token=await getToken()
    if(sameAmount && totalAmount.length>0){
      const share=Math.round(Number(totalAmount)/paidFor.length)
      paidForList=paidFor.map((item,index)=>({
        ...item,share:share
      }))
    }else{
      paidForList=paidFor.map((item,index)=>({
        ...item,
        share:Number(item.share)
      }))
    }
    try {
      setLoading(true)
      const {data}=await axios.post(`${baseUrl}/shared/expense`,{
        description:expenseDetails.title, 
        budgetId:selectedBudget._id, 
        paidBy:expenseDetails.paidBy, 
        paidFor:paidForList 
      },{headers:{Authorization:`bearer ${token}`}})
      setExpense([...expenses,data])
    } catch (error) {
      console.log(error)
    }
    setExpenseDetails({
    title:"",
    paidBy:""
    })
    setPaidFor(selectedBudget?.participants.map((email:string,index:number)=>({
        user:email,
        share:""
      })))
    setSameAmount(false)
    setTotalAmount("")
    setLoading(false)
    setModal(false)
  }
  const handleDelete=async(id:any)=>{
    const token=await getToken()
    try {
      setLoading(true)
      const {data}=await axios.delete(`${baseUrl}/shared/expense/${id}`,{headers:{Authorization:`bearer ${token}`}})
      if(data.success){
        setExpense(expenses.filter((item)=>item._id!==id))
        Alert.alert("Success","Expense deleted Successfully")
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  const fetchExpenses=async()=>{
    const token=await getToken()
    try {
      setLoading(true)
      const budget=userSharedBudget.find((item:any)=>item._id===details)
      setSelectedBudget(budget)
      const {data}=await axios.get(`${baseUrl}/shared/expense/${details}`,{headers:{Authorization:`bearer ${token}`}})
      setExpense(data)
      setPaidFor(budget?.participants.map((email:string,index:number)=>({
        user:email,
        share:""
      })))
      
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  const handleAnalysis=async()=>{
      const token=await getToken()
      try {
        const {data}=await axios.get(`${baseUrl}/shared/analysis/${details}`,{headers:{Authorization:`bearer ${token}`}})
        console.log(data)
      } catch (error) {
        console.log(error)
      }
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
        expenses.map((item:any,index:any)=><ExpenseItem key={item._id} item={item} handleDelete={handleDelete}/>)
        :<Text className='text-gray-30 text-lg font-JakartaLight text-center mt-6'>No Expenses in this budget</Text>
      }
      <CustomButton title='Get The Analysis' className='mt-3 rounded-xl mb-10 border-[0.5px] border-gray-20' bgVariant='secondary' onPress={handleAnalysis}/>
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
                      <Pressable className='ml-7' onPress={()=>setExpenseDetails({...expenseDetails,paidBy:email})}>
                        {email===expenseDetails.paidBy?
                        <AntDesign name="checkcircle" size={15} color="green" />:
                        <Entypo name="circle" size={15} color="white" />}

                      </Pressable>                      
                    }
                  </View>)
            })
          }
          <View className='flex w-full mt-3'>
              <Text className='relative font-JakartaBold text-lg text-gray-20 ml-1'>Paid For</Text>
              <View className='flex flex-row mt-2 mx-1 items-center w-[60%]'>
                    <Text className='text-md text-gray-20 font-JakartaMedium '>Same Amount for all?</Text>
                    {
                      selectedBudget?.participants.length >1 &&
                      <Pressable className='ml-7' onPress={()=>setSameAmount(!sameAmount)}>
                        {sameAmount?
                        <AntDesign name="checkcircle" size={20} color="green" />:
                        <Entypo name="circle" size={20} color="white" />}

                      </Pressable>                      
                    }
                  </View>
            
          </View>
          {sameAmount && <TextInput
                    className="text-sm border-gray-20 text-gray-10 border-[1px] p-2 rounded-xl w-full mt-3"
                    placeholder="Add Total Amount"
                    placeholderTextColor={"#979899"}
                    value={totalAmount}
                    onChangeText={(t)=>setTotalAmount(t)}
                    
                    />}
          {
            paidFor?.map((item:any,index:number)=>(
              <View key={index} className='w-full flex flex-row items-center ml-1 mt-3'>
                <View className='w-[80%]'>
                  <Text className='text-md text-gray-10 font-JakartaMedium '>{item.user}</Text>
                  {!sameAmount &&<TextInput
                    className="text-sm border-gray-20 text-gray-10 border-[1px] p-2 rounded-xl w-full mt-3"
                    placeholder="Add Amount"
                    placeholderTextColor={"#979899"}
                    value={item.share}
                    onChangeText={(t)=>setPaidFor(paidFor.map((ele,i)=>i===index?{...ele,share:t}:ele))}
                    
                    />}
                </View>{
                  paidFor.length>1 &&
                  <Pressable className='ml-4' onPress={()=>setPaidFor(paidFor.filter((_,i)=>i!==index))}>
                    <Text className='text-gray-20 text-5xl font-JakartaExtraBold'>-</Text>
                  </Pressable>
                  }
              </View>
            ))
          }
           <CustomButton title={"Add Expense"} 
            className='mt-5 rounded-xl' 
            onPress={handleSubmit}/>

          
          
        </KeyboardAvoidingView>
      </ScrollView>
      
      }
      </>
  )
}

const ExpenseItem=({item,handleDelete}:any)=>(
  <View className='px-4 w-full mt-3 bg-gray-60 rounded-xl'>
    <View className='py-2'>
      <Text className='text-lg font-JakartaSemiBold text-gray-20'>{item.description}</Text>
      <Text className='text-md font-JakartaSemiBold text-gray-30'>Paid By: {item.paidBy}</Text>
    </View>
    <View> 
      <Text className='text-md font-JakartaMedium text-gray-20 mb-1'>Paid for:</Text>
      {
        item.paidFor.map((item2:any,index:number)=>(
          <View key={item2._id} className='flex flex-row items-center mb-2'>
            <Text className='text-md font-JakartaLight text-gray-30'>{item2.user}</Text>
            <Text className='ml-5 text-md font-JakartaLight text-gray-30'>{item2.share}</Text>
          </View>
        ))
      }
    </View>
    <View className='absolute bottom-2 right-2 bg-gray-60'>
      <Pressable onPress={()=>handleDelete(item._id)}>
        <AntDesign name="delete" size={24} color="white" />
      </Pressable>
    </View>
  </View>
)