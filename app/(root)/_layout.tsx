import { View, Text } from 'react-native'
import React from 'react'
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
    </Stack>:<Redirect href="/(auth)/sign_in"/>
  )
}