import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import useThemeColors from '@/hooks/useThemeColors'

const AuthLayout = () => {
  const colors =  useThemeColors()
  return (
    <Stack>
      <Stack.Screen name='index' options={{headerShown: false }}/>
      <Stack.Screen
        name="sign-in"
        options={{
          presentation: 'modal',
          headerTitle: "Authentication", // Change the title here
          headerShown: false,
         
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          headerStyle: {backgroundColor: colors.backgroundCode},
          headerTintColor: colors.foregroundCode,
          presentation: 'modal',
          headerTitle: "Create an Account", // Change the title here
          headerShown: false,
         
        }}
      />
    </Stack>
    
  )
}

export default AuthLayout