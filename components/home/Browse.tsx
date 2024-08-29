import { View, Text, Image } from 'react-native'
import React from 'react'
import ThemedText from '../ThemedText'
import useThemeColors from '@/hooks/useThemeColors'

import arrowIcon from '@/assets/icons/arrow-top-right.png'

const Browse = () => {
    const colors = useThemeColors()


  return (
    <View className='bg-light-card dark:bg-dark-card p-4 rounded-xl flex-row justify-between items-center'>
            <ThemedText
            content='Browse Cars'
            type='subheading'
            />
            <View className='w-6 h-6'>
              <Image 
                source={arrowIcon}
                style={{ height: '100%', width: '100%', resizeMode: 'contain', tintColor: colors.foregroundCode }}
                />
            </View>
          </View>
  )
}

export default Browse
