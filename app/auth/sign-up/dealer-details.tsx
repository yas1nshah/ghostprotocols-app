import { View, Text, KeyboardAvoidingView, Switch, ScrollView, TouchableOpacity, Platform, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useSignUp from '@/hooks/useSignUp'
import useThemeColors from '@/hooks/useThemeColors'
import InputField from '@/components/InputField'
import useCityStore from '@/hooks/data/useCityStore'
import { router } from 'expo-router'
import ThemedText from '@/components/ThemedText'
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useMutation } from 'react-query'
import { signUpReq } from '@/functions/user'
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';


const Index = () => {
  const form = useSignUp()
  const colors = useThemeColors()
  const cities = useCityStore()

  const { mutate, isLoading, isError, data, isSuccess, error } = useMutation("signup",  signUpReq,{
    onSuccess: async () => {
      // Play the ping sound
      const { sound } = await Audio.Sound.createAsync(require('@/assets/sounds/ping.mp3'));
      await sound.playAsync();

      // Add haptic feedback
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setTimeout(()=> router.replace('auth/sign-in'), 1500)
      // Navigate to the home screen after playing the sound
      // router.push('/');
    },

    onError: async () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    }
  })

  const [showTimingsFrom, setShowTimingsFrom] = useState(false);
  const [showTimingsTo, setShowTimingsTo] = useState(false);
  
  return (
    <View className='flex-1 dark:bg-dark-background bg-light-background'>
      <KeyboardAvoidingView className='flex-1 bg-light-background dark:bg-dark-background'>
        <ScrollView
          contentContainerStyle={{
            
            flexGrow: 1,
            justifyContent: 'center',
            padding: 16,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View className='py-4'>
            <ThemedText 
              content='Dealer Details ⚙️'
              type='heading-xl'
            />
          </View>

          <View className='my-2'>
            <Text className='text-light-text dark:text-dark-text text-sm opacity-50'>
              City
            </Text>

            <TouchableOpacity
              className={`bg-light-background dark:bg-dark-background border-2 border-light-muted/20 dark:border-dark-muted/20 rounded-xl p-4 focus:border-2`}
              onPress={() => router.push('/auth/sign-up/select-city')}
            >
              <Text className={`text-normal text-light-text dark:text-dark-text m-1 rounded-lg ${form.city === 0 && 'text-light-muted dark:text-dark-muted'}`}
              >
                {cities.getCityById(form.city)?.name || "Select City"}
              </Text>
            </TouchableOpacity>
          </View>

          <InputField
              title="Office Address"
              placeholder='8A, Model Town'
              handleChange={(e) => form.updateAddress(e)}
              value={form.address}
              keyboardType='numbers-and-punctuation'
            />

          
            <Text className='text-light-text dark:text-dark-text text-sm mt-2 opacity-50'>
              Timings
            </Text>
            <View className='flex-row gap-2 items-center justify-start'>
              {Platform.OS === "android" && (
                <TouchableHighlight onPress={() => setShowTimingsFrom(true)} className='flex-1'>
                  <InputField
                    handleChange={() => {}}
                    onFocus={() => setShowTimingsFrom(true)}
                    editable={false}
                    value={form.timingsFrom.toLocaleTimeString()}
                  />
                </TouchableHighlight>
              )}
              {Platform.OS === "ios" ? (
                <DateTimePicker
                  mode="time"
                  display="inline"
                  value={form.timingsFrom}
                  onChange={(event, selectedDate) => { 
                    setShowTimingsFrom(false);
                    form.updateTimingsFrom( selectedDate || form.timingsFrom );
                  }}
                />
              ) : showTimingsFrom && (
                <DateTimePicker
                  mode="time"
                  display="spinner"
                  value={form.timingsFrom}
                  onChange={(event, selectedDate) => { 
                    setShowTimingsFrom(false);
                    form.updateTimingsFrom(selectedDate || form.timingsFrom);
                  }}
                />
              )}
              <Text className='text-light-text dark:text-dark-text'>-</Text>
              {Platform.OS === "android" && (
                <TouchableHighlight onPress={() => setShowTimingsTo(true)} className='flex-1'>
                  <InputField
                    handleChange={() => {}}
                    onFocus={() => setShowTimingsTo(true)}
                    editable={false}
                    value={form.timingsTo.toLocaleTimeString()}
                  />
                </TouchableHighlight>
              )}
              {Platform.OS === "ios" ? (
                <DateTimePicker
                  mode="time"
                  display="compact"
                  value={form.timingsTo}
                  onChange={(event, selectedDate) => { 
                    setShowTimingsTo(false);
                    form.updateTimingsTo(selectedDate || form.timingsTo );
                  }}
                />
              ) : showTimingsTo && (
                <DateTimePicker
                  mode="time"
                  display="spinner"
                  value={form.timingsTo}
                  onChange={(event, selectedDate) => { 
                    setShowTimingsTo(false);
                    form.updateTimingsTo(selectedDate || form.timingsTo );
                  }}
                />
              )}
            </View>

            {isError && (
            <View className='p-4 bg-light-destructive/50 dark:bg-dark-destructive/50 rounded-xl'>
              <ThemedText type='content' content={error?.message || "An error occurred"} />
            </View>
          )}

            {isSuccess && (
              <View className='p-4 bg-light-primary/50 dark:bg-dark-primary/50 rounded-xl'>
                <ThemedText type='content' content="You're Signed Up" />
              </View>
            )}

                      
            
            <View className='flex-row'>
              <TouchableOpacity
                disabled={isLoading}
                className={`mt-10 px-4 py-2 mr-2 flex-grow bg-light-muted dark:bg-dark-muted rounded-xl`}
                onPress={() => { router.back() }}
              >
                <ThemedText type='button' content='BACK' />
              </TouchableOpacity>
              <TouchableOpacity
                disabled={isLoading}
                className={`mt-10 px-4 py-2 ml-2 flex-grow bg-light-primary dark:bg-dark-primary rounded-xl`}
                onPress={() => {mutate(form)}}
              >
                <ThemedText type='button' content='SIGN UP' />
              </TouchableOpacity>
            </View>

            <View className='h-1/4'/>
          
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

export default Index
