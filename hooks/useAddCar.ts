import { create } from 'zustand';

export type AddListingState = {
    gallery: { url: string, order: number }[];
    make: number;
    model: number;
    version: number;
    year: number;
    price: number;

    registration: number;
    city: number;
    area: number;

    transmission: number;
    fuelType: number;
    engineCapacity: number;
    mileage: number;
    bodyType: number;
    color: number;

    details: string;

    error: string;
}

type AddListingActions = {
    updateGallery: (gallery: AddListingState['gallery']) => void;
    updateMake: (make: AddListingState['make']) => void;
    updateModel: (model: AddListingState['model']) => void;
    updateVersion: (version: AddListingState['version']) => void;
    updateYear: (year: AddListingState['year']) => void;
    updatePrice: (price: AddListingState['price']) => void;
    updateMileage: (mileage: AddListingState['mileage']) => void;
    updateRegistration: (registration: AddListingState['registration']) => void;
    updateCity: (city: AddListingState['city']) => void;
    updateArea: (area: AddListingState['area']) => void;
    updateTransmission: (transmission: AddListingState['transmission']) => void;
    updateFuelType: (fuelType: AddListingState['fuelType']) => void;
    updateEngineCapacity: (engineCapacity: AddListingState['engineCapacity']) => void;
    updateBodyType: (bodyType: AddListingState['bodyType']) => void;
    updateColor: (color: AddListingState['color']) => void;
    updateDetails: (details: AddListingState['details']) => void;
    updateError: (error: AddListingState['error'])=> void;
    validate: ()=> boolean;

}

export const useAddListingStore = create<AddListingState & AddListingActions>((set) => ({
  gallery: [],
  make: 0,
  model: 0,
  version: 0,
  year: 0,
  price: 0,
  mileage: 0,
  registration: 0,
  city: 0,
  area: 0,
  transmission: 0,
  fuelType: 0,
  engineCapacity: 0,
  bodyType: 0,
  color: 0,
  details: '',
  error: '',

  updateGallery: (gallery) => set({ gallery }),
  updateMake: (make) => set({ make }),
  updateModel: (model) => set({ model }),
  updateVersion: (version) => set({ version }),
  updateYear: (year) => set({ year }),
  updatePrice: (price) => set({ price }),
  updateMileage: (mileage) => set({ mileage }),
  updateRegistration: (registration) => set({ registration }),
  updateCity: (city) => set({ city }),
  updateArea: (area) => set({ area }),
  updateTransmission: (transmission) => set({ transmission }),
  updateFuelType: (fuelType) => set({ fuelType }),
  updateEngineCapacity: (engineCapacity) => set({ engineCapacity }),
  updateBodyType: (bodyType) => set({ bodyType }),
  updateColor: (color) => set({ color }),
  updateDetails: (details) => set({ details }),
  updateError: (error) => set({ error }),

  validate: () => {
      const {
        gallery,
        make,
        model,
        year,
        price,
        mileage,
        registration,
        city,
        transmission,
        fuelType,
        engineCapacity,
        bodyType,
        color,
        details,
        updateError,
      } = useAddListingStore.getState();

      // Validate gallery
      if (gallery.length < 4 || gallery.length > 15) {
        updateError("Please upload up to 15 images.");
        return false;
      }

      // Check each gallery item has a valid string URL
      const invalidGalleryItem = gallery.find(item => !item.url || typeof item.url !== 'string' || !item.url.trim());
      if (invalidGalleryItem) {
        updateError("Each gallery item must have a valid image URL.");
        return false;
      }
    
      // Validate other fields
      if (!make) {
        updateError("Please select a make.");
        return false;
      }
    
      if (!model) {
        updateError("Please select a model.");
        return false;
      }
    
      if (!year) {
        updateError("Please enter a valid year.");
        return false;
      }
    
      if (!price) {
        updateError("Please enter a price.");
        return false;
      }
    
      if (!mileage) {
        updateError("Please enter the mileage.");
        return false;
      }
    
      if (!registration) {
        updateError("Please select a registration type.");
        return false;
      }
    
      if (!city) {
        updateError("Please select a city.");
        return false;
      }
    
      if (!transmission) {
        updateError("Please select a transmission type.");
        return false;
      }
    
      if (!fuelType) {
        updateError("Please select a fuel type.");
        return false;
      }
    
      if (!engineCapacity) {
        updateError("Please enter the engine capacity.");
        return false;
      }
    
      if (!bodyType) {
        updateError("Please select a body type.");
        return false;
      }
    
      if (!color) {
        updateError("Please select a color.");
        return false;
      }
    
      if (!details.trim()) {
        updateError("Details must not be empty.");
        return false;
      }
    
      const phoneNumberRegex = /\b\d{10,14}\b/; // Matches 10 to 14 digit phone numbers
      const urlRegex = /(https?:\/\/[^\s]+)/g; // Matches URLs
    
      if (phoneNumberRegex.test(details) || urlRegex.test(details)) {
        updateError("Details must not contain phone numbers or links.");
        return false;
      }
    
      return true;
  },
}));
