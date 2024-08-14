import React, { useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import useThemeColors from '@/hooks/useThemeColors';
import useSignUp from '@/hooks/useSignUp';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import useTransmissionStore from '@/hooks/data/useTransmissionStore';
import { useAddListingStore } from '@/hooks/useAddCar';
import { router } from 'expo-router';

interface Transmission {
  id: number;
  name: string;
}

const SelectTransmissions: React.FC = () => {
  const colors = useThemeColors();
//   const transmissions = use();
  const { filteredTransmissions, searchText, setSearchText, filterTransmissions, clearSearch } = useTransmissionStore();
  const AddListing = useAddListingStore()

  useEffect(() => {
    filterTransmissions();
  }, [searchText]);

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const renderHighlightedText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <Text className='text-light-text dark:text-dark-text text-base'>
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

  const renderItem: ListRenderItem<Transmission> = ({ item }) => (
    <TouchableOpacity 
      onPress={() => {
        AddListing.updateTransmission(item.id)
        clearSearch()
        router.back()
      }}
      className="p-4 border-b border-light-muted dark:border-dark-muted  bg-light-card dark:bg-dark-card">
      {renderHighlightedText(item.name, searchText)}
    </TouchableOpacity>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="py-4 h-full bg-light-background dark:bg-dark-background">
        {/* <Text>{signup.transmission}</Text> */}
        <TextInput
          className="h-10 mx-4 border rounded-xl bg-light-background dark:bg-dark-background border-light-muted dark:border-dark-muted text-light-foreground dark:text-dark-foreground mb-4 px-2"
          placeholder="Search transmissions"
          value={searchText}
          onChangeText={handleSearch}
        />
        <FlashList
          data={filteredTransmissions}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          estimatedItemSize={50}
          
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default SelectTransmissions;
