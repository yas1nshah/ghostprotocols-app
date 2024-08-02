import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ThemedText from '@/components/ThemedText';
import { Link, router } from 'expo-router';


const Index = () => {
  return (
    <SafeAreaView 
      className='bg-light-background dark:bg-dark-background w-full h-full p-4 justify-end'
    >

      <View className='flex-1 items-center justify-start '>
        <Image source={require('@/assets/images/ghost-logo.webp')} style={{ width: '30%', resizeMode: 'contain', marginTop: -20 }}/>        
      </View>
      <View>
        <Image source={require('@/assets/images/app-preview.png')} style={{ width: '100%', height: 300, resizeMode: 'contain' }} />        
        <ThemedText type='content' otherStyles='font-Striger text-3xl font-Stringer text-center' content={`WELCOME TO\nGHOST PROTOCOLS`}/>
      </View>
      
      <View className='space-y-2 flex-grow justify-end'>

        <TouchableOpacity 
          onPress={()=>router.push('/auth/sign-in')}
          className={`bg-light-primary dark:bg-dark-primary px-4 py-3 rounded-xl`}>
          <ThemedText type='button' content='LOGIN'/>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={()=>router.push('/auth/sign-up')}
            className={`bg-light-muted dark:bg-dark-muted px-4 py-3 rounded-xl`}>
            <ThemedText type='button' content='REGISTER'/>
        </TouchableOpacity>
     

        <TouchableOpacity 
          className={`px-4 py-3 rounded-xl`}>
          <ThemedText type='content' otherStyles='text-center' content='Proceed without Account'/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Index;
