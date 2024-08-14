import React, { useState } from 'react';
import { View, Image, TouchableOpacity, ScrollView, Alert, StyleSheet, Text, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useColorScheme } from 'nativewind';
import DraggableFlatList from 'react-native-draggable-flatlist';
import * as ImageManipulator from 'expo-image-manipulator';
import ThemedText from '@/components/ThemedText';
import useThemeColors from '@/hooks/useThemeColors';
import cameraIcon from '@/assets/icons/camera.png';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useMutation } from 'react-query';
import { uploadImage } from '@/functions/listing/add-listing/listing';
import { useAddListingStore } from '@/hooks/useAddCar';
import AddImages from '@/components/add-listing/AddImages';
import InputField from '@/components/InputField';
import { router } from 'expo-router';
import useTransmissionStore from '@/hooks/data/useTransmissionStore';
import useColorStore from '@/hooks/data/useColorStore';
import useMakeStore from '@/hooks/data/useMakeStore';
import useModelStore from '@/hooks/data/useModelStore';
import useVersionStore from '@/hooks/data/useVersionStore';
import useFuelTypeStore from '@/hooks/data/useFuelStore';
import LottieView from 'lottie-react-native';
import useBodyTypeStore from '@/hooks/data/useBodyStore';

interface ImageItem {
  uri: string;
  originalUri: string;
  order: number;
  url: string | null;
}

const CarInfoScreen = () => {
  const colors = useThemeColors();
  const { colorScheme } = useColorScheme();
  const [imgData, setImgData] = useState<ImageItem[]>([]);
  // const [originalUris, setOriginalUris] = useState<Set<string>>(new Set());

  const newListing = useAddListingStore()

  const {getTransmissionById} = useTransmissionStore()
  const {getColorById} = useColorStore()

  const {getMakeById} = useMakeStore()
  const {getModelById} = useModelStore()
  const {getVersionById} = useVersionStore()
  const {getFuelTypeById} = useFuelTypeStore()
  const {getBodyTypeById} = useBodyTypeStore()


  return (
    <View className='bg-light-background dark:bg-dark-background flex-1'>
    
      <ScrollView showsVerticalScrollIndicator={false}>
       

        <View className='p-4 bg-light-card dark:bg-dark-card my-4'>

          {/* SELECT Car Info */}
          <View className='my-2'>
                <TouchableOpacity
                  className={`bg-light-background dark:bg-dark-background rounded-xl `}
                  onPress={() => router.push('/add-listing/carInfo/year')}
                >
                  <Text className={`text-normal text-light-text dark:text-dark-text m-1 p-4 rounded-lg ${newListing.model === 0 && 'text-light-muted dark:text-dark-muted'}`}
                  >
                  {newListing.model !== 0 ? `${newListing.year} ${getMakeById(newListing.make)?.name} ${getModelById(newListing.model)?.name} ${newListing.version != 0 && getVersionById(newListing.version)?.name}`  : "Select Car"}
                </Text>
                </TouchableOpacity>
                {
                  newListing.model !== 0 &&
                  <View className="z-10 absolute right-0 top-3  w-10 h-10">
                    <LottieView
                      source={require('@/assets/lottie/done.json')}
                      autoPlay
                      
                      loop={false}
                      style={{ width: '100%', height: '100%', position: 'absolute' }}
                    />
                  </View>
                }
          </View>

          {/* SELECT Transmission*/}
          <View className='my-2'>
            <TouchableOpacity
              className={`bg-light-background dark:bg-dark-background rounded-xl `}
              onPress={() => router.push('/add-listing/carInfo/transmission')}
            >
              <Text className={`text-normal text-light-text dark:text-dark-text m-1 p-4 rounded-lg ${newListing.transmission === 0 && 'text-light-muted dark:text-dark-muted'}`}
              >
                { getTransmissionById(newListing.transmission)?.name || "Select Transmission"}
              </Text>
            </TouchableOpacity>
            {
              newListing.transmission !== 0 &&
              <View className="z-10 absolute right-0 top-3  w-10 h-10">
                <LottieView
                  source={require('@/assets/lottie/done.json')}
                  autoPlay
                  
                  loop={false}
                  style={{ width: '100%', height: '100%', position: 'absolute' }}
                />
              </View>
            }
          </View>

          {/* <View className='my-2'>
            <TouchableOpacity
              className={`bg-light-background dark:bg-dark-background rounded-xl  focus:border-2 `}
              onPress={() => router.push('/add-listing/carInfo/year')}
            >
              <Text className={`text-normal text-light-text dark:text-dark-text m-1 p-4 rounded-lg border-2 border-light-muted/20 dark:border-dark-muted/20 ${newListing.transmission === 0 && 'text-light-muted dark:text-dark-muted'}`}
              >
                {newListing.model !== 0 ? `${newListing.year} ${getMakeById(newListing.make)?.name} ${getModelById(newListing.model)?.name} ${newListing.version != 0 && getVersionById(newListing.version)?.name}`  : "Select Car"}
              </Text>
            </TouchableOpacity>
          </View> */}

          {/* SELECT FuelType*/}
          <View className='my-2'>
            <TouchableOpacity
              className={`bg-light-background dark:bg-dark-background rounded-xl `}
              onPress={() => router.push('/add-listing/carInfo/fuelType')}
            >
              <Text className={`text-normal text-light-text dark:text-dark-text m-1 p-4 rounded-lg ${newListing.fuelType === 0 && 'text-light-muted dark:text-dark-muted'}`}
              >
                { getFuelTypeById(newListing.fuelType)?.name || "Select Fuel Type"}
              </Text>
            </TouchableOpacity>
            {
              newListing.fuelType !== 0 &&
              <View className="z-10 absolute right-0 top-3  w-10 h-10">
                <LottieView
                  source={require('@/assets/lottie/done.json')}
                  autoPlay
                  
                  loop={false}
                  style={{ width: '100%', height: '100%', position: 'absolute' }}
                />
              </View>
            }
          </View>
          
          {/* SELECT BodyTypes*/}
          <View className='my-2'>
            <TouchableOpacity
              className={`bg-light-background dark:bg-dark-background rounded-xl `}
              onPress={() => router.push('/add-listing/carInfo/bodyType')}
            >
              <Text className={`text-normal text-light-text dark:text-dark-text m-1 p-4 rounded-lg ${newListing.bodyType === 0 && 'text-light-muted dark:text-dark-muted'}`}
              >
                { getBodyTypeById(newListing.bodyType)?.name || "Select Body Type"}
              </Text>
            </TouchableOpacity>
            {
              newListing.bodyType !== 0 &&
              <View className="z-10 absolute right-0 top-3  w-10 h-10">
                <LottieView
                  source={require('@/assets/lottie/done.json')}
                  autoPlay
                  
                  loop={false}
                  style={{ width: '100%', height: '100%', position: 'absolute' }}
                />
              </View>
            }
          </View>
          
          {/* SELECT Engine Capacity */}
          <View className='my-2 items-end w-full'>
            <View className='bg-light-background w-full dark:bg-dark-background rounded-xl '>
              <TextInput
                className={`text-normal text-light-text dark:text-dark-text m-1 px-4 py-3 rounded-lg ${newListing.engineCapacity <= 0 && 'text-light-muted dark:text-dark-muted'}`}
                onChangeText={(text) => {
                  // Remove non-numeric characters, parse to integer, and update the engineCapacity
                  const numericValue = parseInt(text.replace(/[^0-9]/g, ''), 10) || 0;
                  newListing.updateEngineCapacity(numericValue);
                }}
                keyboardType='number-pad'
                value={newListing.engineCapacity > 0 ? newListing.engineCapacity.toString() : ''}
                placeholder="Enter Engine Capacity"
                placeholderTextColor={colors.mutedCode}
              />
            </View>


            {
              newListing.engineCapacity > 100 &&
              <View className="z-10 absolute right-0 top-3  w-10 h-10">
                <LottieView
                  source={require('@/assets/lottie/done.json')}
                  autoPlay
                  
                  loop={false}
                  style={{ width: '100%', height: '100%', position: 'absolute' }}
                />
              </View>
            }
          </View>
         

          { 
            newListing.model !==0 &&
            newListing.make !==0 && 
            newListing.transmission !==0 && 
            newListing.fuelType !==0 && 
            newListing.bodyType !==0 && 
            newListing.engineCapacity !==0 && 
            <TouchableOpacity
              className='mt-10 px-4 py-2 bg-light-primary dark:bg-dark-primary rounded-xl'
              onPress={() => router.back()}
              
            >
              <ThemedText type='button' content='DONE'/>
            </TouchableOpacity>
          }

          <View className='h-10'/>
   
        </View>
      </ScrollView>
    </View>
  );
};



export default CarInfoScreen;
