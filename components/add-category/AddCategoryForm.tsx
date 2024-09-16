import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import BottomSheet from "../BottomSheet";
import CustomButton from "../CustomButton";

export default function AddCategoryForm() {
  const [bgColor, setBgColor] = useState("pink-500");
  const [icon, setIcon] = useState("🙂");
  const [catName, setCatname] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [budget, setBudget] = useState(0);

  const handlePress = () => {
    setLoading(true);
    axios
      .post(
        "https://www.emojai.app/api/generate",
        { emoji: catName, temperature: 0.25 },
        {
          headers: {
            accept: "*/*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json",
            priority: "u=1, i",
            "sec-ch-ua":
              '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-platform": '"Android"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            Referer: "https://www.emojai.app/?via=topaitools",
            "Referrer-Policy": "strict-origin-when-cross-origin",
          },
        }
      )
      .then((res) => {
        setIcon(res.data.result.trim());
        setLoading(false);
        setShowModal(true);
      })
      .catch((err) => console.log(err));
  };
  const handleSubmit = () => {
    const catData = {
      name: catName,
      icon: icon,
      budget: budget,
      bgColor: bgColor,
    };
    console.log(catData);
  };
  return (
    <KeyboardAvoidingView
      className="w-full flex-1 items-center"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ flex: 1,alignItems:"center" }}>
        <View className="w-[80%] basis-1/3 mx-3 bg-gray-80 rounded-2xl flex items-center h-full">
          <View
            className={`w-16 h-16 flex items-center justify-center mt-10 bg-${bgColor} rounded-full border-[3px] border-white overflow-hidden`}
          >
            {loading ? (
              <ActivityIndicator color={"white"}/>
            ) : (
              <Text className="text-2xl">{icon}</Text>
            )}
          </View>
          <View className="w-full flex flex-row items-center justify-between px-5 mt-10">
            <TouchableOpacity
              className="w-9 h-9 bg-primary-100 rounded-3xl border-[2px] border-white"
              onPress={() => setBgColor("primary-100")}
            />
            <TouchableOpacity
              className="w-9 h-9 bg-primary-200 rounded-3xl border-[2px] border-white"
              onPress={() => setBgColor("primary-200")}
            />
            <TouchableOpacity
              className="w-9 h-9 bg-primary-300 rounded-3xl border-[2px] border-white"
              onPress={() => setBgColor("primary-300")}
            />
            <TouchableOpacity
              className="w-9 h-9 bg-primary-400 rounded-3xl border-[2px] border-white"
              onPress={() => setBgColor("primary-400")}
            />
          </View>
        </View>
        <View className="w-full items-center mt-5 flex-col px-7 justify-around">
          <TextInput
            className="text-md border-gray-10 text-gray-10 border-[1px] mx-3 p-3 w-full rounded-xl"
            placeholder="Category Name"
            placeholderTextColor={"white"}
            onChangeText={(e) =>{ setCatname(e); setSubmit(false)}}
            value={catName}
          />
          {catName.length>0 && !submit &&
          <CustomButton title="Ready to Add" 
                        IconRight={()=><Entypo name="arrow-bold-right" size={30} color="#608bbb" />} 
                        bgVariant="secondary"
                        textVariant="primary" 
                        onPress={handlePress} 
                        className="border-[0.5px] border-primary-100 mt-5 rounded-xl"/>}
            {/* <TouchableOpacity
            className="mr-2"
            onPress={handlePress}
            disabled={catName.length === 0}
          >
            <Entypo name="arrow-bold-right" size={30} color="white" />
          </TouchableOpacity> */}
        </View>

        {budget > 0 && (
          <View className="mt-5 mx-3 p-2 w-[80%] rounded-lg border-[1px] border-gray-50 flex-row items-center justify-between ">
            <Text className="text-center text-gray-10 text-lg font-bold">
              Monthly Plan : ₹ {budget}
            </Text>
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <AntDesign name="edit" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
        {submit && (
          <TouchableOpacity
            className="mt-5 mx-3 p-2 bg-primary-100 w-[80%] rounded-lg z-1"
            onPress={handleSubmit}
          >
            <Text className="text-center font-semibold text-gray-10 text-lg">
              Submit
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
        {showModal && (
          <BottomSheet
            setShowModal={setShowModal}
            budget={budget}
            setBudget={setBudget}
            setSubmit={setSubmit}
          />
        )}
    </KeyboardAvoidingView>
  );
}
