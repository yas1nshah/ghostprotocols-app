import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'
import useThemeColors from '@/hooks/useThemeColors'
import ThemedText from '@/components/ThemedText'

const AuthLayout = () => {
  const colors =  useThemeColors()
  return (
    <Stack>
      {/* <Stack.Screen name='index' options={{headerShown: false }}/> */}
      {/* <Stack.Screen name='edit-profile' options={{headerShown: false }}/> */}
      <Stack.Screen name='index' options={{headerShown: true, 
        title: "Car Info", headerTitleAlign:'center',
        headerTintColor: colors.foregroundCode, 
        headerStyle: {backgroundColor: colors.backgroundCode} 
      }}
         />
      <Stack.Screen name='year' options={{headerShown: true, 
        title: "Select Year", headerTitleAlign:'center',
        headerTintColor: colors.foregroundCode, 
        headerStyle: {backgroundColor: colors.backgroundCode} 
      }}
         />
      <Stack.Screen name='models' options={{headerShown: true, 
        title: "Select Model", headerTitleAlign:'center',
        headerTintColor: colors.foregroundCode, 
        headerStyle: {backgroundColor: colors.backgroundCode} 
      }}
         />
      <Stack.Screen name='transmission' options={{headerShown: true, 
        title: "Select Transmission", headerTitleAlign:'center',
        headerTintColor: colors.foregroundCode, 
        headerStyle: {backgroundColor: colors.backgroundCode} 
      }}
         />
      <Stack.Screen name='fuelType' options={{headerShown: true, 
        title: "Select Fuel Type", headerTitleAlign:'center',
        headerTintColor: colors.foregroundCode, 
        headerStyle: {backgroundColor: colors.backgroundCode} 
      }}
         />
      <Stack.Screen name='bodyType' options={{headerShown: true, 
        title: "Select Body Type", headerTitleAlign:'center',
        headerTintColor: colors.foregroundCode, 
        headerStyle: {backgroundColor: colors.backgroundCode} 
      }}
         />
      <Stack.Screen name='version' options={{headerShown: true, 
        title: "Select Version", headerTitleAlign:'center',
        headerTintColor: colors.foregroundCode, 
        headerStyle: {backgroundColor: colors.backgroundCode},
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              // Handle "Skip" button press
              console.log('Skip pressed');
              // For example, navigate to another screen
              router.back(); // Replace with your screen name
            }}
            style={{ marginRight: 10 }}
          >
            <ThemedText content='Skip' type='link'/>
          </TouchableOpacity>
        ), 
      }}
         />
    
      
    </Stack>
    
  )
}

export default AuthLayout