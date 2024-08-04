import { View, Text, KeyboardAvoidingView, Switch, ScrollView, TouchableOpacity, Platform } from 'react-native';
import React from 'react';
import useSignUp from '@/hooks/useSignUp';
import useThemeColors from '@/hooks/useThemeColors';
import InputField from '@/components/InputField';
import useCityStore from '@/hooks/data/useCityStore';
import { Link, router } from 'expo-router';
import ThemedText from '@/components/ThemedText';
import useSignIn from '@/hooks/useSignIn';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import { useMutation } from 'react-query';
import { signInReq } from '@/functions/user';
import * as SecureStore from 'expo-secure-store';

const Index = () => {
  const form = useSignIn();
  const colors = useThemeColors();
  
  const { mutate, isLoading, isError, data, error, isSuccess } = useMutation("signin", signInReq, {
    onSuccess: async (data) => {
      // Play the ping sound
      const { sound } = await Audio.Sound.createAsync(require('@/assets/sounds/ping.mp3'));
      console.log(data)
      await sound.playAsync();
      await SecureStore.setItemAsync("auth_token", data.authentication_token.token);
      await SecureStore.setItemAsync("auth_token_expiry", data.authentication_token.expiry);

      // Add haptic feedback
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setTimeout(()=> router.push('/'), 1500)
      // Navigate to the home screen after playing the sound
      // router.push('/');
    },

    onError: async () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    }
  });

  
  return (
    <View className='flex-1 dark:bg-dark-background bg-light-background'>
    
      <KeyboardAvoidingView
        className='flex-1'
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
      
          contentContainerStyle={{
            backgroundColor: colors.backgroundCode,
            flexGrow: 1,
            justifyContent: 'center',
            padding: 16,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View className='py-4'>
            <ThemedText 
              content='Welcome Back 👋'
              type='heading-xl'
            />
          </View>

          

          <InputField
            title={"Email or Phone"}
            placeholder='Email or Phone'
            handleChange={(e) => form.updateIdentifier(e)}
            value={form.identifier}
          />

          <InputField
            title={"Password"}
            placeholder='Password'
            handleChange={(e) => form.updatePassword(e)}
            secureText={true}
            value={form.password}
          />

          {isError && (
            <View className='p-4 bg-light-destructive/50 dark:bg-dark-destructive/50 rounded-xl'>
              <ThemedText type='content' content={error?.message  || "An error occurred"} />
            </View>
          )}

          {isSuccess && (
            <View className='p-4 bg-light-primary/50 dark:bg-dark-primary/50 rounded-xl'>
              <ThemedText type='content' content="You're Logged In" />
            </View>
          )}
         


        
          {!isLoading && 
            <TouchableOpacity
              className='mt-10 px-4 py-2 bg-light-primary dark:bg-dark-primary rounded-xl'
              onPress={() => mutate(form)}
              disabled= {isLoading}
            >
              <ThemedText type='button' content='SIGN IN'/>
            </TouchableOpacity>
          }
          
          <View className='flex-row justify-end p-4'>

            <ThemedText 
              content="Don't have an Account?"
              type='content'
              />
            <Link replace={true} href={"/auth/sign-up"}>
              <ThemedText 
                content=' Register'
                type='link'
                />
            </Link>
          </View>

         

          <View className='h-1/4'/>
        </ScrollView>
      </KeyboardAvoidingView>
    
    </View>
  );
}

export default Index;
