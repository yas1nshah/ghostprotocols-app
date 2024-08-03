import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ThemedText from './ThemedText';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';
import { useMutation } from 'react-query';
import { userUpdateProfilePicReq } from '@/functions/user';

const ChangeProfile = ({profile_pic}: {profile_pic: string}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(profile_pic || "");

  const { mutate, isLoading, isError, data, error, isSuccess } = useMutation(
    "update_profile",
    userUpdateProfilePicReq,
    {
      onSuccess: async () => {
        const { sound } = await Audio.Sound.createAsync(require('@/assets/sounds/ping.mp3'));
        await sound.playAsync();
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      },
      onError: async () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
      }
    }
  );

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setSelectedImage(imageUri);
      mutate(result.assets[0]);
    }
  };

  return (
    <View className='justify-center items-center mb-4'>
      <View className='overflow-hidden m-2 rounded-full h-32 w-32 bg-light-muted dark:bg-dark-muted'>
        <TouchableOpacity onPress={pickImage}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={{ width: '100%', height: '100%' }} />
          ) : (
            <Text>Select Image</Text>
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={pickImage}>
        <ThemedText type='link' content='Edit' />
      </TouchableOpacity>
    </View>
  );
};

export default ChangeProfile;
