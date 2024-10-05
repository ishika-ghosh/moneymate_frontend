import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import BottomSheet from "../BottomSheet";
import CustomButton from "../CustomButton";
import { router } from "expo-router";
import { useUserInfoStore } from "@/store";
import Loading from "../Loading";
import { useAuth } from "@clerk/clerk-expo";
import { baseUrl } from "@/constants";

export default function AddCategoryForm() {
  const {setCategoryList,userCategoryList}=useUserInfoStore()
  const {getToken}=useAuth();
  const [icon, setIcon] = useState("💰");
  const [catName, setCatname] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submit, setSubmit] = useState(false);

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
        const icon=String(res.data.result.trim())
        const emojiRegex = /([\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F700}-\u{1F77F}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{1F100}-\u{1F1FF}]|[\u{1F200}-\u{1F2FF}]|[\u{1F400}-\u{1F4FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{2B50}]|[\u{231A}]|[\u{23F0}]|[\u{23F3}]|[\u{24C2}]|[\u{25AA}]|[\u{25AB}]|[\u{25B6}]|[\u{25C0}]|[\u{2934}]|[\u{2935}]|[\u{3297}]|[\u{3299}]|[\u{303D}]|[\u{00A9}]|[\u{00AE}]|[\u{203C}]|[\u{2049}]|[\u{2122}]|[\u{2139}]|[\u{2194}-\u{21AA}]|[\u{2B06}-\u{2B07}]|[\u{2934}-\u{2935}]|[\u{25B6}-\u{25C0}]|[\u{2600}-\u{26FF}]|[\u{1F004}]|[\u{1F0CF}])/gu;
        const match = icon.match(emojiRegex);
        setIcon(match ? match[0] : "")
        setLoading(false);
        setSubmit(true)
      })
      .catch((err) => console.log(err));
  };
  const handleSubmit = async() => {
    const token=await getToken();
    const catData = {
      name: catName,
      icon: icon,
    };
    setSubmitLoading(true);
    try {
    const {data:{data}}= await axios.post(`${baseUrl}/category`,catData,{
      headers:{
        Authorization:`bearer ${token}`
      }
    })
    const newList=[...userCategoryList,data]
    setCategoryList({categoryList:newList})  
    router.push("/(root)/(tabs)/home")
      
    } catch (error) {
      console.log(error)
      Alert.prompt("oops!","something went wrong .please try again later")
    }
    setCatname("");
    setIcon("💰")
    setSubmitLoading(false);
  };
  return (
    submitLoading?<Loading/>:
    <KeyboardAvoidingView
      className="w-full items-center mt-3"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >

        <View className="w-[80%] pb-7 bg-gray-80 rounded-2xl flex items-center">
          <View
            className={`w-16 h-16 flex items-center justify-center mt-7 bg-gray-70 rounded-full border-[3px] border-white overflow-hidden`}
          >
            {loading ? (
              <ActivityIndicator color={"white"}/>
            ) : (
              <Text className="text-2xl">{icon}</Text>
            )}
          </View>
            <Text className="text-gray-20 mt-3 text-lg font-JakartaBold">Category</Text>
          <TextInput
            className="text-md border-gray-10 text-gray-10 border-[1px] px-3 w-[80%] rounded-lg mt-10 py-2"
            placeholder="Category Name"
            placeholderTextColor={"white"}
            onChangeText={(e) =>{ setCatname(e); setSubmit(false)}}
            value={catName}
          />
          {catName.length>0 && (!submit ?
                  <CustomButton title="Ready to Add" 
                        IconRight={()=><Entypo name="arrow-bold-right" size={30} color="#608bbb" />} 
                        bgVariant="secondary"
                        textVariant="primary" 
                        onPress={handlePress} 
                        className="border-[0.5px] border-primary-100 mt-5 rounded-xl w-[80%]"/>:
                  <CustomButton title="Submit" 
                        onPress={handleSubmit} 
                        className="mt-5 mx-3 p-2 bg-primary-100 w-[80%] rounded-lg z-1"/>            
                      )               
          }
        </View>

    </KeyboardAvoidingView>
  );
}
