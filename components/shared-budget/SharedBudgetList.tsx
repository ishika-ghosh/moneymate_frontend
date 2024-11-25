import { View, Text, Pressable, Image } from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import moment from "moment";
import { useUserInfoStore } from "@/store";
import { router } from "expo-router";
import { images } from "@/constants";

export default function SharedBudgetList() {
  const { userSharedBudget } = useUserInfoStore()
  return (
    <View className="px-3">
      {userSharedBudget.length > 0 ?
        userSharedBudget.map((item: any) => (
          <SharedBudget key={item._id} item={item} />
        )) : <Text className="text-gray-30 text-center font-JakartaSemiBold text-xl">No shared Budget</Text>}
    </View>
  );
}
const SharedBudget = ({ item }: any) => {
  const { userEmail } = useUserInfoStore()
  return (
    <Pressable onPress={() => router.push(`/(root)/(budget)/${item._id}`)} className="mx-2">
      <View className="px-3 h-auto w-full rounded-xl bg-gray-100 mt-4 flex flex-row items-center pl-5">
        <Image source={images.group} resizeMode='contain' className='w-[50px] h-[50px]' />
        <View className="w-[60%] h-full py-3 ml-5">
          <Text className="font-JakartaExtraBold text-lg text-gray-10">{item.name}</Text>
          <Text className="text-gray-20 font-JakartaMedium text-md mt-1">{item.createdBy.name} and {item?.participants.length - 1} others</Text>
          <Text className="text-gray-20 font-light text-xs">
            Created At : {moment(item.createdAt).format("MMMM Do YYYY")}
          </Text>
        </View>
        {
          item?.createdBy?.email === userEmail &&
          <Pressable onPress={() => router.push(`/(root)/${item._id}`)}>
            <Feather name="edit" size={26} color="white" />
          </Pressable>
        }
      </View>
    </Pressable>
  )
};
