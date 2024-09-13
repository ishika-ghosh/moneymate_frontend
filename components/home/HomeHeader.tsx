import { View, Text, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { UserProps } from "@/types/type";
import { Link } from "expo-router";
import { images } from "@/constants";


export default function HomeHeader({name,profilePicture}:UserProps) {
  return (
    <View className="bg-gray-80 py-4 px-3 flex flex-row items-center overflow-hidden">
      <View className="basis-1/6 flex items-center justify-center">
        <Image
          source={profilePicture.length>0?{uri:profilePicture}:images.person}
          className="rounded-full w-10 h-10 object-contain"
        />
      </View>
      <View className="flex flex-row items-center justify-between basis-5/6 w-full px-2">
        <View className="flex mb-1">
   
            <Text className="text-[25px] font-JakartaMedium text-gray-20">Hi, {name} 👋🏻</Text>
        </View>
        <Link href={"/(root)/settings"}>

          <Feather name="settings" size={24} color="#e0e0e6" />
        </Link>

      </View>
    </View>
  );
}
