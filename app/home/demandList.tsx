import { View, Text, Image, TouchableOpacity, ScrollView, Switch, ImageBackground } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { BlurView } from 'expo-blur'
import { useColorScheme } from "nativewind";
import ThemedText from '@/components/ThemedText';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import AnimatedHeader from '@/components/AnimatedHeader';

import useThemeColors from '@/hooks/useThemeColors';

import darkBackground from '@/assets/images/dark-bg.png';

const SettingsScreen = () => {
  const colors = useThemeColors();
  const { colorScheme } = useColorScheme();
  const insets = useSafeAreaInsets();

  const scrollViewRef = useRef(null); // Create a ref for the ScrollView
  const opacity = useSharedValue(0);
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    opacity.value = withSpring(showHeader ? 1 : 0);
  }, [showHeader]);

  const handleScroll = (event: any) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    const scrollPercentage = (contentOffsetY / (contentHeight - layoutHeight)) * 100;
    if (scrollPercentage > 40 && !showHeader) {
      setShowHeader(true);
    } else if (scrollPercentage <= 40 && showHeader) {
      setShowHeader(false);
    }
  };

  return (
    <View className='bg-light-background dark:bg-dark-background h-full'>
      {colorScheme === 'dark' && (
        <ImageBackground
          source={darkBackground}
          style={{ flex: 1 , opacity: 1}}
          resizeMode="cover"
        >
          {/* SPACER */}
          <View className='h-12' />

          {/* ANIMATED HEADER */}
          <AnimatedHeader opacity={opacity} title='Demand List' />

          <ScrollView
            ref={scrollViewRef}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 16 }}
          >

            {/* HEADER */}
            <ThemedText type='heading-xl' content='Demand List' otherStyles='pb-4 pt-12' />
            <View className='bg-light-card dark:bg-dark-card p-4 rounded-xl'>
              <View className='flex-row'>
                <View className='mx-2 w-2'>
                  <ThemedText type='content' content='1' />
                </View>
                <View className='px-2 flex-grow w-2/4'>
                  <ThemedText type='content' content='Merc W140 Req in Lahore fhfhffhfhhffhfhhfhfhf' />
                </View>
                <View className='px-2'>
                  <ThemedText type='content' content='38 Days Ago' />
                </View>
              </View>

              <View className='w-full border-t-2 border-light-muted/20 my-4' />

              <View className='flex-row'>
                <View className='mx-2 w-2'>
                  <ThemedText type='content' content='2' />
                </View>
                <View className='px-2 flex-grow w-2/4'>
                  <ThemedText type='content' content='Merc W140 Req in Lahore fhfhffhfhhffhfhhfhfhf' />
                </View>
                <View className='px-2'>
                  <ThemedText type='content' content='38 Days Ago' />
                </View>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      )}
      {colorScheme !== 'dark' && (
        <View className='bg-light-background h-full'>
          {/* SPACER */}
          <View className='h-12' />

          {/* ANIMATED HEADER */}
          <AnimatedHeader opacity={opacity} title='Demand List' />

          <ScrollView
            ref={scrollViewRef}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 16 }}
          >

            {/* HEADER */}
            <ThemedText type='heading-xl' content='Demand List' otherStyles='pb-4 pt-12' />
            <View className='bg-light-card dark:bg-dark-card p-4 rounded-xl'>
              <View className='flex-row'>
                <View className='mx-2 w-2'>
                  <ThemedText type='content' content='1' />
                </View>
                <View className='px-2 flex-grow w-2/4'>
                  <ThemedText type='content' content='Merc W140 Req in Lahore fhfhffhfhhffhfhhfhfhf' />
                </View>
                <View className='px-2'>
                  <ThemedText type='content' content='38 Days Ago' />
                </View>
              </View>

              <View className='w-full border-t-2 border-light-muted/20 my-4' />

              <View className='flex-row'>
                <View className='mx-2 w-2'>
                  <ThemedText type='content' content='2' />
                </View>
                <View className='px-2 flex-grow w-2/4'>
                  <ThemedText type='content' content='Merc W140 Req in Lahore fhfhffhfhhffhfhhfhfhf' />
                </View>
                <View className='px-2'>
                  <ThemedText type='content' content='38 Days Ago' />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  )
}

export default SettingsScreen;
