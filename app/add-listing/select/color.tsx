import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import useThemeColors from '@/hooks/useThemeColors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import useColorStore from '@/hooks/data/useColorStore';
import { useAddListingStore } from '@/hooks/useAddCar';
import { router } from 'expo-router';
import InputField from '@/components/InputField';

interface Color {
  id: number;
  name: string;
  name_ur: string;
  hex_code: string;
}

const SelectColors: React.FC = () => {
  const colors = useThemeColors();
  const { filteredColors, searchText, setSearchText, filterColors, clearSearch } = useColorStore();
  const AddListing = useAddListingStore();

  useEffect(() => {
    filterColors();
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

  const renderItem: ListRenderItem<Color> = ({ item }) => (
    <TouchableOpacity 
      onPress={() => {
        AddListing.updateColor(item.id);
        clearSearch();
        router.back();
      }}
      className="p-3 flex-row justify-between border-b border-light-muted/20 dark:border-dark-muted/20">
      {renderHighlightedText(item.name, searchText)}
      <View className='bg-light-muted h-6 w-6 rounded-full' style={{backgroundColor: item.hex_code}} />
    </TouchableOpacity>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="p-4 h-full bg-light-background dark:bg-dark-background">
        
        <InputField
        value={searchText}
        handleChange={handleSearch}
        placeholder='Search Cities'
        />
        <FlashList
          data={filteredColors}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          estimatedItemSize={20}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default SelectColors;
