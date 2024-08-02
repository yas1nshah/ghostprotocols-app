import { View, Text, KeyboardAvoidingView, Switch, ScrollView, TouchableOpacity, Platform } from 'react-native';
import React from 'react';
import useSignUp from '@/hooks/useSignUp';
import useThemeColors from '@/hooks/useThemeColors';
import InputField from '@/components/InputField';
import useCityStore from '@/hooks/data/useCityStore';
import { Link, router } from 'expo-router';
import ThemedText from '@/components/ThemedText';

const Index = () => {
  const form = useSignUp();
  const colors = useThemeColors();
  const cities = useCityStore();
  
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
              content='Get Started 🏴‍☠️'
              type='heading-xl'
            />
          </View>

          <View className='flex-row my-2 justify-between items-center bg-light-card dark:bg-dark-card px-4 py-2 rounded-xl'>
            <Text className='text-base text-light-text dark:text-dark-text'>Are You a Dealer?</Text>
            <Switch 
              onValueChange={() => form.updateIsDealer(!form.isDealer)}
              value={form.isDealer}
              thumbColor={colors.backgroundCode}
              trackColor={{ false: colors.mutedCode, true: colors.primaryCode }}
            />
          </View>

          <InputField
            title={form.isDealer ? "Dealership Name" : "Name"}
            placeholder='Name'
            handleChange={(e) => form.updateName(e)}
            value={form.name}
          />

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

          <TouchableOpacity
            className='mt-10 px-4 py-2 bg-light-primary dark:bg-dark-primary rounded-xl'
            onPress={() => router.push('/auth/sign-up/user-details')}
          >
            <ThemedText type='button' content='NEXT'/>
          </TouchableOpacity>
          
          <View className='flex-row justify-end p-4'>

            <ThemedText 
              content='Are you Already Registered?'
              type='content'
              />
            <Link href={"/auth/sign-in"}>
              <ThemedText 
                content=' Login'
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
