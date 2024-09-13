import { Redirect } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function Home() {
  const {isSignedIn}=useAuth()
  return (
    isSignedIn?<Redirect href="/(root)/(tabs)/home"/>:<Redirect href="/(auth)/welcome"/>
  )
}