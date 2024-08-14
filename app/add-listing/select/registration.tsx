import React, { useCallback, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import useThemeColors from '@/hooks/useThemeColors';
import useRegistrationStore from '@/hooks/data/useRegistrationStore'; // Assuming you have this store
import InputField from '@/components/InputField';
import { router } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAddListingStore } from '@/hooks/useAddCar';

interface Registration {
  id: number;
  name: string;
  name_ur: string;
  type: string; // 'Un Registered', 'Province', 'City'
}

interface SectionHeader {
  title: string;
  isHeader: true;
}

interface SectionItem extends Registration {
  isHeader: false;
}

type ListItem = SectionHeader | SectionItem;

const SelectRegistrations: React.FC = () => {
  const colors = useThemeColors();
  const { filteredRegistrations, searchText, setSearchText, filterRegistrations, clearSearch } = useRegistrationStore();

  const {updateRegistration} = useAddListingStore();

  useEffect(() => {
    filterRegistrations();
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
            updateRegistration(item.id)
          // Handle registration selection
          // For example, navigate to another screen or update store
          router.back(); // Replace with your screen route
        }}
        className="p-3 border-b border-light-muted/20 dark:border-dark-muted/20">
        {renderHighlightedText(item.name, searchText)}
      </TouchableOpacity>
    );
  };

  const sections = [
    { title: 'Un Registered', data: filteredRegistrations.filter(reg => reg.type === 'Un Registered') },
    { title: 'Province', data: filteredRegistrations.filter(reg => reg.type === 'Province') },
    { title: 'City', data: filteredRegistrations.filter(reg => reg.type === 'City') },
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
          placeholder='Search Registrations'
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

export default SelectRegistrations;
