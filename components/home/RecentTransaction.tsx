import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";
import { HomeProps, ItemProps } from "@/types/type";
import { images } from "@/constants";
import { AntDesign } from "@expo/vector-icons";

export default function RecentTransaction({ list, active }:HomeProps) {
  return (
    <View className="mt-2 px-5 mb-16">
      {active===2 && 
        <View className="flex flex-row w-full items-center justify-between px-3 mt-2">
          <Text className="text-gray-20 font-JakartaBold text-lg">Your Expense Category</Text>
          <Link href={"/(root)/add-category"} className="bg-primary-100 p-2 rounded-full text-gray-10 font-JakartaBold px-3">Add New</Link>
        </View>
        }
          <FlatList
            data={list}
            renderItem={({ item }) => (
              active===1?<Item title={item.title}/>:<CategoryItem/>
            )}
            keyExtractor={(item) => item.id}
            nestedScrollEnabled={true}
            scrollEnabled={false}
          />
          {active===2 && <TouchableOpacity
            className="w-full h-20 my-3 bg-gray-70  border-[1px] border-dotted border-gray-20 flex flex-row items-center px-10 justify-center"
            style={{ borderStyle: "dashed" }}
            onPress={()=>router.push("/(root)/add-category")}
          >
            <AntDesign name="pluscircleo" size={24} color="gray" />
            <Text className="text-gray-10 ml-3 text-[20px] font-thin">
              Add new Category
            </Text>
          </TouchableOpacity>}
      </View>

  );
}

const Item = ({title}:ItemProps) => (
  <View className="py-2 mb-2 px-3 border-[0.3px] border-gray-40 rounded-lg flex flex-row">
      <View className="bg-green-600 w-10 h-10 flex justify-center items-center rounded-lg ">
        <Image
          source={images.person}
          className="w-8 h-8 object-contain"
          tintColor={"white"}
        />
      </View>
    <View className="flex flex-row items-center justify-between basis-5/6">
      <Text className=" text-gray-10 text-[17px] ml-3">{title}</Text>
      <Text className=" text-gray-10 font-bold text-[18px]">50000</Text>
    </View>
  </View>
);
const CategoryItem = () => (
  <View className="px-3 h-auto w-full rounded-xl bg-gray-80 mt-4 flex">
    <View className="flex flex-row items-center py-1">
      <Image
        source={images.person}
        className="w-8 h-8 basis-1/6"
        tintColor={"#ffffff"}
        resizeMode="contain"
      />
      <View className="basis-5/6 flex flex-row h-full items-center justify-between px-2">
        <Text className="text-gray-10 font-semibold text-[16px]">
          Auto Transport
        </Text>
        <View className="mt-3 flex justify-center items-center">
          <Text className="text-gray-10 font-bold text-[20px]">₹3000</Text>
          <Text className="text-gray-20 font-medium text-[12px]">of 4000</Text>
        </View>
      </View>
    </View>
    <View className=" w-full h-2 bg-gray-40 opacity-30 rounded-lg mb-2">
      <View
        className={`absolute left-0 w-[${25}%] h-2 bg-[${"#00f9d9"}] rounded-lg `}
      />
    </View>
  </View>
);
