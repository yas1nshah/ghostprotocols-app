import { View, Text, Image, TouchableOpacity, ScrollView, Switch } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { BlurView } from 'expo-blur'
import { useColorScheme } from "nativewind";
import ThemedText from '@/components/ThemedText';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import AnimatedHeader from '@/components/AnimatedHeader';

import qrImage from '@/assets/icons/qr.png';
import arrTopRight from '@/assets/icons/arrow-top-right.png';
import editIcon from '@/assets/icons/edit.png';
import heartIcon from '@/assets/icons/heart.png';
import adsIcon from '@/assets/icons/ads.png';
import servicesIcon from '@/assets/icons/services.png';
import subscriptionsIcon from '@/assets/icons/subscriptions.png';
import darkThemeIcon from '@/assets/icons/dark-theme.png';
import instagramIcon from '@/assets/icons/instagram.png';
import facebookIcon from '@/assets/icons/facebook.png';
import whatsappIcon from '@/assets/icons/whatsapp.png';
import tiktokIcon from '@/assets/icons/tiktok.png';
import useThemeColors from '@/hooks/useThemeColors';



const SettingsScreen = () => {
  const colors = useThemeColors()
  const {colorScheme} = useColorScheme()
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
    <View className='bg-light-background dark:bg-dark-background h-full p-4'>
      
      {/* SPACER */}
      <View className='h-12'/>
      
      {/* ANIMATED HEADER */}
      <AnimatedHeader opacity={opacity} title='Demand List'/>
      
      <ScrollView
        ref={scrollViewRef} 
        onScroll={handleScroll} 
        scrollEventThrottle={16} 
        showsVerticalScrollIndicator={false}
        >

            
          {/* HEADER */}
          <ThemedText type='heading-xl' content='Demand List' otherStyles='pb-4 pt-12' />
          <View className='bg-light-card dark:bg-dark-card p-4 rounded-xl'>
            <View className=' flex-row'>
              <View className='mx-2 w-2'>
                <ThemedText type='content' content='1'/>
              </View>
              <View className='px-2 flex-grow w-2/4'>
                <ThemedText type='content' content='Merc W140 Req in Lahore fhfhffhfhhffhfhhfhfhf'/>
              </View>
              <View className='px-2'>
                <ThemedText type='content' content='38 Days Ago'/>
              </View>
              
            </View> 
            
            <View className='w-full border-t-2 border-light-muted/20 my-4'/>

            <View className=' flex-row'>
              <View className='mx-2 w-2'>
                <ThemedText type='content' content='2'/>
              </View>
              <View className='px-2 flex-grow w-2/4'>
                <ThemedText type='content' content='Merc W140 Req in Lahore fhfhffhfhhffhfhhfhfhf'/>
              </View>
              <View className='px-2'>
                <ThemedText type='content' content='38 Days Ago'/>
              </View>
              
            </View>             
          </View>
        
        </ScrollView>
    </View>
  )
}

export default SettingsScreen