import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import useThemeColors from '@/hooks/useThemeColors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import useAreaStore from '@/hooks/data/useAreaStore';
import { useAddListingStore } from '@/hooks/useAddCar';
import { router, Stack } from 'expo-router';

interface Area {
  id: number;
  name: string;
  name_ur: string;
  city_id: number;
}

interface SectionHeader {
  title: string;
  isHeader: true;
}

interface SectionItem extends Area {
  isHeader: false;
}

type ListItem = SectionHeader | SectionItem;

const SelectAreaScreen: React.FC = () => {
  const colors = useThemeColors();
  const { areas, searchText, setSearchText, setAreasByCityId, filterAreas, clearSearch } = useAreaStore();
  const [flattenedData, setFlattenedData] = useState<ListItem[]>([]);
  const AddListingForm = useAddListingStore();

  useEffect(() => {
    setAreasByCityId(AddListingForm.city);
    filterAreas();
  }, [searchText, AddListingForm.city]);

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
          AddListingForm.updateArea(item.id);
          clearSearch()
          router.back(); // Replace with your next screen route
        }}
        className=" p-3 border-b border-light-muted/20 dark:border-dark-muted/20"
      >
        {renderHighlightedText(item.name, searchText)}
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const filteredAreas = areas
      .filter((area) =>
        area.name.toLowerCase().includes(searchText.toLowerCase()) &&
        area.city_id === AddListingForm.city
      )
      .sort((a, b) => a.name.localeCompare(b.name));

    const sections = Array.from(new Set(filteredAreas.map(area => area.name.charAt(0).toUpperCase())))
      .sort()
      .map(letter => ({
        title: letter,
        data: filteredAreas.filter(area => area.name.startsWith(letter))
      }))
      .filter(section => section.data.length > 0);

    const flattenedData = sections.reduce((acc, section) => {
      acc.push({ title: section.title, isHeader: true });
      return acc.concat(section.data.map((item) => ({ ...item, isHeader: false })));
    }, [] as ListItem[]);

    setFlattenedData(flattenedData);
  }, [searchText, areas, AddListingForm.city]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="p-4 h-full bg-light-background dark:bg-dark-background">
        <TextInput
          className="h-10 border rounded-xl bg-light-background dark:bg-dark-background border-light-muted dark:border-dark-muted text-light-foreground dark:text-dark-foreground mb-4 px-2"
          placeholder="Search areas"
          value={searchText}
          onChangeText={handleSearch}
        />
        <FlashList
          key={flattenedData.length}
          data={flattenedData}
          renderItem={renderItem}
          keyExtractor={(item) => (item.isHeader ? item.title : item.id.toString())}
          estimatedItemSize={500}
          stickyHeaderIndices={flattenedData
            .map((item, index) => (item.isHeader ? index : null))
            .filter((index) => index !== null) as number[]}
        />
      </View>
    
    </GestureHandlerRootView>
  );
};

export default SelectAreaScreen;
