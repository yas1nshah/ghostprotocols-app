import { View, KeyboardAvoidingView, ScrollView, TouchableOpacity, Platform } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import useSignUp from '@/hooks/useSignUp';
import useThemeColors from '@/hooks/useThemeColors';
import InputField from '@/components/InputField';
import useCityStore from '@/hooks/data/useCityStore';
import { router } from 'expo-router';
import ThemedText from '@/components/ThemedText';
import { useMutation } from 'react-query';
import { signUpReq } from '@/functions/user';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';

const Index = () => {
  const form = useSignUp();
  const colors = useThemeColors();
  const cities = useCityStore();

  const { mutate, isLoading, isError, data, error, isSuccess } = useMutation("signup", signUpReq, {
    onSuccess: async () => {
      // Play the ping sound
      const { sound } = await Audio.Sound.createAsync(require('@/assets/sounds/ping.mp3'));
      await sound.playAsync();

      // Add haptic feedback
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setTimeout(()=> router.push('auth/sign-in'), 1500)
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
              content='User Details 📝'
              type='heading-xl'
            />
          </View>

          <InputField
            title="Email"
            placeholder='example@ghostprotocols.pk'
            handleChange={(e) => form.updateEmail(e)}
            value={form.email}
            keyboardType='email-address'
          />

          <InputField
            title="Phone"
            placeholder='3XX XXXXXXX'
            handleChange={(e) => form.updatePhone(e)}
            value={form.phone}
            keyboardType='number-pad'
            prefix="+92"
          />

          <InputField
            title="Password"
            placeholder='Pa$$word'
            handleChange={(e) => form.updatePassword(e)}
            value={form.password}
            keyboardType='default'
            secureText={true}
          />

          <InputField
            title="Confirm Password"
            placeholder='Pa$$word'
            handleChange={(e) => form.updateConfirmPassword(e)}
            value={form.confirmPassword}
            keyboardType='default'
            secureText={true}
          />

          {form.isDealer &&
            <View className='flex-row'>
              <TouchableOpacity
                className={`mt-10 px-4 py-2 mr-2 flex-grow bg-light-muted dark:bg-dark-muted rounded-xl`}
                onPress={() => { router.back() }}
              >
                <ThemedText type='button' content='BACK' />
              </TouchableOpacity>
              <TouchableOpacity
                className={`mt-10 px-4 py-2 ml-2 flex-grow bg-light-primary dark:bg-dark-primary rounded-xl`}
                onPress={() => { router.push('/auth/sign-up/dealer-details') }}
              >
                <ThemedText type='button' content='NEXT' />
              </TouchableOpacity>
            </View>
          }

          {isError && (
            <View className='p-4 bg-light-destructive/50 dark:bg-dark-destructive/50 rounded-xl'>
              <ThemedText type='content' content={error?.message as string || "An error occurred"} />
            </View>
          )}

          {isSuccess && (
            <View className='p-4 bg-light-primary/50 dark:bg-dark-primary/50 rounded-xl'>
              <ThemedText type='content' content="You're Signed Up" />
            </View>
          )}

          {!form.isDealer && !isLoading &&
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
                onPress={() => { mutate(form) }}
              >
                <ThemedText type='button' content='SIGN UP' />
              </TouchableOpacity>
            </View>
          }

          <View className='h-1/4'/>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

export default Index;
