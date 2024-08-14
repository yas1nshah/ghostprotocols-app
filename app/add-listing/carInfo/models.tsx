import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import useThemeColors from '@/hooks/useThemeColors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useModelStore } from '@/hooks/data/useModelStore';
import { useMakeStore } from '@/hooks/data/useMakeStore';
import { useAddListingStore } from '@/hooks/useAddCar';
import { router } from 'expo-router';
import InputField from '@/components/InputField';
import useVersionStore from '@/hooks/data/useVersionStore';
import useGenerationStore from '@/hooks/data/useGenerationStore';

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
  const { models, searchText, setSearchText, filterModels, clearSearch } = useModelStore();
  const { makes, getMakeById } = useMakeStore();
  const [flattenedData, setFlattenedData] = useState<ListItem[]>([]);

  const AddCarForm = useAddListingStore()
  const {getVersionsByModelId} = useVersionStore()
  const {filterByModelAndYear} = useGenerationStore()


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
        <View className="bg-light-background mb-4 dark:bg-dark-background rounded-b-xl overflow-hidden">
          <Text className="text-base font-bold p-4 rounded-xl bg-light-card dark:bg-dark-card text-light-cardForeground dark:text-dark-cardForeground">
            {item.title}
          </Text>
        </View>
      );
    }
    return (
      <TouchableOpacity 
        onPress={()=> {
          AddCarForm.updateMake(item.make_id)
          AddCarForm.updateModel(item.id)
          clearSearch()

          if (filterByModelAndYear(item.id, AddCarForm.year) == 0){

            router.back()
          }
          if(getVersionsByModelId(item.id).length == 0){
            router.back()
          }
          else{
            router.replace('/add-listing/carInfo/version')
          }

        }}
        className="p-3 border-b border-light-muted/20 dark:border-dark-muted/20">
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
        
        <InputField
        value={searchText}
        handleChange={handleSearch}
        placeholder='Search models'
        />
        <FlashList
          key={flattenedData.length} // Force re-render when data changes
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
