import React, { useCallback, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import useThemeColors from '@/hooks/useThemeColors';
import useSignUp from '@/hooks/useSignUp';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import useCityStore from '@/hooks/data/useCityStore';
import { router } from 'expo-router';

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
  const signup = useSignUp();
  const { filteredCities, searchText, setSearchText, filterCities } = useCityStore();

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
        <View className="bg-light-background dark:bg-dark-background">
          <Text className="text-base font-bold p-2 mt-4 rounded-xl bg-light-card dark:bg-dark-card text-light-cardForeground dark:text-dark-cardForeground">
            {item.title}
          </Text>
        </View>
      );
    }
    return (
      <TouchableOpacity 
        onPress={() => {
          signup.updateCity(item.id)
          router.back()
        }}
        className="p-2 border-b border-light-muted dark:border-dark-muted">
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
        <TextInput
          className="h-10 border rounded-xl bg-light-background dark:bg-dark-background border-light-muted dark:border-dark-muted text-light-foreground dark:text-dark-foreground mb-4 px-2"
          placeholder="Search cities"
          value={searchText}
          onChangeText={handleSearch}
          
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

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SelectCities;
