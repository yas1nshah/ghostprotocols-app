import { View, Text } from 'react-native'
import React from 'react'

type props = {
    content: string;
    otherStyles?: string;
    type: 'heading' | 'heading-xl' | 'subheading' | 'content' | 'link' | 'button'
}

const ThemedText = (props:props) => {
  return (
    <View>
      <Text className={`text-light-foreground dark:text-dark-foreground font-iRegular 
      ${props.type === 'heading-xl' && "text-4xl font-bold font-iSemiBold"}
      ${props.type === 'heading' && "text-xl font-bold font-iSemiBold"}
      ${props.type === 'subheading' && "text-base font-iSemiBold "}
      ${props.type === 'content' && "text-normal font-normal"}
      ${props.type === 'link' && "text-normal font-semibold text-light-primary dark:text-dark-primary"}
      ${props.type === 'button' && "font-bold text-base text-center iSemiBold"}
      ${props.otherStyles} 
      `}>{props.content}</Text>
    </View>
  )
}

export default ThemedText