import { View, Text,Image, Pressable } from 'react-native'
import { useAuth } from '@clerk/clerk-expo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { images } from '@/constants';
import { router } from 'expo-router';
import { useUserInfoStore } from '@/store';

export default function Settings() {
  const {userName,userEmail,userImageUrl}=useUserInfoStore(state=>state)
  const {signOut}=useAuth()
  const handleSignOut=()=>{
    signOut();
    router.replace("/(auth)/sign_in")
  }
  return (
    <View>
      <Text className='text-gray-10 font-JakartaExtraBold text-xl text-center'>Settings</Text>
      <Pressable className='w-full flex items-end justify-end px-10 mt-5' onPress={handleSignOut}>
        <FontAwesome name="sign-out" size={24} color="white" />
      </Pressable>
      <View className='w-full flex items-center justify-center'>
        <Image source={userImageUrl?{uri:userImageUrl}:images.person} className='w-28 h-28 rounded-full'/>
        <Text className='text-gray-10 font-JakartaBold text-2xl mt-4'>{userName}</Text>
        <Text className='text-gray-10 font-JakartaBold text-2xl mt-4'>{userEmail}</Text>
      </View>

    </View>
  )
}