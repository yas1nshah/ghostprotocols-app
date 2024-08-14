import React, { useCallback, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import useThemeColors from '@/hooks/useThemeColors';
import useSignUp from '@/hooks/useSignUp';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import useCityStore from '@/hooks/data/useCityStore';
import InputField from '@/components/InputField';
import useAreaStore from '@/hooks/data/useAreaStore';
import { router } from 'expo-router';
import { useAddListingStore } from '@/hooks/useAddCar';

interface City {
  id: number;
  name: string;
  name_ur: string;
  popular: boolean;
}

interface SectionHeader {
  title: string;
  isHeader: true;
}

interface SectionItem extends City {
  isHeader: false;
}

type ListItem = SectionHeader | SectionItem;

const SelectCities: React.FC = () => {
  const colors = useThemeColors();
  const listing = useAddListingStore();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { filteredCities, searchText, setSearchText, filterCities, clearSearch } = useCityStore();
  const areaStore = useAreaStore()

  useEffect(() => {
    filterCities();
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

  const renderItem: ListRenderItem<ListItem> = ({ item }) => {
    if (item.isHeader) {
      return (
        <View className="bg-light-background mb-4 dark:bg-dark-background rounded-b-xl overflow-hidden">
          <Text className="text-base font-bold p-4 rounded-xl bg-light-card dark:bg-dark-card text-light-cardForeground dark:text-dark-cardForeground">
            {item.title}
          </Text>
        </View>
      );
    }
    return (
      <TouchableOpacity 
        onPress={() => {
          listing.updateCity(item.id)
          listing.updateArea(0)
          clearSearch()
          if (areaStore.getAreasByCityId(item.id).length == 0){
            router.back()
          } 
          else{
            router.replace('/add-listing/select/area')
          }
        }
        }
        className="p-3 border-b border-light-muted/20 dark:border-dark-muted/20">
        {renderHighlightedText(item.name, searchText)}
      </TouchableOpacity>
    );
  };

  const sections = [
    { title: 'Popular Cities', data: filteredCities.filter(city => city.popular) },
    { title: 'Other Cities', data: filteredCities.filter(city => !city.popular) },
  ].filter(section => section.data.length > 0); // Remove empty sections

  const flattenedData: ListItem[] = sections.reduce((acc, section) => {
    acc.push({ title: section.title, isHeader: true });
    return acc.concat(section.data.map(item => ({ ...item, isHeader: false })));
  }, [] as ListItem[]);


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="p-4 h-full bg-light-background dark:bg-dark-background">
      
        <InputField
        value={searchText}
        handleChange={handleSearch}
        placeholder='Search Cities'
        />
        <FlashList
          data={flattenedData}
          renderItem={renderItem}
          keyExtractor={item => (item.isHeader ? item.title : item.id.toString())}
          estimatedItemSize={50}
          stickyHeaderIndices={flattenedData.map((item, index) => (item.isHeader ? index : null)).filter(index => index !== null) as number[]}
        />
        
      </View>
    </GestureHandlerRootView>
  );
};



export default SelectCities;
