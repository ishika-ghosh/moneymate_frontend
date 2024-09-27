import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import Animated,{
  useSharedValue,
  useAnimatedScrollHandler,
  FadeInLeft,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useUserInfoStore } from "@/store";




const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("screen");
const TOTAL_WIDTH = DEVICE_WIDTH * 0.5;
export const SPACER = (DEVICE_WIDTH - TOTAL_WIDTH) / 2;



export default function CategorySlider({
  selectedCategory,
  setSelectedCategory,
}:any) {
  const scrollX = useSharedValue(0);
  const {userCategoryList}=useUserInfoStore();
  const handleScroll = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  }, []);

 
  return (
    <Animated.View
      className="bg-gray-80 rounded-b-3xl flex flex-col items-center"
      style={{ height: DEVICE_HEIGHT / 2 }}
      entering={FadeInLeft.duration(2000)}
    >
      <Text className="text-gray-10 text-3xl font-bold mt-14 w-[70%] mx-auto text-center tracking-widest">
        Add new Expense
      </Text>
      <View className="h-[56%] w-full mx-auto mt-10">
        <Animated.FlatList
          pagingEnabled
          data={[{_id:0,name:""},...userCategoryList,{_id:2,name:""}]}
          onScroll={handleScroll}
          decelerationRate={"fast"}
          renderItem={({ item, index }) => (
            <RenderItem
              item={item}
              index={index}
              scrollX={scrollX}
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
          )}
          keyExtractor={(item:any) => item._id}
          horizontal={true}
          snapToInterval={TOTAL_WIDTH}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          className="w-auto mx-auto"
        />
      </View>
    </Animated.View>
  );
}


const RenderItem = ({
  item,
  index,
  scrollX,
  setSelectedCategory,
  selectedCategory,
}:any) => {
  const bgclasses = `w-[80%] rounded-3xl bg-white h-[60%] mb-2 flex items-center justify-center bg-${item.bgColor} ` ;
  const handleSelect = () => {
    setSelectedCategory(item._id);
  };
  if (item.name.length === 0) {
    return <View style={{ width: SPACER }}></View>;
  }
  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      [
        (index - 2) * TOTAL_WIDTH,
        (index - 1) * TOTAL_WIDTH,
        index * TOTAL_WIDTH,
      ],
      [0.9, 1, 0.9],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(scale, [0.9, 1], [0.7, 1], Extrapolation.CLAMP);
    return {
      transform: [{ scale }],
      opacity,
    };
  }, []);
  return (
    <Animated.View
      style={[styles.image, rStyle]}
      className="flex flex-col items-center justify-center"
    >
      <TouchableOpacity
        className={bgclasses}
        onPress={handleSelect}
      >
        <Text className="text-6xl border-[1px] border-white p-4 rounded-3xl">{item.icon}</Text>
      </TouchableOpacity>
      <Text className="text-lg text-gray-10 font-JakartaExtraBold mb-2">{item.name}</Text>
      {selectedCategory=== item._id && (
        <Ionicons
          name="checkmark-circle"
          size={30}
          color="#608bbb"
          style={{ backgroundColor: "white", borderRadius: 50 }}
        />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: TOTAL_WIDTH,
  },
});
