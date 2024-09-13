import { View, Text,Image,Alert } from 'react-native'
import { images } from '@/constants'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'
import { useOAuth } from '@clerk/clerk-expo'
import { googleOAuth } from '@/lib/auth'


export default function SignIn() {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  
  const handleSignInWithGoogle=async()=>{
    const result = await googleOAuth(startOAuthFlow);
    console.log(result)
    if (result.code === "session_exists") {
      Alert.alert("Success", "Session exists. Redirecting to home screen.");
      router.replace("/(root)/(tabs)/home");
    }

    Alert.alert(result.success ? "Success" : "Error", result.message);
    router.replace("/(root)/(tabs)/home")

  }
  return (
    <View className='flex-1 items-center relative px-5'>
      <Text className='font-JakartaSemiBold text-xl mt-12 text-center text-gray-20 capitalize'>Sign Into your your account to unlock your experience </Text>
      <Text className='text-center mt-5 text-gray-30 text-sm font-extralight'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis quisquam quidem temporibus voluptatibus assumenda enim, vitae esse ipsam aliquam, iusto aperiam beatae aliquid</Text>
      <Image source={images.sign_up} resizeMode='contain' className='w-2/3 h-[200px] mt-14'/>
      <CustomButton onPress={handleSignInWithGoogle} title='Sign In with Google' bgVariant='secondary' textVariant="secondary" className='border-[0.5px] border-gray-20 mt-5' IconLeft={()=><Image source={images.google} className='h-5 w-5 mx-2' resizeMode='contain'/>}/>
      <Image source={images.logo} resizeMode='contain' className='w-full h-[300px] absolute -bottom-10'/>
    </View>
  )
}