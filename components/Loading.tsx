import { View, Text, ActivityIndicator } from 'react-native'


export default function Loading() {
  return (
    <View className='flex-1 flex items-center justify-center h-screen'>
      <ActivityIndicator color={"white"} size={40}/>
      <Text className='text-gray-30 text-lg text-center font-JakartaSemiBold mt-2'>Loading data..</Text>
    </View>
  )
}