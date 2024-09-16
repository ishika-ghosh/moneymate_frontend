import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { forwardRef, ReactElement } from "react";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";
import Animated, { FadeInLeft } from "react-native-reanimated";
import { ExpenseProps } from "@/types/type";

export const ExpenseHeader =forwardRef(function (
  {
    monthValue,
    setCurrentDay,
    currentDay,
    dateList,
    setOpenDropDown,
    openDropDown,
  }:ExpenseProps,
  ref:any
) {
  return (
    <View className="bg-gray-80 rounded-b-3xl">
      <Text className="text-center text-gray-20 text-lg font-light">
        {moment(`${monthValue}-${currentDay}`, "MMMM-D").format("MMMM Do YYYY")}
      </Text>
      <View className="mt-5 ml-4">
        <Text className="text-4xl font-bold text-gray-10">Expense</Text>
        <Text className="text-5xl font-medium text-gray-10 mt-2">Schedule</Text>
      </View>
      <View className="flex flex-row justify-between items-center w-full h-auto px-4 py-4">
        <View>
          <Text className="text-gray-400">Analyze Your Expenses</Text>
        </View>
        <View>
          <Pressable
            className="flex flex-row items-center justify-around px-4 bg-gray-100 py-2 w-32 rounded-3xl relative border-[0.5px] border-gray-10"
            onPress={() => setOpenDropDown(!openDropDown)}
          >
            <Text className="text-lg text-gray-10">{monthValue}</Text>
            <AntDesign
              name="down"
              size={10}
              color="#e0e0e6"
              style={{ marginLeft: 5 }}
            />
          </Pressable>
        </View>
      </View>
      <Animated.View className="pb-3 px-3 " entering={FadeInLeft}>
        <FlatList
          ref={ref}
          data={dateList}
          renderItem={({ item }) => (
            <DateCardItem
              date={item?.date}
              day={item?.day}
              setCurrentDay={setCurrentDay}
              currentDay={currentDay}
            />
          )}
          keyExtractor={(item) => item.date}
          horizontal={true}
        />
      </Animated.View>
    </View>
  );
});

const DateCardItem = ({ date, day, setCurrentDay, currentDay }:any) => (
  <TouchableOpacity
    onPress={() => {
      setCurrentDay(date);
    }}
    className={
      currentDay === date
        ? "bg-[#4d4e62] py-5 px-1 m-1 rounded-3xl flex items-center w-12 scale-110"
        : "bg-gray-100 py-5 px-1 m-1 rounded-3xl flex items-center w-12"
    }
  >
    <Text className="text-xl font-bold text-gray-10">{date}</Text>
    <Text className="font-light text-gray-10">{day}</Text>
  </TouchableOpacity>
);
