import { View, Text, Image, TouchableOpacity } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { images } from "@/constants";

export default function ExpenseList() {
  const [selectedItem, setSelectedItem] = useState(null);
  let PrevOpened;
  const swipeRef = useRef<any>([]);
  const closeRow = (item:any) => {
    setSelectedItem(item);
    swipeRef.current.forEach((swipeable:any, index:number) => {
      if (index !== item && swipeable) {
        swipeable.close();
      }
    });
  };
  return (
    <View className="mt-4 px-4 py-2">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
        <Swipeable
          ref={(ref) => (swipeRef.current[item] = ref)}
          key={item}
          renderRightActions={RightView}
          onSwipeableOpen={() => {
            closeRow(item);
          }}
        >
          <ExpenseItems />
        </Swipeable>
      ))}
    </View>
  );
}

const ExpenseItems = () => {
  return (
    <View className="bg-gray-100 py-4 mb-2 pl-3 border-[0.3px] border-gray-40 rounded-lg flex flex-row items-center justify-between z-0">
      <View className="bg-green-600 w-10 h-10 flex justify-center items-center rounded-full">
        <Image
          source={images.person}
          className="w-8 h-8 object-contain"
          tintColor={"white"}
        />
      </View>
      <View className="flex flex-row items-center justify-between basis-5/6 px-2 pr-5">
        <View>
          <Text className=" text-gray-10 text-[17px] font-semibold">item</Text>
          <Text className="text-gray-20 font-light">Category</Text>
        </View>
        <Text className=" text-gray-10 font-bold text-[18px]">50000</Text>
      </View>
    </View>
  );
};
const RightView = () => (
  <View className="h-full my-auto flex flex-row gap-2 justify-center items-center">
    <TouchableOpacity className="w-10 h-full justify-center items-center">
      <AntDesign name="delete" size={24} color="#ed0707" />
    </TouchableOpacity>
    <TouchableOpacity className="w-10 h-full justify-center items-center">
      <AntDesign name="edit" size={24} color="#0a85f7" />
    </TouchableOpacity>
  </View>
);
