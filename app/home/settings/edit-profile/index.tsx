import { View, Text, TouchableOpacity, ScrollView, Switch, KeyboardAvoidingView, ActivityIndicator, TouchableHighlight } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from "nativewind";
import ThemedText from '@/components/ThemedText';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import AnimatedHeader from '@/components/AnimatedHeader';

import useThemeColors from '@/hooks/useThemeColors';
import { Platform } from 'react-native';
import InputField from '@/components/InputField';
import { router } from 'expo-router';
import ChangeProfile from '@/components/ChangeProfile';
import { useMutation, useQuery } from 'react-query';
import { updateReq, userDetailsReq } from '@/functions/user';
import useCityStore from '@/hooks/data/useCityStore';
import { URLs } from '@/constants/Urls';
import useUpdate from '@/hooks/useUpdate';
import DateTimePicker from '@react-native-community/datetimepicker';

import * as SecureStore from 'expo-secure-store';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';

const SettingsScreen = () => {
  const colors = useThemeColors();
  const { colorScheme } = useColorScheme();
  const insets = useSafeAreaInsets();
  const cities = useCityStore();

  const form = useUpdate()

  const scrollViewRef = useRef(null); // Create a ref for the ScrollView
  const opacity = useSharedValue(0);
  const [showHeader, setShowHeader] = useState(false);

  const { data, isLoading } = useQuery({ queryKey: ['user'], queryFn: userDetailsReq, cacheTime: 0,
    onSuccess(data) {
      console.log(data)
      form.updateCity(data.user.city)
      form.updateName(data.user.name)
      form.updateIsDealer(data.user.is_dealer)
      if(data.dealer){
          form.updateAddress(data.dealer.address)
          const timings = data.dealer.timings.split('-')
          form.updateTimingsFrom(timings[0])
          form.updateTimingsTo(timings[1])
        }
    },
  });

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

  const [showTimingsFrom, setShowTimingsFrom] = useState(false);
  const [showTimingsTo, setShowTimingsTo] = useState(false);

  const update = useMutation("update_profile", updateReq, {
    onSuccess: async (data) => {
      // Play the ping sound
      const { sound } = await Audio.Sound.createAsync(require('@/assets/sounds/ping.mp3'));
      console.log(data)
      await sound.playAsync();
 
      // Add haptic feedback
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setTimeout(()=> router.back(), 1500)
      // Navigate to the home screen after playing the sound
      // router.push('/');
    },

    onError: async () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    }
  });


  if (isLoading) {
    return (
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View className='bg-light-background dark:bg-dark-background h-full p-4'>
      {/* SPACER */}
      
      
      <KeyboardAvoidingView
        className='flex-1'
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          <View className='h-5 opacity-50'/>
          
          {/* HEADER */}
          <ChangeProfile profile_pic={`${URLs.media.profile}/${data.user.profile_pic}`}/>
          <InputField
            title={"Name"}
            placeholder='Ghost'
            handleChange={(e) => form.updateName(e)}
            value={form.name}
           
          />
          <InputField
            title={"Email"}
            placeholder='example@ghostprotocols.pk'
            handleChange={(e) => {}}
            value={data?.user.email}
            editable={false}
            otherStyles='opacity-50'
          />
          <InputField
            title={"Phone"}
            placeholder='313 XXXXXXX'
            handleChange={(e) => {}}
            value={data?.user.phone }
            prefix='+92'
            editable={false}
            otherStyles='opacity-50'
          />

          <View className='my-2'>
            <Text className='text-light-text dark:text-dark-text text-sm opacity-50'>
              City
            </Text>

            <TouchableOpacity
              className={`bg-light-background dark:bg-dark-background border-2 border-light-muted/20 dark:border-dark-muted/20 rounded-xl p-4 focus:border-2`}
              onPress={() => router.push('/home/settings/edit-profile/select-city')}
            >
              <Text className={`text-normal text-light-text dark:text-dark-text m-1 rounded-lg ${form.city === 0 && 'text-light-muted dark:text-dark-muted'}`}
              >
                {cities.getCityById(form.city)?.name || "Select City"}
              </Text>
            </TouchableOpacity>
          </View>

          {
            data.dealer &&
            <InputField
            title={"Office Address"}
            placeholder='example@ghostprotocols.pk'
            handleChange={(e) => form.updateAddress(e)}
            value={form.address}
          />}

         

          {update.isError && (
            <View className='p-4 bg-light-destructive/50 dark:bg-dark-destructive/50 rounded-xl'>
              <ThemedText type='content' content={update.error?.message  || "An error occurred"} />
            </View>
          )}

          {update.isSuccess && (
            <View className='p-4 bg-light-primary/50 dark:bg-dark-primary/50 rounded-xl'>
              <ThemedText type='content' content="Updated" />
            </View>
          )}

          {!isLoading && 
            <TouchableOpacity
              className='mt-10 px-4 py-2 bg-light-primary dark:bg-dark-primary rounded-xl'
              onPress={() => update.mutate(form)}
              disabled= {isLoading}
            >
              <ThemedText type='button' content='UPDATE'/>
            </TouchableOpacity>
          }

          <View className='h-12'/>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SettingsScreen;
