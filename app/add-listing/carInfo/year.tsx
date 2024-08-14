import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import useThemeColors from '@/hooks/useThemeColors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAddListingStore } from '@/hooks/useAddCar';
import { router } from 'expo-router';
import InputField from '@/components/InputField';

const years = Array.from({ length: 2024 - 1940 + 1 }, (_, index) => 2024 - index);  // Descending order

const SelectYear: React.FC = () => {
  const colors = useThemeColors();
  const [searchText, setSearchText] = useState('');
  const [filteredYears, setFilteredYears] = useState(years);
  const AddListing = useAddListingStore();

  useEffect(() => {
    filterYears();
  }, [searchText]);

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const filterYears = () => {
    const filtered = searchText
      ? years.filter(year =>
          year.toString().includes(searchText)
        )
      : years;
    setFilteredYears(filtered);
  };

  const renderHighlightedText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <Text className='text-light-text dark:text-dark-text text-base'>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <Text key={index} className="bg-light-primary/30 dark:bg-dark-primary/30 font-iSemiBold">{part}</Text>
          ) : (
            part
          )
        )}
      </Text>
    );
  };

  const renderItem: ListRenderItem<number> = ({ item }) => (
    <TouchableOpacity 
      onPress={() => {
        AddListing.updateYear(item);
        setSearchText('')
        router.replace('/add-listing/carInfo/models');
      }}
      className="p-3 border-b border-light-muted/20 dark:border-dark-muted/20">
      {renderHighlightedText(item.toString(), searchText)}
    </TouchableOpacity>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="p-4 h-full bg-light-background dark:bg-dark-background">
        <InputField
          value={searchText}
          handleChange={handleSearch}
          placeholder='Search Years'
        />
        <FlashList
          data={filteredYears}
          renderItem={renderItem}
          keyExtractor={item => item.toString()}
          estimatedItemSize={150}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default SelectYear;
