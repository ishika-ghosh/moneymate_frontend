import { Stack } from "expo-router"

export default function AuthLayout() {
  return (
    <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name="sign_in" options={{ headerShown: false }} />
        <Stack.Screen name="welcome" />
      </Stack>
  )
}