import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function Layout() {
  const {isSignedIn}=useAuth()
  return (
    isSignedIn?
    <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name='(tabs)'/>
        <Stack.Screen name='settings'/>
        <Stack.Screen name='add-category'/>
        <Stack.Screen name='[addBudget]'/>
        <Stack.Screen name='(budget)'/>
    </Stack>:<Redirect href="/(auth)/sign_in"/>
  )
}