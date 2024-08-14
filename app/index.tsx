import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const IndexScreen = () => {
  
  return (
    <View  className={`items-center justify-center h-full`}>
        <Link href={'/auth/sign-up'}>
            <Text>IndexScreen</Text>
        </Link>
        <View className='h-4'></View>
        <Link href={'/home'}>
            <Text>HomeScreen</Text>
        </Link>
        <View className='h-4'></View>
        <Link href={'/select/models'}>
            <Text>Select</Text>
        </Link>

        <View className='h-4'></View>
        <Link className='h-4' href={'/add-listing'}>
            <Text>Add Listing</Text>
        </Link>
    </View>
  )
}

export default IndexScreen