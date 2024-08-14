import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import useThemeColors from '@/hooks/useThemeColors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import useVersionStore from '@/hooks/data/useVersionStore';
import useGenerationStore from '@/hooks/data/useGenerationStore';
import { useAddListingStore } from '@/hooks/useAddCar';
import { router } from 'expo-router';
import useTransmissionStore from '@/hooks/data/useTransmissionStore';
import useFuelTypeStore from '@/hooks/data/useFuelStore';
import InputField from '@/components/InputField';

interface Version {
  id: number;
  gen_id: number;
  model_id: number;
  name: string;
  name_ur: string;
  transmission: number;
  engine_capacity: number;
  fuel_type: number;
}

interface Generation {
  id: number;
  start: number;
  end: number;
  model_id: number;
}

interface SectionHeader {
  title: string;
  isHeader: true;
}

interface SectionItem extends Version {
  isHeader: false;
}

type ListItem = SectionHeader | SectionItem;

const SelectVersion: React.FC = () => {
  const colors = useThemeColors();
  const { filteredVersions, searchText, setSearchText, filterVersions, clearSearch } = useVersionStore();
  const { generations, filterGenerations } = useGenerationStore();
  const [flattenedData, setFlattenedData] = useState<ListItem[]>([]);
  const { getTransmissionById } = useTransmissionStore();
  const { getFuelTypeById } = useFuelTypeStore();

  const AddListing = useAddListingStore();

  useEffect(() => {
    filterVersions();
    filterGenerations();
  }, [searchText, AddListing.model, AddListing.year]);

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
          AddListing.updateVersion(item.id);
          if (item.fuel_type !== 0) {
            AddListing.updateFuelType(item.fuel_type);
          }
          if (item.transmission !== 0) {
            AddListing.updateTransmission(item.transmission);
          }
          if (item.engine_capacity !== 0) {
            AddListing.updateEngineCapacity(item.engine_capacity);
          }
          clearSearch();
          router.back();
        }}
        className="p-3 border-b border-light-muted/20 dark:border-dark-muted/20">
        {renderHighlightedText(item.name, searchText)}

        <View className='px-4 rounded-xl flex-row justify-between items-center bg-light-muted/10 dark:bg-dark-muted/10'>
          <Text className="py-2 text-light-mutedForeground dark:text-dark-mutedForeground">
            {getFuelTypeById(item.fuel_type)?.name}
          </Text>
          <Text className="py-2 text-light-mutedForeground dark:text-dark-mutedForeground">
            {getTransmissionById(item.transmission)?.name}
          </Text>
          <Text className="py-2 text-light-mutedForeground dark:text-dark-mutedForeground">
            {item.engine_capacity} cc
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const filterVersionsByModel = (text: string): Version[] => {
    const searchWords = text.toLowerCase().split(' ');

    return filteredVersions.filter((version) => 
      searchWords.every((word) =>
        version.name.toLowerCase().includes(word)
      )
    );
  };

  useEffect(() => {
    const filteredResults = searchText ? filterVersionsByModel(searchText) : filteredVersions;

    const sections = generations
      .filter(generation => 
        generation.model_id === AddListing.model &&
        AddListing.year >= generation.start &&
        AddListing.year <= generation.end
      )
      .sort((a, b) => a.start - b.start) // Sort generations by start year
      .map((generation) => ({
        title: `${generation.start} - ${generation.end}`,
        data: filteredResults.filter((version) => version.gen_id === generation.id),
      }))
      .filter((section) => section.data.length > 0); // Remove empty sections

    const flattenedData = sections.reduce((acc, section) => {
      acc.push({ title: section.title, isHeader: true });
      return acc.concat(section.data.map((item) => ({ ...item, isHeader: false })));
    }, [] as ListItem[]);

    setFlattenedData(flattenedData);
  }, [searchText, filteredVersions, generations, AddListing.year]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="p-4 h-full bg-light-background dark:bg-dark-background">
        
        <InputField
        value={searchText}
        handleChange={handleSearch}
        placeholder='Search Versions'
        />
        <FlashList
          key={flattenedData.length} // Force re-render when data changes
          data={flattenedData}
          renderItem={renderItem}
          // keyExtractor={(item) => (item.isHeader ? item.title : item.id.toString())}
          estimatedItemSize={25}
          stickyHeaderIndices={flattenedData
            .map((item, index) => (item.isHeader ? index : null))
            .filter((index) => index !== null) as number[]}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default SelectVersion;
