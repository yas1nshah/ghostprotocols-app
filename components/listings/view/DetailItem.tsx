import { View, Text } from 'react-native'
import React from 'react'
import ThemedText from '@/components/ThemedText';

type props = {
    title: string;
    value: string;
}

const DetailItem = (props: props) => {
  return (
    <View className='flex-row  justify-between px-2 py-4 border-b-2 border-light-muted/5 dark:border-dark-muted/5'>
      <ThemedText
      type='subheading'
      content={props.title}
      otherStyles='font-iRegular opacity-70'
      />

      <ThemedText
      type='subheading'
      content={props.value}
      />
    </View>
  )
}

export default DetailItem