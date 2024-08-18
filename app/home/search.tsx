import { View, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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

import sellNowImg from '@/assets/images/ui/sell-now.png';
import postAdImg from '@/assets/images/ui/post-ad.png';
import darkBackground from '@/assets/images/bg-dark.png'; 

import FeaturedAutoPlay from '@/components/FeaturedAutoPlay';
import { router } from 'expo-router';

const AddListingScreen = () => {
  const colors = useThemeColors();
  const { colorScheme } = useColorScheme();
  const insets = useSafeAreaInsets();

  const scrollViewRef = useRef(null);
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
    if (scrollPercentage > 20 && !showHeader) {
      setShowHeader(true);
    } else if (scrollPercentage <= 20 && showHeader) {
      setShowHeader(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Background Image */}
      <ImageBackground
        source={darkBackground}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        {/* Overlay with Opacity */}
       

        {/* SPACER */}
        <View className='h-12' />

        {/* ANIMATED HEADER */}
        <AnimatedHeader opacity={opacity} title='Add Listing' />

        <ScrollView
          ref={scrollViewRef}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER */}
          <ThemedText type='heading-xl' content='Add Listing' otherStyles='pb-4 pt-12' />

          {/* Sell Now Section */}
          <View className='p-4 my-2 rounded-xl bg-light-card dark:bg-dark-card flex-row items-center'>
            <View className='pr-4 w-3/5'>
              <View className='flex-row items-center'>
                <ThemedText content='Let Team GP ' type='heading' />
                <ThemedText content='Sell' type='heading' otherStyles='text-light-primary dark:text-dark-primary' />
              </View>

              <ThemedText content='Hassle-Free Dealings, Everything’s on Us' type='content' />

              <TouchableOpacity className='w-2/3 my-2 bg-light-background dark:bg-dark-background px-4 py-1 rounded-xl flex-row items-center justify-evenly'>
                <ThemedText content='SELL NOW' type='button' />
                <View className='w-8 h-8 p-1'>
                  <Image
                    source={arrTopRight}
                    style={{ height: '100%', width: '100%', resizeMode: 'contain', tintColor: colors.foregroundCode }}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View className='w-1/3 flex-grow'>
              <Image
                source={sellNowImg}
                style={{ width: '100%', height: undefined, aspectRatio: 1, resizeMode: 'contain' }}
              />
            </View>
          </View>

          {/* Post Ad Section */}
          <View className='p-4 my-2 rounded-xl bg-light-card dark:bg-dark-card flex-row items-center'>
            <View className='pr-4 w-3/5'>
              <View className='flex-row items-center'>
                <ThemedText content='Sell by GP ' type='heading' />
                <ThemedText content='APP' type='heading' otherStyles='text-light-primary dark:text-dark-primary' />
              </View>

              <ThemedText content='Post an AD for FREE and reach thousands of Buyers' type='content' />

              <TouchableOpacity
                onPress={() => router.push('/home/addListing/add-car-form')}
                className='w-2/3 my-2 bg-light-background dark:bg-dark-background px-4 py-1 rounded-xl flex-row items-center justify-evenly'
              >
                <ThemedText content='POST AD' type='button' />
                <View className='w-8 h-8 p-1'>
                  <Image
                    source={arrTopRight}
                    style={{ height: '100%', width: '100%', resizeMode: 'contain', tintColor: colors.foregroundCode }}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View className='w-1/3 flex-grow'>
              <Image
                source={postAdImg}
                style={{ width: '100%', height: undefined, aspectRatio: 1, resizeMode: 'contain' }}
              />
            </View>
          </View>

          <View className='h-12' />

          {/* Trust Section */}
          <View className='p-6 rounded-xl blur-3xl bg-light-card dark:bg-dark-card items-center space-y-1'>
            <ThemedText type='heading' content='Why should you Trust Us?' />

            <View className='h-7' />

            <View className='flex-row gap-2'>
              <View className='p-4 mt-5 w-1/2 rounded-xl bg-light-card dark:bg-dark-card items-center'>
                <View className='bg-light-primary dark:bg-dark-primary rounded-full p-2 w-11 -mt-8 mb-3 items-center'>
                  <ThemedText type='heading' content='#1' />
                </View>
                <ThemedText type='content' content={`Pakistan's upcoming marketplace`} />
              </View>

              <View className='p-4 mt-5 w-1/2 rounded-xl bg-light-card dark:bg-dark-card items-center'>
                <View className='bg-light-primary dark:bg-dark-primary rounded-full p-2 w-11 -mt-8 mb-3 items-center'>
                  <ThemedText type='heading' content='#1' />
                </View>
                <ThemedText type='content' content={`Pakistan's upcoming marketplace`} />
              </View>
            </View>

            <View className='flex-row gap-2'>
              <View className='p-4 mb-5 w-1/2 rounded-xl bg-light-card dark:bg-dark-card items-center'>
                <ThemedText type='content' content={`Pakistan's upcoming marketplace`} />
                <View className='bg-light-primary dark:bg-dark-primary rounded-full p-2 mt-2 w-11 -mb-8 items-center'>
                  <ThemedText type='heading' content='#1' />
                </View>
              </View>

              <View className='p-4 mb-5 w-1/2 rounded-xl bg-light-card dark:bg-dark-card items-center'>
                <ThemedText type='content' content={`Pakistan's upcoming marketplace`} />
                <View className='bg-light-primary dark:bg-dark-primary rounded-full p-2 mt-2 w-11 -mb-8 items-center'>
                  <ThemedText type='heading' content='#1' />
                </View>
              </View>
            </View>
          </View>

          <View className='h-12' />

          <FeaturedAutoPlay />

          <View className='h-12' />
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default AddListingScreen;
