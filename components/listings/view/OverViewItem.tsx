import { View, Text, Image, ImageSourcePropType } from 'react-native'
import React from 'react'
import ThemedText from '@/components/ThemedText'
import useThemeColors from '@/hooks/useThemeColors'

type props = {
    img: ImageSourcePropType;
    title: string;
    value: string;
}

const OverViewItem = (props: props) => {
    const colors = useThemeColors()
  return (
    <View className='px-2 items-center'>
    <View className='w-8 h-8 m-2'>
      <Image 
        source={props.img}
        style={{ height: '100%', width: '100%', resizeMode: 'contain', tintColor: colors.foregroundCode }}
        />
    </View>
    <View className='items-start'>

      <ThemedText
      content={props.title}
      type='content'
      otherStyles='opacity-60'
      />
      <ThemedText
      content={props.value}
      type='subheading'
      />
    </View>
  </View>
  )
}

export default OverViewItem