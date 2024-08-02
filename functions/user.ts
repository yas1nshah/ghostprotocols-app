import axios from 'axios';
import { SignUpState } from '@/hooks/useSignUp';
import { URLs } from '@/constants/Urls';
import { SignInState } from '@/hooks/useSignIn';

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
    console.log('CODE:', error.response.status);
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

export const signInReq = async (form: SignInState)=> {
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