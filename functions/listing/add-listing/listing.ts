
import { URLs } from "@/constants/Urls";
import { AddListingState, useAddListingStore } from "@/hooks/useAddCar";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from 'expo-secure-store';


export const getHome = async() => {
  try {
    const response = await axios.get(URLs.listing.home);
     
    return response.data;

  } catch (error: any) {
    // Check if error response is available
    if (error.response) {
      const { status, data } = error.response;

      if (status === 500) {
        // Handle 500 Internal Server Error
      
        const errorMessage = 'An internal server error occurred';
        throw new Error(errorMessage);
      }

      if (status === 422) {
        // Handle 422 Unprocessable Entity
 
        const errorMessages = data.error;
        // Flatten and join error messages
        const formattedMessages = Object.values(errorMessages).flat().join(' ');
        throw new Error(formattedMessages || 'Validation failed');
      }
    }

    // Handle network or other errors
    throw new Error(error.message || 'An error occurred during signup');
  }
}

export const getLisitng = async(id: string) => {
  try {
    const response = await axios.get(URLs.listing.view+id);
     
    return response.data;

  } catch (error: any) {
    // Check if error response is available
    if (error.response) {
      const { status, data } = error.response;

      if (status === 500) {
        // Handle 500 Internal Server Error
      
        const errorMessage = 'An internal server error occurred';
        throw new Error(errorMessage);
      }

      if (status === 422) {
        // Handle 422 Unprocessable Entity
 
        const errorMessages = data.error;
        // Flatten and join error messages
        const formattedMessages = Object.values(errorMessages).flat().join(' ');
        throw new Error(formattedMessages || 'Validation failed');
      }
    }

    // Handle network or other errors
    throw new Error(error.message || 'An error occurred during signup');
  }
}


export const postListing = async(form: AddListingState) => {
  // const form = useAddListingStore()
  // if(form.validate()) return
  try {
    const token = await SecureStore.getItemAsync('auth_token');
      if (!token) {
        throw new Error('API key not found');
      }
    // Make the POST request
      const response = await axios.post(URLs.listing.post, {
        gallery : form.gallery,
        make: form.make,
        model: form.model,
        version: form.version,
        year: form.year,
        price: form.price,
        registration: form.registration,
        city: form.city,
        mileage: form.mileage.toString(),
        transmission: form.transmission,
        fueltype: form.fuelType,
        engine_capacity: form.engineCapacity,
        body_type: form.bodyType,
        color: form.color,
        details: form.details,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;

  } catch (error: any){
    if (error.response) {
      const { status, data } = error.response;
      console.log(data)

      if (status === 500) {
        // Handle 500 Internal Server Error
      
        const errorMessage = 'An internal server error occurred';
        throw new Error(errorMessage);
      }

      if (status === 422) {
        // Handle 422 Unprocessable Entity
 
        const errorMessages = data.error;
        // Flatten and join error messages
        const formattedMessages = Object.values(errorMessages).flat().join(' ');
        throw new Error(formattedMessages || 'Validation failed');
      }
    }

    // Handle network or other errors
    throw new Error(error.message || 'An error occurred during signup');
  }
}

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