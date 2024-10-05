import { View, Text, Image, TouchableOpacity } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { useRef, useState } from "react";



export default function ExpenseList({expenseList,deleteItem,updateItem}:any) {
  const [selectedItem, setSelectedItem] = useState(null);
  let PrevOpened;
  const swipeRef = useRef<any>([]);
  const closeRow = (item:any,iteamIndex:any) => {
    swipeRef.current.forEach((swipeable:any, index:number) => {
      if (index !== iteamIndex && swipeable) {
        swipeable.close();
      }
    });
  };
  
  return (
    <View className="mt-4 px-4 py-2">
      {
        expenseList.length===0?
        <View className="h-1/2">
          <Text className="text-gray-30 font-JakartaMedium text-center mt-10">No expenses to show</Text>
        </View>:
        expenseList.map((item:any,index:any) => (
        <Swipeable
          ref={(ref) => (swipeRef.current[index] = ref)}
          key={item._id}
          renderRightActions={()=><RightView item={item} 
                                    handleDelete={(_item:any)=>deleteItem(_item)} 
                                    handleUpdate={(_item:any)=>updateItem(_item)}
                                    />}
          onSwipeableOpen={() => {
            closeRow(item,index);
          }}
        >
          <ExpenseItems item={item} setItem={selectedItem}/>
        </Swipeable>
      ))
      }
    </View>
  );
}

const ExpenseItems = ({item}:any) => {
  return (
    <View className="bg-gray-100 py-4 mb-2 pl-3 border-[0.3px] border-gray-40 rounded-lg flex flex-row items-center justify-between z-0">
      <View className={"bg-gray-70 w-10 h-10 flex justify-center items-center rounded-full"}>
        <Text className="text-xl">{item.category.icon}</Text>
      </View>
      <View className="flex flex-row items-center justify-between basis-5/6 px-2 pr-5">
        <View>
          <Text className=" text-gray-10 text-[17px] font-semibold">{item.category.name}  <Text className="text-gray-30 text-sm font-JakartaLight">{item.desc}</Text></Text>
          <Text className="text-gray-20 font-light">{new Date(item.createdAt).toLocaleDateString()} {new Date(item.createdAt).toLocaleTimeString()}</Text>
        </View>
        <Text className=" text-gray-10 font-bold text-[18px]">₹{item.amount}</Text>
      </View>
    </View>
  );
};
const RightView = ({item,handleDelete,handleUpdate}:any) => (
  <View className="h-full my-auto flex flex-row gap-2 justify-center items-center">
    <TouchableOpacity className="w-10 h-full justify-center items-center" onPress={()=>handleDelete(item)}>
      <AntDesign name="delete" size={24} color="#ed0707" />
    </TouchableOpacity>
    <TouchableOpacity className="w-10 h-full justify-center items-center" onPress={()=>handleUpdate(item)}>
      <AntDesign name="edit" size={24} color="#0a85f7" />
    </TouchableOpacity>
  </View>
);
