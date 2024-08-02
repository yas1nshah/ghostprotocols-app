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
      <AnimatedHeader opacity={opacity} title='Settings'/>
      
      <ScrollView
        ref={scrollViewRef} 
        onScroll={handleScroll} 
        scrollEventThrottle={16} 
        showsVerticalScrollIndicator={false}
        >

            
            {/* HEADER */}
            <ThemedText type='heading-xl' content='Settings' otherStyles='pb-4 pt-12' />
            
            <View  className='p-2 mb-2 bg-light-card dark:bg-dark-card rounded-xl'>
                    <View className='flex-row'>
                        <View className='h-16 w-16 rounded-full overflow-hidden mx-2 bg-light-muted dark:bg-dark-muted'>
                            <Image 
                                source={{ uri: 'https://ienglishstatus.com/wp-content/uploads/2022/02/Bad-Boy-Whatsapp-DP.jpg' }}
                                style={{ height: '100%', width: '100%' }}
                            />
                        </View>

                    <View className='px-2 justify-start  flex-grow'>
                        <ThemedText type='heading' content='Ghost Protocols' />
                        <ThemedText type='content' content='Ghost Protocols' />
                    </View>
                
                
                    <View className='p-3 h-10 w-10 bg-light-card dark:bg-dark-card rounded-full justify-start'>
                        <TouchableOpacity>
                            <Image 
                            source={qrImage}
                            style={{ height: '100%', width: '100%', resizeMode: 'contain', tintColor: colors.foregroundCode }}
                            />
                        </TouchableOpacity>
                    </View>
                    </View>
                    
                    <View className='w-full border-t-2 my-1 border-light-muted/10 dark:border-dark-muted/10 '/>
                    
                    <TouchableOpacity className='flex-row h-10'>
                        <View className='w-10 h-10 p-3'>
                            <Image 
                                source={editIcon}
                                style={{ height: '100%', width: '100%', resizeMode: 'contain', tintColor: colors.foregroundCode }}
                            />
                        </View>

                        <View className=' h-10 p-2 flex-grow'>
                            <ThemedText type='subheading' content='Edit Profile'/>
                        </View>

                        <View className='w-10 h-10 p-2'>
                            <Image 
                                source={arrTopRight}
                                style={{ height: '100%', width: '100%', resizeMode: 'contain', tintColor: colors.foregroundCode }}
                            />
                        </View>
                    </TouchableOpacity>
            </View>

                {/* Favourties */}
            <View  className='p-2 my-2 bg-light-card dark:bg-dark-card rounded-xl'>
                    
                        
                    <TouchableOpacity className='flex-row h-10'>
                        <View className='w-10 h-10 p-3'>
                            <Image 
                                source={heartIcon}
                                style={{ height: '100%', width: '100%', resizeMode: 'contain', tintColor: colors.foregroundCode }}
                            />
                        </View>

                        <View className=' h-10 p-2 flex-grow'>
                            <ThemedText type='subheading' content='Favorites'/>
                        </View>

                        <View className='w-10 h-10 p-2'>
                            <Image 
                                source={arrTopRight}
                                style={{ height: '100%', width: '100%', resizeMode: 'contain', tintColor: colors.foregroundCode }}
                            />
                        </View>
                    </TouchableOpacity>
            </View>

                {/* GP Services */}
            <View  className='p-2 my-2 bg-light-card dark:bg-dark-card rounded-xl'>
                    
                        
                    <TouchableOpacity className='flex-row h-10'>
                        <View className='w-10 h-10 p-3'>
                            <Image 
                                source={adsIcon}
                                style={{ height: '100%', width: '100%', resizeMode: 'contain', tintColor: colors.foregroundCode }}
                            />
                        </View>

                        <View className=' h-10 p-2 flex-grow'>
                            <ThemedText type='subheading' content='My Ads'/>
                        </View>

                        <View className='w-10 h-10 p-2'>
                            <Image 
                                source={arrTopRight}
                                style={{ height: '100%', width: '100%', resizeMode: 'contain', tintColor: colors.foregroundCode }}
                            />
                        </View>
                    </TouchableOpacity>

                    <View className='w-full border-t-2 my-1 border-light-muted/10 dark:border-dark-muted/10 '/>
                        
                    <TouchableOpacity className='flex-row h-10'>
                        <View className='w-10 h-10 p-3'>
                            <Image 
                                source={servicesIcon}
                                style={{ height: '100%', width: '100%', resizeMode: 'contain', tintColor: colors.foregroundCode }}
                            />
                        </View>

                        <View className=' h-10 p-2 flex-grow'>
                            <ThemedText type='subheading' content='GP Services'/>
                        </View>

                        <View className='w-10 h-10 p-2'>
                            <Image 
                                source={arrTopRight}
                                style={{ height: '100%', width: '100%', resizeMode: 'contain', tintColor: colors.foregroundCode }}
                            />
                        </View>
                    </TouchableOpacity>

                    <View className='w-full border-t-2 my-1 border-light-muted/10 dark:border-dark-muted/10 '/>

                    <TouchableOpacity className='flex-row h-10'>
                        <View className='w-10 h-10 p-3'>
                            <Image 
                                source={subscriptionsIcon}
                                style={{ height: '100%', width: '100%', resizeMode: 'contain', tintColor: colors.foregroundCode }}
                            />
                        </View>

                        <View className=' h-10 p-2 flex-grow'>
                            <ThemedText type='subheading' content='Subscriptions'/>
                        </View>

                        <View className='w-10 h-10 p-2'>
                            <Image 
                                source={arrTopRight}
                                style={{ height: '100%', width: '100%', resizeMode: 'contain', tintColor: colors.foregroundCode }}
                            />
                        </View>
                    </TouchableOpacity>

            </View>

                {/* General */}
            <View  className='p-2 my-2 bg-light-card dark:bg-dark-card rounded-xl'>
                    
                        
                <TouchableOpacity className='flex-row h-10'>
                    <View className='w-10 h-10 p-3'>
                        <Image 
                            source={darkThemeIcon}
                            style={{ height: '100%', width: '100%', resizeMode: 'contain', tintColor: colors.foregroundCode }}
                        />
                    </View>

                    <View className=' h-10 p-2 flex-grow'>
                        <ThemedText type='subheading' content='Dark Theme'/>
                    </View>
                    
                    <Switch 
                    onValueChange={() => {}}
                    value={false}
                    thumbColor={colors.backgroundCode}
                    trackColor={{ false: colors.mutedCode, true: colors.primaryCode }}
                    />
                    
                </TouchableOpacity>

            </View>

                {/* Socials */}
            <View  className='p-2 my-2 bg-light-card dark:bg-dark-card rounded-xl'>
                    
                        
                    <TouchableOpacity className='flex-row h-10'>
                        <View className='w-10 h-10 p-3'>
                            <Image 
                                source={instagramIcon}
                                style={{ height: '100%', width: '100%', resizeMode: 'contain', tintColor: colors.foregroundCode }}
                            />
                        </View>

                        <View className=' h-10 p-2 flex-grow'>
                            <ThemedText type='subheading' content='Open Instagram'/>
                        </View>

                        <View className='w-10 h-10 p-2'>
                            <Image 
                                source={arrTopRight}
                                style={{ height: '100%', width: '100%', resizeMode: 'contain', tintColor: colors.foregroundCode }}
                            />
                        </View>
                    </TouchableOpacity>

                    <View className='w-full border-t-2 my-1 border-light-muted/10 dark:border-dark-muted/10 '/>
                        
                    <TouchableOpacity className='flex-row h-10'>
                        <View className='w-10 h-10 p-3'>
                            <Image 
                                source={facebookIcon}
                                style={{ height: '100%', width: '100%', resizeMode: 'contain', tintColor: colors.foregroundCode }}
                            />
                        </View>

                        <View className=' h-10 p-2 flex-grow'>
                            <ThemedText type='subheading' content='Open Facebook'/>
                        </View>

                        <View className='w-10 h-10 p-2'>
                            <Image 
                                source={arrTopRight}
                                style={{ height: '100%', width: '100%', resizeMode: 'contain', tintColor: colors.foregroundCode }}
                            />
                        </View>
                    </TouchableOpacity>

                    <View className='w-full border-t-2 my-1 border-light-muted/10 dark:border-dark-muted/10 '/>

                    <TouchableOpacity className='flex-row h-10'>
                        <View className='w-10 h-10 p-3'>
                            <Image 
                                source={whatsappIcon}
                                style={{ height: '100%', width: '100%', resizeMode: 'contain', tintColor: colors.foregroundCode }}
                            />
                        </View>

                        <View className=' h-10 p-2 flex-grow'>
                            <ThemedText type='subheading' content='Open WhatsApp'/>
                        </View>

                        <View className='w-10 h-10 p-2'>
                            <Image 
                                source={arrTopRight}
                                style={{ height: '100%', width: '100%', resizeMode: 'contain', tintColor: colors.foregroundCode }}
                            />
                        </View>
                    </TouchableOpacity>

                    <View className='w-full border-t-2 my-1 border-light-muted/10 dark:border-dark-muted/10 '/>

                    <TouchableOpacity className='flex-row h-10'>
                        <View className='w-10 h-10 p-3'>
                            <Image 
                                source={tiktokIcon}
                                style={{ height: '100%', width: '100%', resizeMode: 'contain', tintColor: colors.foregroundCode }}
                            />
                        </View>

                        <View className=' h-10 p-2 flex-grow'>
                            <ThemedText type='subheading' content='Open Tiktok'/>
                        </View>

                        <View className='w-10 h-10 p-2'>
                            <Image 
                                source={arrTopRight}
                                style={{ height: '100%', width: '100%', resizeMode: 'contain', tintColor: colors.foregroundCode }}
                            />
                        </View>
                    </TouchableOpacity>

            </View>
            
            <View className='items-center py-6'>
                <ThemedText 
                type='content'
                 content='Made with 💚 in Pakistan'
                />
                <ThemedText 
                type='subheading'
                 content='Powered by Tixy.Pk'
                />

                <ThemedText 
                type='content'
                 content='Version: 0.0.01'
                />
            </View>
             
        
        </ScrollView>
    </View>
  )
}

export default SettingsScreen