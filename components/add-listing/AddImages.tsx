import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import ThemedText from '../ThemedText';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import cameraIcon from '@/assets/icons/camera.png';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import useThemeColors from '@/hooks/useThemeColors';
import { useMutation } from 'react-query';
import { uploadImage } from '@/functions/listing/add-listing/listing';
import { useAddListingStore } from '@/hooks/useAddCar';

interface ImageItem {
  uri: string;
  originalUri: string;
  order: number;
  url: string | null;
}

const AddImages = () => {
  const colors = useThemeColors();
  const [imgData, setImgData] = useState<ImageItem[]>([]);
  const addListingState = useAddListingStore();

  useEffect(() => {
    addListingState.updateGallery(
      imgData.map(({ url, order }) => ({ url: url || '', order }))
    );
  }, [imgData]);
  

  const uploadImageReq = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data, variables) => {
      setImgData(prevImgData => {
        return prevImgData.map(item =>
          item.uri === variables.uri ? { ...item, url: data.url } : item
        );
      });
      console.log(`Image uploaded successfully: ${variables.uri}`);
    },
    onError: (error, variables) => {
      Alert.alert('Upload failed', `An error occurred while uploading the image: ${variables.uri}`);
      console.log(`Error uploading image ${variables.uri}:`, error);
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
      const newImages = result.assets.map((img, index) => ({
        uri: img.uri,
        originalUri: img.uri,
        order: imgData.length + index,
        width: img.width, // Ensure width is passed
        height: img.height, // Ensure height is passed
        url: null,
      }));
  
      setImgData(prevImgData => [...prevImgData, ...newImages]);
  
      newImages.forEach((image) => {
        uploadImageReq.mutate({
          uri: image.uri,
          width: image.width,
          height: image.height,
        });
      });
    }
  };
  

  const removeImage = (uri: string) => {
    setImgData(prevImgData => {
      const filteredData = prevImgData.filter(item => item.uri !== uri);
      return filteredData.map((item, index) => ({
        ...item,
        order: index,
      }));
    });
  };
  

  const renderItem = ({ item, drag, isActive }: RenderItemParams<ImageItem>) => (
    <View className='flex-row w-32 m-1'>
      <TouchableOpacity
        onLongPress={drag}
        className={`w-32 ${!isActive && item.order === 0 && 'border-2 rounded-xl border-light-primary dark:border-dark-primary'} ${isActive && 'border-4 rounded-xl border-light-primary dark:border-dark-primary'}`}
      >
        <Image
          source={{ uri: item.uri }}
          style={{
            height: 100,
            width: '100%',
            resizeMode: 'cover',
            borderRadius: 10,
          }}
        />
        <TouchableOpacity
          onPress={() => removeImage(item.uri)}
          className='drop-shadow-2xl bg-light-destructive dark:bg-dark-destructive py-1 px-2 rounded-full w-6 h-6 justify-center items-center absolute top-0 right-0 m-1'>
          <Text className='font-bold text-white'>{item.order}</Text>
        </TouchableOpacity>
        {item.order === 0 && (
          <View className='absolute z-10 left-0 top-0 bg-light-primary dark:bg-dark-primary px-1 rounded-br-xl'>
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
    <View>
      <TouchableOpacity
        onPress={pickImages}
        className={`bg-light-card dark:bg-dark-card items-center justify-center px-4 py-10 ${imgData.length !== 0 && "py-2"}`}>
        <View className={`w-14 h-14 p-1 ${imgData.length !== 0 && "h-8 w-8"}`}>
          <Image
            source={cameraIcon}
            style={{ height: '100%', width: '100%', resizeMode: 'contain', tintColor: colors.foregroundCode }}
          />
        </View>
        <ThemedText type={imgData.length !== 0 ? "content" : "subheading"} content='Choose Your Images' />
      </TouchableOpacity>
      <GestureHandlerRootView className='pl-2 py-4 w-full bg-light-muted/20 dark:bg-dark-muted/20'>
        <DraggableFlatList
          horizontal
          data={imgData}
          onDragEnd={({ data }) => {
            const reorderedData = data.map((item, index) => ({
              ...item,
              order: index,
            }));
            setImgData(reorderedData);
            // console.log('Updated order:', reorderedData);
          }}
          keyExtractor={(item, index) => `draggable-item-${index}`}
          renderItem={renderItem}
        />
      </GestureHandlerRootView>
    </View>
  );
};

export default AddImages;
