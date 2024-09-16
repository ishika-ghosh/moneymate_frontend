import { Text, ScrollView, TouchableOpacity } from "react-native";
import { useState, useEffect, useRef } from "react";
import { ExpenseHeader } from "@/components/expense/ExpenseHeader";
import ExpenseList from "@/components/expense/ExpenseList";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import moment from "moment";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function ExpenseScreen() {
  const monthList = Array.from({ length: moment().month() + 1 }, (_, i) =>
    moment().month(i).format("MMMM")
  );
  const [months, setMonths] = useState<any>(monthList.reverse());
  const [dateList, setDateList] = useState<any>([]);
  const [currentDay, setCurrentDay] = useState<any>(moment().format("D"));
  const [monthValue, setMonthValue] = useState<any>(moment().format("MMMM"));
  const [openDropDown, setOpenDropDown] = useState<any>(false);
  const flatListRef = useRef<any>(null);
  const scrollToBeginning = () => {
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  };
  const handleMonthSelection = (val:string) => {
    setMonthValue(val);
    scrollToBeginning();
    setOpenDropDown(false);
  };
  useEffect(() => {
    const list = getDateList(monthValue);
    setDateList(list);
    setCurrentDay(list[0].date);
  }, [monthValue]);
  return (
    <GestureHandlerRootView>
      <ScrollView className="mb-12" nestedScrollEnabled={true}>
        <ExpenseHeader
          monthValue={monthValue}
          // setMonthValue={setMonthValue}
          currentDay={currentDay}
          setCurrentDay={setCurrentDay}
          dateList={dateList}
          ref={flatListRef}
          setOpenDropDown={setOpenDropDown}
          openDropDown={openDropDown}
        />
        <ExpenseList />
        {openDropDown && (
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            className="absolute w-28 h-auto bg-gray-100 top-[18%] left-[65%] rounded-3xl border-[0.5px] border-gray-20"
          >
            {months.map((month:string, i:number) => (
              <TouchableOpacity
                key={i}
                onPress={() => handleMonthSelection(month)}
              >
                <Text className="text-center text-gray-10 p-2 py-3">
                  {month}
                </Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        )}
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const getDateList = (month:string) => {
  if (month === moment().format("MMMM")) {
    const today = Number(moment().format("D"));
    const days = [];
    for (let i = today; i >= 1; i--) {
      const date = moment(`${month}-${i}`, "MMMM-D");
      days.push({
        date: i,
        day: date.format("ddd"),
      });
    }
    return days;
  } else {
    const daysInMonth = moment(`${month}`, "MMMM").daysInMonth();
    const days = [];
    for (let i = daysInMonth; i >= 1; i--) {
      const date = moment(`${month}-${i}`, "MMMM-D");
      days.push({
        date: i,
        day: date.format("ddd"),
      });
    }
    return days;
  }
};
