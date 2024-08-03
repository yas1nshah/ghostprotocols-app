import axios from 'axios';
import { SignUpState } from '@/hooks/useSignUp';
import { URLs } from '@/constants/Urls';
import { SignInState } from '@/hooks/useSignIn';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import { UpdateState } from '@/hooks/useUpdate';

const validateUpdate = (form: UpdateState) => {
  if (form.name.length <= 1) {
    throw new Error('Name should be more than one character long');
  }

  if (form.isDealer && form.address.length <= 5) {
    throw new Error('Address must be more than five characters long for dealers');
  }
};

const validateSignUp = (form: SignUpState) => {
  if (form.name.length <= 1) {
    throw new Error('Name should be more than one character long');
  }

  if (form.password.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }

  if (form.password !== form.confirmPassword) {
    throw new Error('Passwords do not match');
  }

  if (!/\S+@\S+\.\S+/.test(form.email)) {
    throw new Error('Invalid email address');
  }

  if (form.isDealer && form.address.length <= 5) {
    throw new Error('Address must be more than five characters long for dealers');
  }
};

const validateSignIn = (form: SignInState) => {
  if (form.identifier.length <= 1) {
    throw new Error('Name should be more than one character long');
  }

  if (form.password.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }
}

export const signUpReq = async (form: SignUpState) => {
  try {
    // Validate form data
    validateSignUp(form);

    // Make the POST request
    const response = await axios.post(URLs.register, {
      name: form.name,
      phone: form.phone,
      email: form.email,
      password: form.password,
      city: form.city,
      is_dealer: form.isDealer,
      address: form.address,
      timings: `${form.timingsFrom}-${form.timingsTo}`,
    });
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
};

export const signInReq = async (form: SignInState) => {
  try {
    // Validate form data
    validateSignIn(form);

    // Make the POST request
    const response = await axios.post(URLs.authenticate, {
      identifier : form.identifier,
      password: form.password
    });
   
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
      if (status === 401) {
        // Handle 500 Internal Server Error
      
        const errorMessage = 'Invalid Credentials';
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

export const userUpdateProfilePicReq = async (imageAsset: ImagePicker.ImagePickerAsset) => {
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
      URLs.user.updateProfilePic, // Ensure this is the correct endpoint
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

export const userDetailsReq = async () => {
  try {
    const token = await SecureStore.getItemAsync('auth_token');
    if (!token) {
      throw new Error('API key not found');
    }
      
    const response = await axios.get(URLs.getUserDetilas ,
      {
        headers: {
          Authorization: `Bearer ${token}`,
         
        },
      }
    );
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

export const updateReq = async (form: UpdateState) => {
  try {
    // Validate form data
    validateUpdate(form);

    const token = await SecureStore.getItemAsync('auth_token');
    if (!token) {
      throw new Error('API key not found');
    }
    console.log(form.city)

    // Make the PUT request
    const response = await axios.put(
      URLs.user.update,
      {
        name: form.name,
        city: form.city,
        address: form.address,
        is_dealer: form.isDealer,
        timings: `${form.timingsFrom}-${form.timingsTo}`,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error: any) {
    // Check if error response is available
    if (error.response) {
      const { status, data } = error.response;

      if (status === 500) {
        // Handle 500 Internal Server Error
        throw new Error('An internal server error occurred');
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
    throw new Error(error.message || 'An error occurred during update');
  }
};