import { View, Text,TouchableOpacity, ScrollView } from 'react-native'
import { useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import HomeHeader from '@/components/home/HomeHeader'
import HomeStatistics from '@/components/home/HomeStatistics';
import RecentTransaction from '@/components/home/RecentTransaction';

export default function RootHome() {
  const { user } = useUser();
  const [active, setActive] = useState(1);
  const list = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d73",
      title: "Fourth Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d79",
      title: "Fourth Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d76",
      title: "Fourth Item",
    },
  ];
  return (
    <ScrollView>
      <HomeHeader name={user?.externalAccounts[0].firstName} profilePicture={user?.externalAccounts[0].imageUrl || ""}/>
      <HomeStatistics/>
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
      <RecentTransaction list={list} active={active}/>
    </ScrollView>
  )
}