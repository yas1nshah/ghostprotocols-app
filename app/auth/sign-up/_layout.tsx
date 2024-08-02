import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import useThemeColors from '@/hooks/useThemeColors'

const AuthLayout = () => {
  const colors =  useThemeColors()
  return (
    <Stack>
      
      <Stack.Screen
        name="index"
        options={{
          // presentation: 'modal',
          headerTitle: "Authentication", // Change the title here
          headerShown: false,
         
        }}
      />
      <Stack.Screen
        name="user-details"
        options={{
          // presentation: 'modal',
          headerTitle: "Authentication", // Change the title here
          headerShown: false,
         
        }}
      />
      <Stack.Screen
        name="select-city"
        options={{
          // presentation: 'modal',
          headerTitle: "Authentication", // Change the title here
          headerShown: false,
         
        }}
      />
      <Stack.Screen
        name="dealer-details"
        options={{
          headerStyle: {backgroundColor: colors.backgroundCode},
          headerTintColor: colors.foregroundCode,
          // presentation: 'modal',
          headerTitle: "Create an Account", // Change the title here
          headerShown: false,
         
        }}
      />
    </Stack>
    
  )
}

export default AuthLayout