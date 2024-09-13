import { Text,Image,View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'

export default function Onboarding() {
  return (
    <SafeAreaView className="flex-1 items-center relative">
      <Image source={images.onboarding} className="w-full h-1/2"
              resizeMode="contain"/>

              <View className="flex flex-row items-center justify-center w-full mt-5">
              <Text className="text-gray-10 text-2xl font-bold mx-10 text-center font-JakartaBold">
                Welcome to MoneyMate
              </Text>
            </View>
            <Text className="text-md font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, earum ullam dicta ipsam fugiat veritatis 
            </Text>
      

            <CustomButton
        title="Get Started"
        onPress={() =>{router.replace("/(auth)/sign_in")}}
        className="w-11/12 mt-10 mb-5 absolute bottom-10"
        />
      
              
    </SafeAreaView>
  )
}