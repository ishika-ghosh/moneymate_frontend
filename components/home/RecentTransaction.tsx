import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";
import { HomeProps} from "@/types/type";
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
        {list.length>0?
        <FlatList
            data={list}
            renderItem={({ item }) => (
              active===1?<Item item={item}/>:<CategoryItem item={item}/>
            )}
            keyExtractor={(item) => item._id}
            nestedScrollEnabled={true}
            scrollEnabled={false}
          />:
          <Text className="text-gray-30 text-center font-JakartaLight text-lg mt-20">{active===1?"No recent transactions":"No category created by you"}</Text>}
          
          {active===2 && list.length>0 && <TouchableOpacity
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

const Item = ({item}:any) => {
  return(
  <View className="py-2 mb-2 px-3 border-[0.3px] border-gray-40 rounded-lg flex flex-row">
      <View className="bg-gray-70 w-10 h-10 flex justify-center items-center rounded-lg">
        <Text className="text-3xl">{item.category.icon}</Text>
      </View>
    <View className="flex flex-row items-center justify-between basis-5/6">
    <View className="ml-3">
      <Text className=" text-gray-10 text-lg ml-3 font-JakartaBold">{item.category.name}</Text>
      <Text className=" text-gray-10 text-xs ml-3 font-JakartaLight">{item.desc}</Text>

    </View>
      <Text className=" text-gray-10 font-bold text-[18px]">₹{item.amount}</Text>
    </View>
  </View>
)};
const CategoryItem = ({item}:any) => {
  
  return(
  <View className="px-3 h-auto w-full rounded-xl bg-gray-80 mt-4 flex">
    <View className="flex flex-row items-center py-2">
      
      <View className="flex flex-row h-full items-center justify-between w-full">
      <View className="flex flex-row h-full items-center px-3">
      <View className={`flex items-center justify-center h-12 w-12 rounded-xl bg-gray-70`}>
        <Text className="text-center text-3xl ">{item.icon}</Text>
      </View>
        <Text className="text-gray-10 text-lg ml-4 font-JakartaSemiBold">
          {item.name}
        </Text>

      </View>
      </View>
    </View>
  </View>
)}
