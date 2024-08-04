import React, { useState } from 'react';
import { View, Image, TouchableOpacity, ScrollView, Alert, StyleSheet, Text } from 'react-native';
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
  const [originalUris, setOriginalUris] = useState<Set<string>>(new Set());

  const uploadImageReq = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data, variables) => {
      const updatedData = imgData.map((item) =>
        item.uri === variables.uri ? { ...item, url: data.url } : item
      );
      setImgData(updatedData);
    },
    onError: (error) => {
      Alert.alert('Upload failed', 'An error occurred while uploading the image.');
      console.log(error);
    },
  });

  const pickImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'We need permission to access your photos.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 15,
      quality: 1,
      orderedSelection: true,
    });

    if (!result.canceled) {
      const newUris = result.assets.map(img => img.uri);
      const uniqueNewUris = newUris.filter(uri => !originalUris.has(uri));

      if (uniqueNewUris.length === 0) {
        Alert.alert('No new images', 'You have already selected these images.');
        return;
      }

      const newImages = await Promise.all(uniqueNewUris.map(async (uri, index) => {
        const manipResult = await ImageManipulator.manipulateAsync(
          uri,
          [],
          {
            compress: 0.8,
            format: ImageManipulator.SaveFormat.WEBP,
          }
        );

        return {
          uri: manipResult.uri,
          originalUri: uri,
          order: imgData.length + index,
          url: null,
        };
      }));

      const updatedOriginalUris = new Set([...originalUris, ...uniqueNewUris]);

      setOriginalUris(updatedOriginalUris);
      setImgData(prevImgData => [...prevImgData, ...newImages]);

      newImages.forEach((image) => {
        uploadImageReq.mutate({ uri: image.uri });
      });
    }
  };

  const renderItem = ({ item, getIndex, drag, isActive }) => (
    <View 
    className='flex-row w-32 m-1'
    // style={styles.imageContainer}
    >
      
      <TouchableOpacity
        onLongPress={drag}
        className={` w-32 ${!isActive && getIndex()==0 && 'border-2  rounded-xl border-light-primary dark:border-dark-primary'}  ${isActive && 'border-4 rounded-xl border-light-primary dark:border-dark-primary'}`}
        // style={[styles.imageWrapper, isActive && styles.imageWrapperActive]}
      >
        <Image
          source={{ uri: item.uri }}
          style={
            {height: 100,
            width: '100%',
            resizeMode: 'cover',
            borderRadius: 10,}
          }
        />
      
        {getIndex()==0 && !isActive && (
          <View className='absolute left-0 top-0 bg-light-primary dark:bg-dark-primary px-1 rounded-br-xl'>
            <ThemedText
            type='content'
            content='Cover'
            />
          </View>
        )}

        {isActive && (
          <View className='absolute bottom-2 right-2 bg-gray-800 p-1 rounded-full'>
            <Text className='text-white text-xs'>Dragging</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <View className='bg-light-background dark:bg-dark-background flex-1'>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={pickImages}
          className={`bg-light-card dark:bg-dark-card items-center justify-center px-4 py-10 ${imgData.length != 0 && "py-2"}`}>
          <View className={`w-14 h-14 p-1 ${imgData.length != 0 && "h-8 w-8"}`}>
            <Image
              source={cameraIcon}
              style={{ height: '100%', width: '100%', resizeMode: 'contain', tintColor: colors.foregroundCode }}
            />
          </View>
          <ThemedText type={imgData.length !== 0 ? "content" : "subheading"} content='Choose Your Images' />
        </TouchableOpacity>

        {uploadImageReq.isSuccess && (
          <ThemedText
            type='content'
            content={`Image ${imgData.findIndex((item) => item.url) + 1} is uploaded successfully`}
          />
        )}

        <View className='flex-row flex-wrap py-4'>
          {imgData.map((image, index) => (
            <View key={index} className={`w-1/3 h-28 p-1 rounded-lg ${index === 0 ? 'border-4 border-light-primary dark:border-dark-primary' : ''}`}>
              <Image 
                source={{ uri: image.uri }}
                style={{ height: '100%', width: '100%', resizeMode: 'cover', borderRadius: 10 }}
              />
              {index === 0 && (
                <View className='absolute bg-light-primary dark:bg-dark-primary px-2 rounded-br-xl'>
                  <ThemedText type='subheading' content='Cover' />
                </View>
              )}
            </View>
          ))}
        </View>

        <View className='h-12' />

        <GestureHandlerRootView className='pl-2 py-4 w-full bg-light-muted dark:bg-dark-muted' >
          <DraggableFlatList
            horizontal
            data={imgData}
            onDragEnd={({ data }) => {
              const reorderedData = data.map((item, index) => ({
                ...item,
                order: index,
              }));
              setImgData(reorderedData);
            }}
            keyExtractor={(item, index) => `draggable-item-${index}`}
            renderItem={renderItem}
          />
        </GestureHandlerRootView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    width: 100,
    padding: 2,
  },
  imageWrapperActive: {
    borderColor: '#007bff',
    borderWidth: 2,
  },
  imageContainer: {
    flexDirection: 'row',
    width: 100,
  },
  gestureHandlerRootView: {
    height: 200,
    width: '100%',
    backgroundColor: '#f0f0f0',
  },
});

export default AddListingScreen;
