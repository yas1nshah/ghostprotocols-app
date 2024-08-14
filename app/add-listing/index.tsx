import React, { useState } from 'react';
import { View, Image, TouchableOpacity, ScrollView, Alert, StyleSheet, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useColorScheme } from 'nativewind';
import ThemedText from '@/components/ThemedText';
import useThemeColors from '@/hooks/useThemeColors';
import { useAddListingStore } from '@/hooks/useAddCar';
import AddImages from '@/components/add-listing/AddImages';
import { router } from 'expo-router';
import useTransmissionStore from '@/hooks/data/useTransmissionStore';
import useColorStore from '@/hooks/data/useColorStore';
import useCityStore from '@/hooks/data/useCityStore';
import useAreaStore from '@/hooks/data/useAreaStore';
import LottieView from 'lottie-react-native';
import { formatPrice } from '@/functions/utils';
import useRegistrationStore from '@/hooks/data/useRegistrationStore';
import useBodyTypeStore from '@/hooks/data/useBodyStore';
import { useMutation } from 'react-query';
import { postListing } from '@/functions/listing/add-listing/listing';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';
import useFuelTypeStore from '@/hooks/data/useFuelStore';
import useVersionStore from '@/hooks/data/useVersionStore';
import useModelStore from '@/hooks/data/useModelStore';
import useMakeStore from '@/hooks/data/useMakeStore';

interface ImageItem {
  uri: string;
  originalUri: string;
  order: number;
  url: string | null;
}

const AddListingScreen = () => {
  const colors = useThemeColors();
  const { colorScheme } = useColorScheme();
  const [imgData, setImgData] = useState<ImageItem[]>([]);
  // const [originalUris, setOriginalUris] = useState<Set<string>>(new Set());

  const newListing = useAddListingStore()

  const {getCityById} = useCityStore()
  const {getAreaById} = useAreaStore()
  const {getRegistrationById} = useRegistrationStore()
  const {getMakeById} = useMakeStore()
  const {getModelById} = useModelStore()
  const {getVersionById} = useVersionStore()
  const {getFuelTypeById} = useFuelTypeStore()
  const {getBodyTypeById} = useBodyTypeStore()
  const {getTransmissionById} = useTransmissionStore()
  const {getColorById} = useColorStore()

  const [descriptionSnippets, setDescriptionSnippets] = useState([
    "Bumper to Bumper Geniune\n", "One piece Touch\n", "Original Documents\n", "Authorized Workschop Maintained\n",
   "Fresh Import\n", "Price Negociable\n", "Duplicate Documents\n", "Exchange Possible\n"])

   const { mutate, isLoading, isError, data, error, isSuccess } = useMutation("postListing", postListing, {
    onSuccess: async (data) => {
      // Play the ping sound
      const { sound } = await Audio.Sound.createAsync(require('@/assets/sounds/ping.mp3'));
      console.log(data)
      await sound.playAsync();
      

      // Add haptic feedback
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      // setTimeout(()=> router.push('/'), 1500)
      // Navigate to the home screen after playing the sound
      // router.push('/');
    },

    onError: async () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
      // newListing.updateError(error)
    }
  });

  


  return (
    <View className='bg-light-background dark:bg-dark-background flex-1'>
    
      <KeyboardAvoidingView
        className='flex-1'
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
          <ScrollView showsVerticalScrollIndicator={false}>
            <AddImages/>
            {/* <Text className='text-white'>
              {JSON.stringify(newListing.gallery)}
              </Text> */}
            <View className='p-4 bg-light-card dark:bg-dark-card my-4'>
              
              {/* SELECT LOCATION */}
              <View className='my-2'>
                <TouchableOpacity
                  className={`bg-light-background dark:bg-dark-background rounded-xl   `}
                  onPress={() => router.push('add-listing/select/city')}
                >
                  <Text className={`text-normal text-light-text dark:text-dark-text m-1 p-4 rounded-lg  ${newListing.city === 0 && 'text-light-muted dark:text-dark-muted'}`}
                  >
                    {newListing.area !== 0 && getAreaById(newListing.area)?.name
                    ? `${getAreaById(newListing.area)?.name}, ${newListing.city !== 0 && getCityById(newListing.city)?.name}`
                    : newListing.city !== 0 && getCityById(newListing.city)?.name || "Select Location"}

                  </Text>
                  
                </TouchableOpacity>
                {
                  newListing.city !== 0 &&
                  <View className="z-10 absolute right-0 top-2  w-10 h-10">
                    <LottieView
                      source={require('@/assets/lottie/done.json')}
                      autoPlay
                      
                      loop={false}
                      style={{ width: '100%', height: '100%', position: 'absolute' }}
                    />
                  </View>
                }
              </View>
                  
              {/* SELECT Car Info */}    
              <View className='my-2 '>
                <TouchableOpacity
                  className={`bg-light-background dark:bg-dark-background rounded-xl   `}
                  onPress={() => router.push('/add-listing/carInfo')}
                >
                  <Text className={`text-normal text-light-text dark:text-dark-text m-1 p-4 rounded-lg  ${newListing.transmission === 0 && 'text-light-muted dark:text-dark-muted'}`}
                  >
                    {newListing.model !== 0 ? `${newListing.year} ${getMakeById(newListing.make)?.name} ${getModelById(newListing.model)?.name} ${newListing.version != 0 ? getVersionById(newListing.version)?.name : ""}`  : "Select Car"}

                  </Text>
                </TouchableOpacity>

                {
                  newListing.year > 0 && newListing.make > 0 && newListing.model > 0 && newListing.bodyType > 0 && newListing.engineCapacity > 0 && newListing.fuelType && newListing.transmission > 0 &&
                  <View className="z-10 absolute right-0 top-2  w-10 h-10">
                    <LottieView
                      source={require('@/assets/lottie/done.json')}
                      autoPlay
                      
                      loop={false}
                      style={{ width: '100%', height: '100%', position: 'absolute' }}
                    />
                  </View>
                }
              </View>
          
              {/* SELECT Price */}
              <View className='my-2 items-end w-full'>
                <View className='bg-light-background w-full dark:bg-dark-background rounded-xl '>
                  <TextInput
                    className={`text-normal text-light-text dark:text-dark-text m-1 p-4 rounded-lg ${newListing.price === 0 && 'text-light-muted dark:text-dark-muted'}`}
                    onChangeText={(text) => {
                      // Remove non-numeric characters, parse to integer, and update the price
                      const numericValue = parseInt(text.replace(/[^0-9]/g, ''), 10) || 0;
                      newListing.updatePrice(numericValue);
                    }}
                    keyboardType='number-pad'
                    value={newListing.price > 0 ? newListing.price.toLocaleString() : ''}
                    placeholder="Enter price"
                    placeholderTextColor={colors.mutedCode}
                  />
                </View>

                {
                  newListing.price > 100000 &&
                  <View className="z-10 absolute right-0 top-2  w-10 h-10">
                    <LottieView
                      source={require('@/assets/lottie/done.json')}
                      autoPlay
                      
                      loop={false}
                      style={{ width: '100%', height: '100%', position: 'absolute' }}
                    />
                  </View>
                }
                <ThemedText type='content' content={newListing.price !== 0 ? formatPrice(newListing.price) : "Enter Price"} otherStyles='opacity-50 px-2'/>
              </View>
                
              {/* SELECT Registrations */}
              <View className='my-2'>
                <TouchableOpacity
                  className={`bg-light-background dark:bg-dark-background rounded-xl   `}
                  onPress={() => router.push('add-listing/select/registration')}
                >
                  <Text className={`text-normal text-light-text dark:text-dark-text m-1 p-4 rounded-lg  ${newListing.registration === 0 && 'text-light-muted dark:text-dark-muted'}`}
                  >
                    { newListing.registration !== 0 ? getRegistrationById(newListing.registration)?.name : "Select Registration"}

                  </Text>
                  
                </TouchableOpacity>
                {
                  newListing.registration !== 0 &&
                  <View className="z-10 absolute right-0 top-2  w-10 h-10">
                    <LottieView
                      source={require('@/assets/lottie/done.json')}
                      autoPlay
                      
                      loop={false}
                      style={{ width: '100%', height: '100%', position: 'absolute' }}
                    />
                  </View>
                }
              </View>

              {/* SELECT Mileage */}
              <View className='my-2 items-end w-full'>
                <View className='bg-light-background w-full dark:bg-dark-background rounded-xl '>
                  <TextInput
                    className={`text-normal text-light-text dark:text-dark-text m-1 p-4 rounded-lg ${newListing.mileage == 0 && 'text-light-muted dark:text-dark-muted'}`}
                    onChangeText={(text) => {
                      // Remove non-numeric characters, parse to integer, and update the price
                      const numericValue = parseInt(text.replace(/[^0-9]/g, ''), 10) || 0;
                      newListing.updateMileage(numericValue);
                    }}
                    keyboardType='number-pad'
                    value={newListing.mileage > 0 ? newListing.mileage.toLocaleString() : ''}
                    placeholder="Enter Mileage"
                    placeholderTextColor={colors.mutedCode}
                  />
                </View>

                {
                  newListing.mileage > 0 &&
                  <View className="z-10 absolute right-0 top-2  w-10 h-10">
                    <LottieView
                      source={require('@/assets/lottie/done.json')}
                      autoPlay
                      
                      loop={false}
                      style={{ width: '100%', height: '100%', position: 'absolute' }}
                    />
                  </View>
                }
                <ThemedText type='content' content={newListing.mileage > 0 ? newListing.mileage.toLocaleString() + 'km' : "Enter Mileage"} otherStyles='opacity-50 px-2'/>
              </View>
              
              {/* SELECT Color */}
              <View className='my-2'>
                <TouchableOpacity
                  className={`bg-light-background dark:bg-dark-background rounded-xl   `}
                  onPress={() => router.push('/add-listing/select/color')}
                >
                  <Text className={`text-normal text-light-text dark:text-dark-text m-1 p-4 rounded-lg  ${newListing.color === 0 && 'text-light-muted dark:text-dark-muted'}`}
                  >
                    { getColorById(newListing.color)?.name || "Select Color"}
                  </Text>
                </TouchableOpacity>
                {
                  newListing.color !== 0 &&
                  <View className="z-10 absolute right-0 top-2  w-10 h-10">
                    <LottieView
                      source={require('@/assets/lottie/done.json')}
                      autoPlay
                      
                      loop={false}
                      style={{ width: '100%', height: '100%', position: 'absolute' }}
                    />
                  </View>
                }
              </View>
              
              {/* SELECT BodyType */}
              <View className='my-2'>
                <TouchableOpacity
                  className={`bg-light-background dark:bg-dark-background rounded-xl   `}
                  onPress={() => router.push('/add-listing/select/bodyType')}
                >
                  <Text className={`text-normal text-light-text dark:text-dark-text m-1 p-4 rounded-lg  ${newListing.bodyType === 0 && 'text-light-muted dark:text-dark-muted'}`}
                  >
                    { getBodyTypeById(newListing.bodyType)?.name || "Select Color"}
                  </Text>
                </TouchableOpacity>
                {
                  newListing.bodyType !== 0 &&
                  <View className="z-10 absolute right-0 top-2  w-10 h-10">
                    <LottieView
                      source={require('@/assets/lottie/done.json')}
                      autoPlay
                      
                      loop={false}
                      style={{ width: '100%', height: '100%', position: 'absolute' }}
                    />
                  </View>
                }
              </View>
              
              {/* SELECT Description */}
              <View className='my-2'>
                <View className='bg-light-background w-full dark:bg-dark-background rounded-xl '>
                  <TextInput
                    className={`text-normal text-light-text dark:text-dark-text m-1 p-4 rounded-lg ${newListing.details.length <= 0 && 'text-light-muted dark:text-dark-muted'}`}
                    onChangeText={(e) => newListing.updateDetails(e)}
                    multiline
                    numberOfLines={10}
                    value={newListing.details }
                    placeholder="Enter Details"
                    placeholderTextColor={colors.mutedCode}
                  />
                </View>
                {
                  newListing.details.length > 0 &&
                  <View className="z-10 absolute right-0 top-2  w-10 h-10">
                    <LottieView
                      source={require('@/assets/lottie/done.json')}
                      autoPlay
                      
                      loop={false}
                      style={{ width: '100%', height: '100%', position: 'absolute' }}
                    />
                  </View>
                }
              </View>
              
              <ScrollView 
              className='flex-row my-2'
              horizontal
              showsHorizontalScrollIndicator={false}
              >
                {
                  descriptionSnippets.map((item, index)=> (

                <TouchableOpacity 
                  key={index} 
                  className='mx-2 px-4 pt-3 border-2 justify-center border-light-primary/50 rounded-full dark:border-dark-primary/50'
                  onPress={()=> {
                    newListing.updateDetails(newListing.details + item)
                    setDescriptionSnippets(descriptionSnippets.filter(ds => ds != item))
                  }}
                >
                  <ThemedText
                  type='content'
                  content={item}
                  otherStyles='opacity-80'
                  />
                </TouchableOpacity>
                  ))
                }
                
              </ScrollView>
              
              {  newListing.error &&
              <View className='bg-light-destructive dark:bg-dark-destructive rounded-lg px-4 py-2 mt-4'>
                <ThemedText
                type='content'
                content={newListing.error}
                />
              </View>}

              {isError && (
                <View className='bg-light-destructive dark:bg-dark-destructive rounded-lg px-4 py-2 mt-4'>
                  <ThemedText type='content' content={error?.message || "An error occurred"} />
                </View>
              )}
              
              {!false && 
                <TouchableOpacity
                  className='mt-10 px-4 py-2 bg-light-primary dark:bg-dark-primary rounded-xl'
                  onPress={() => {
                    newListing.updateError('')
                    if(newListing.validate()){
                      mutate(newListing)
                    }
                  }}
                  disabled= {false}
                >
                  <ThemedText type='button' content='POST AD'/>
                </TouchableOpacity>
              }

              <View className='h-10'/>
              
            </View>
          </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};



export default AddListingScreen;
