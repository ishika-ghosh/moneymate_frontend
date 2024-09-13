import { View, Text } from 'react-native'
import { useUser } from '@clerk/clerk-expo';
import HomeHeader from '@/components/home/HomeHeader'

export default function RootHome() {
  const { user } = useUser();
  return (
    <View>
      <HomeHeader name={user?.externalAccounts[0].firstName} profilePicture={user?.externalAccounts[0].imageUrl || ""}/>
    </View>
  )
}