import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import useThemeColors from '@/hooks/useThemeColors'

const AuthLayout = () => {
  const colors =  useThemeColors()
  return (
    <Stack>
      {/* <Stack.Screen name='index' options={{headerShown: false }}/> */}
      {/* <Stack.Screen name='edit-profile' options={{headerShown: false }}/> */}
      <Stack.Screen name='index' options={{headerShown: true, 
        title: "Post an Ad", headerTitleAlign:'center',
        headerTintColor: colors.foregroundCode, 
        headerStyle: {backgroundColor: colors.backgroundCode} 
      }}
         />
      
    </Stack>
    
  )
}

export default AuthLayout