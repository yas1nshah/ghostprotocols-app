import { View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { SharedValue } from 'react-native-reanimated';
import ThemedText from './ThemedText';
import { useColorScheme } from 'nativewind';


const AnimatedHeader = ({opacity, title}: {opacity: SharedValue<number>, title: string}) => {

  const insets = useSafeAreaInsets();
  return (
    <View   
        className='w-screen z-10  bg-light-background dark:bg-dark-background justify-end items-center absolute top-0 pb-4'
        style={{height: insets.top + 50}}
        >
          <Animated.View style={{opacity: opacity}}>
            <ThemedText type='heading' content={title}/>
          </Animated.View>
       
      </View>
  )
}

export default AnimatedHeader