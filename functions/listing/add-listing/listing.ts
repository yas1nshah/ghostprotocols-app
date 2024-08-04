
import { URLs } from "@/constants/Urls";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from 'expo-secure-store';


export const uploadImage = async (imageAsset: ImagePicker.ImagePickerAsset) => {
    try {
      const token = await SecureStore.getItemAsync('auth_token');
      if (!token) {
        throw new Error('API key not found');
      }
  
  
      let localUri = imageAsset.uri;
      let filename = localUri.split('/').pop();
  
      let match = /\.(\w+)$/.exec(filename as string);
      let type = match ? `image/${match[1]}` : `image`; 
  
      // Create FormData
      let formData = new FormData();
      formData.append('image', { uri: localUri, name: filename, type });
  
      const apiResponse = await axios.post(
        URLs.listing.uploadImage, // Ensure this is the correct endpoint
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      console.log('API Response:', apiResponse.data);
      return apiResponse.data;
  
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        // Axios specific error handling
        const { response } = error;
        if (response) {
          const { status, data } = response;
  
          if (status === 500) {
            throw new Error('An internal server error occurred');
          }
  
          if (status === 422) {
            const errorMessages = data.error;
            const formattedMessages = Object.values(errorMessages).flat().join(' ');
            throw new Error(formattedMessages || 'Validation failed');
          }
        }
      }
  
      console.error('Error:', error.message);
      throw new Error(error.message || 'An error occurred during profile picture update');
    }
  };