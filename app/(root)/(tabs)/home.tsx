import { View, Text,TouchableOpacity, ScrollView} from 'react-native'
import { useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-expo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import axios from 'axios';
import HomeHeader from '@/components/home/HomeHeader'
import HomeStatistics from '@/components/home/HomeStatistics';
import RecentTransaction from '@/components/home/RecentTransaction';
import Loading from '@/components/Loading';
import { useUserInfoStore } from '@/store';
import { baseUrl } from '../../../constants/index';


export default function RootHome() {
  const { user } = useUser();
  const {getToken}=useAuth()
  const {setUserInfo,
        setCategoryList,
        setExpenseList,
        userName,
        userCategoryList,
        userImageUrl,
        userExpenseList,
        setPieChartData,
        pieChartData,
        todaysTotal,
        userCreatedAt,
        setSharedBudgetList,
        }=useUserInfoStore()
  const [active, setActive] = useState<Number>(1);
  const [loading,setLoading]=useState<boolean>(false)

  const fetchInfo=async()=>{
    setLoading(true)
    const token =await getToken();
    setUserInfo({name:user?.externalAccounts[0].firstName+" "+user?.externalAccounts[0].lastName,
                email:user?.externalAccounts[0].emailAddress,
                imageUrl:user?.externalAccounts[0].imageUrl,
                createdAt:new Date(String(user?.createdAt)).toLocaleDateString()
    })
    
    const API=axios.create({baseURL:baseUrl})
    API.interceptors.request.use((req)=>{
      req.headers.Authorization=`bearer ${token}`
      return req
    })
    try {
      const {data:{data}}=await API.get(`/category`)
      const {data:expenseData}=await API.get(`/expenses`)
      const {data:sharedData}=await API.get(`/shared`)
      const {data:{data:{scaledData,totalSum},barChartData}}=await API.get(`/analytics?startdate=${userCreatedAt}`)
      setCategoryList({categoryList:data})
      setExpenseList({expenseList:expenseData.reverse()})
      setPieChartData({list:scaledData,total:totalSum,barchartData:barChartData})
      setSharedBudgetList(sharedData)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)

  }
 
  useEffect(()=>{
    fetchInfo()
  },[])
  
  return (loading?<Loading/>:
    <ScrollView>
      <HomeHeader name={userName.split(" ")[0]} profilePicture={userImageUrl|| ""}/>
      <HomeStatistics category={pieChartData.slice(0,3)} total={todaysTotal}/>
      <View className="mx-10 mt-4 flex flex-row items-center justify-around rounded-xl bg-gray-70 py-1">
        <TouchableOpacity
          className={
            (active === 1 ? "bg-gray-100" : "bg-transparent") +
            " py-2 px-3 rounded-xl"
          }
          onPress={() => setActive(1)}
        >
          <Text
            className={
              "text-[14px] " +
              (active === 1 ? "text-gray-10 font-semibold" : "text-gray-20")
            }
          >
            Recent Expanse
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={
            (active === 2 ? "bg-gray-100" : "bg-transparent") +
            " py-2 px-3 rounded-xl"
          }
          onPress={() => setActive(2)}
        >
          <Text
            className={
              "text-[14px] " +
              (active === 2 ? "text-gray-10 font-semibold" : "text-gray-20")
            }
          >
            Expense Category
          </Text>
        </TouchableOpacity>
      </View>
      <View className='my-2 flex flex-row items-center '>
      <TouchableOpacity className='mx-5 border-[0.5px] border-gray-30 rounded-full p-2' onPress={fetchInfo}><FontAwesome5 name="sync" size={24} color="#979899" /></TouchableOpacity>
      <Text className='text-gray-30'>Sync Your Data</Text>
      </View>
      <RecentTransaction list={active===1?userExpenseList:userCategoryList} active={active}/>
    </ScrollView>
  )
}


