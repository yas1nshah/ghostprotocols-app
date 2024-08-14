import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import useThemeColors from '@/hooks/useThemeColors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import useBodyStore from '@/hooks/data/useBodyStore';
import { useAddListingStore } from '@/hooks/useAddCar';
import { router } from 'expo-router';
import InputField from '@/components/InputField';
import useFuelTypeStore from '@/hooks/data/useFuelStore';

interface FuelType {
  id: number;
  name: string;
}

const SelectFuelTypes: React.FC = () => {
  const colors = useThemeColors();
//   const { filteredBodyTypes, searchText, setSearchText, filterBodyTypes, clearSearch } = useBodyStore();
  const { filteredFuelTypes, searchText, setSearchText, filterFuelTypes, clearSearch } = useFuelTypeStore();
  const AddListing = useAddListingStore();

  useEffect(() => {
    filterFuelTypes();
  }, [searchText]);

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const renderHighlightedText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <Text className='text-light-text dark:text-dark-text text-base flex-grow'>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <Text key={index} className="bg-light-primary/30 dark:bg-dark-primary/30 font-semibold">{part}</Text>
          ) : (
            part
          )
        )}
      </Text>
    );
  };

  const renderItem: ListRenderItem<FuelType> = ({ item }) => (
    <TouchableOpacity 
      onPress={() => {
        AddListing.updateFuelType(item.id);
        clearSearch();
        router.back();
      }}
      className="p-3 border-b border-light-muted/20 dark:border-dark-muted/20">
      {renderHighlightedText(item.name, searchText)}
    </TouchableOpacity>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="p-4 h-full bg-light-background dark:bg-dark-background">
        
        <InputField
          value={searchText}
          handleChange={handleSearch}
          placeholder='Search Body Types'
        />
        <FlashList
          data={filteredFuelTypes}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          estimatedItemSize={50}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default SelectFuelTypes;
