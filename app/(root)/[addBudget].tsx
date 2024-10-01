import CustomButton from '@/components/CustomButton'
import Loading from '@/components/Loading'
import { baseUrl } from '@/constants'
import { useUserInfoStore } from '@/store'
import { useAuth } from '@clerk/clerk-expo'
import axios from 'axios'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { View, Text, ScrollView,TextInput, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native'


export default function AddBudget() {
  const {addBudget}=useLocalSearchParams()
  const {userEmail,setSharedBudgetList,userSharedBudget}=useUserInfoStore()
  const {getToken}=useAuth()
  const [details,setDetails]=useState({
    name:"",desc:""
  })
  const [participants,setParticipants]=useState([""])
  const [loading,setLoading]=useState(false)
  const [selectedBudget,setSelectedBudget]=useState<any>(null)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(()=>{
    if(addBudget!== "null"){
      setLoading(true)
      const budgetData=userSharedBudget.find((item:any)=>item._id===addBudget)
      setSelectedBudget(budgetData)
      setDetails({name:budgetData.name,desc:budgetData.desc})
      setParticipants(budgetData.participants.filter((item:any)=>item!==userEmail))
      setLoading(false)
      
    }
  },[addBudget])

  const handleSubmit=async(update:boolean)=>{
    const token=await getToken()
    setLoading(true)
    if(details.name.length===0){
      Alert.alert("Error","Name is required")
    }
    const members=participants.filter((item,i)=>item.length>0 && emailRegex.test(item) )
    try {
      if(!update){
        const {data}=await axios.post(`${baseUrl}/shared`,{
          name:details.name,
          desc:details.desc, 
          participants:[...members,userEmail]
        },{headers:{Authorization:`bearer ${token}`}})
        setSharedBudgetList([...userSharedBudget,data])

      }else{
        const {data}=await axios.put(`${baseUrl}/shared/${selectedBudget?._id}`,{
          name:details.name,
          desc:details.desc, 
          participants:[...members,userEmail]
        },{headers:{Authorization:`bearer ${token}`}})
        setSharedBudgetList(userSharedBudget.map((item:any)=>item._id===selectedBudget._id?data:item))
      }
      
    } catch (error) {
      console.log(error)
    }
    setDetails({name:"",desc:""})
    setParticipants([""])
    setSelectedBudget(false)
    setLoading(false)

    router.replace("/(root)/(tabs)/shared-budget")
  }
  return (
    loading?<Loading/>:
    <ScrollView className='mb-5 px-5'>
      <Text className='text-gray-10 text-xl font-JakartaBold text-center mt-3'>{addBudget==="null"?"Add a shared Budget":"Update a shared Budget"}</Text>
      <KeyboardAvoidingView className='my-4'>
        <TextInput
            className="text-md border-gray-20 text-gray-10 border-[1px] p-2 rounded-xl w-full mt-3"
            placeholder="Name of your shared budget"
            placeholderTextColor={"#979899"}
            value={details.name}
            onChangeText={t=>setDetails({...details,name:t})}
          />
        <TextInput
            className="text-md border-gray-20 text-gray-10 border-[1px] p-2 rounded-xl w-full mt-3"
            placeholder="Add Description"
            placeholderTextColor={"#979899"}
            value={details.desc}
            onChangeText={t=>setDetails({...details,desc:t})}
          />
        <Text className='text-gray-20 mt-3 font-JakartaSemiBold text-lg'>Add Members</Text>
        {participants.map((item,index)=>
          <View key={index} className='flex flex-row items-center'>
              <TextInput
                  className="text-md border-gray-20 text-gray-10 border-[1px] p-2 rounded-xl w-[80%] mt-3"
                  placeholder="Add Member"
                  placeholderTextColor={"#979899"}
                  value={item}
                  onChangeText={t=>setParticipants(participants.map((it,i)=>i===index?t:it))}
                />
                {
                    participants.length>1 && 
                    <TouchableOpacity className='ml-6' onPress={()=>{
                      setParticipants(participants.filter((_,i)=>i!=index))
                    }}>
                      <Text className='text-gray-20 text-5xl font-JakartaExtraBold'>-</Text>
                    </TouchableOpacity>}
          </View>
              )}
            {participants.length<=20 && 
            <View className='w-full flex items-end mt-3'>
              <TouchableOpacity className='mr-2'
                    onPress={()=>{
                      if(emailRegex.test(participants[participants.length-1])){
                        setParticipants([...participants,""]);
                      }else{
                        Alert.alert("Limitation","You should fill out first a valid email to add another member")
                      }
                      
                    }}>
                      <Text className='text-gray-20 text-lg font-JakartaBold'>Add Members +</Text>
              </TouchableOpacity>
            </View>}
            <CustomButton title={addBudget==="null"?"Add shared Budget":"Update shared Budget"} 
            className='mt-5 rounded-xl' 
            onPress={()=>handleSubmit(addBudget==="null"?false:true)}/>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}