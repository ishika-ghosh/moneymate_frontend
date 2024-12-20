import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";


export const ExpenseHeader = (
  {
    monthValue,
    setOpenDropDown,
    openDropDown,
    currentMonthTotal
  }: any,
) => {
  return (
    <View className="bg-gray-80 rounded-b-3xl px-3">

      <View className="mt-5 ml-4">
        <Text className="text-3xl font-JakartaSemiBold text-gray-10">All Expenses</Text>
      </View>
      {currentMonthTotal > 0 && <Text className=" text-gray-20 text-sm font-light mt-3 ml-4">
        Total expense of {monthValue} is ₹ {currentMonthTotal}
      </Text>}
      <View className="flex flex-row justify-between items-center w-full h-auto px-4 py-4">
        <View>
          <Text className="text-gray-400">Analyze Your Expenses</Text>
        </View>
        <View>
          <Pressable
            className="flex flex-row items-center justify-around px-4 bg-gray-100 py-2 w-auto rounded-2xl relative border-[0.5px] border-gray-10"
            onPress={() => setOpenDropDown(!openDropDown)}
          >
            <Text className="text-md text-gray-10">{monthValue}</Text>
            <AntDesign
              name="down"
              size={10}
              color="#e0e0e6"
              style={{ marginLeft: 5 }}
            />
          </Pressable>
        </View>
      </View>
      {/* <Animated.View className="pb-3 px-3 " entering={FadeInLeft}>
        <FlatList
          ref={ref}
          data={dateList}
          renderItem={({ item }) => (
            <DateCardItem
              date={item?.date}
              day={item?.day}
              handleDateChange={handleDateChange}
              currentDay={currentDay}
            />
          )}
          keyExtractor={(item) => item.date}
          horizontal={true}
        />
      </Animated.View> */}
    </View>
  );
}

const DateCardItem = ({ date, day, handleDateChange, currentDay }: any) => (
  <TouchableOpacity
    onPress={() => {
      handleDateChange(date)
    }}
    className={
      currentDay === date
        ? "bg-[#4d4e62] py-5 px-1 m-1 rounded-3xl flex items-center w-12 scale-110"
        : "bg-gray-100 py-5 px-1 m-1 rounded-3xl flex items-center w-12"
    }
  >
    <Text className="text-xl font-bold text-gray-10">{date.split("/")[0]}</Text>
    <Text className="font-light text-gray-10">{day}</Text>
  </TouchableOpacity>
);
