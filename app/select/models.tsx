import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import useThemeColors from '@/hooks/useThemeColors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useModelStore } from '@/hooks/data/useModelStore';
import { useMakeStore } from '@/hooks/data/useMakeStore';

interface Model {
  id: number;
  name: string;
  name_ur: string;
  make_id: number;
}

interface SectionHeader {
  title: string;
  isHeader: true;
}

interface SectionItem extends Model {
  isHeader: false;
}

type ListItem = SectionHeader | SectionItem;

const SelectModels: React.FC = () => {
  const colors = useThemeColors();
  const { models, searchText, setSearchText, filterModels } = useModelStore();
  const { makes, getMakeById } = useMakeStore();
  const [flattenedData, setFlattenedData] = useState<ListItem[]>([]);

  useEffect(() => {
    filterModels();
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
      <TouchableOpacity className="p-2 border-b border-light-muted dark:border-dark-muted">
        {renderHighlightedText(item.name, searchText)}
      </TouchableOpacity>
    );
  };

  const filterMakesAndModels = (text: string) => {
    const searchWords = text.toLowerCase().split(' ');

    const filteredModels = models.filter((model) => {
      const make = getMakeById(model.make_id);
      return (
        make &&
        searchWords.every((word) =>
          make.name.toLowerCase().includes(word) || model.name.toLowerCase().includes(word)
        )
      );
    });

    return filteredModels;
  };

  useEffect(() => {
    const filteredResults = searchText ? filterMakesAndModels(searchText) : models;

    const sections = makes
      .sort((a, b) => a.name.localeCompare(b.name)) // Sort makes alphabetically
      .map((make) => ({
        title: make.name,
        data: filteredResults.filter((model) => model.make_id === make.id),
      }))
      .filter((section) => section.data.length > 0); // Remove empty sections

    const flattenedData = sections.reduce((acc, section) => {
      acc.push({ title: section.title, isHeader: true });
      return acc.concat(section.data.map((item) => ({ ...item, isHeader: false })));
    }, [] as ListItem[]);

    setFlattenedData(flattenedData);
  }, [searchText, models, makes]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="p-4 h-full bg-light-background dark:bg-dark-background">
        <TextInput
          className="h-10 border rounded-xl bg-light-background dark:bg-dark-background border-light-muted dark:border-dark-muted text-light-foreground dark:text-dark-foreground mb-4 px-2"
          placeholder="Search models"
          value={searchText}
          onChangeText={handleSearch}
        />
        <FlashList
          key={flattenedData.length} // Force re-render when data changes
          data={flattenedData}
          renderItem={renderItem}
          keyExtractor={(item) => (item.isHeader ? item.title : item.id.toString())}
          estimatedItemSize={50}
          stickyHeaderIndices={flattenedData
            .map((item, index) => (item.isHeader ? index : null))
            .filter((index) => index !== null) as number[]}
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

export default SelectModels;
