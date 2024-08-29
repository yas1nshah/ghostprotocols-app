import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import makes from '@/constants/data/makes.json';
import models from '@/constants/data/models.json';
import versions from '@/constants/data/versions.json';

// Define types for the data structures
type Make = {
  id: number;
  name: string;
};

type Model = {
  id: number;
  name: string;
  make_id: number;
};

type Version = {
  id: number;
  name: string;
  model_id: number;
};

type ResultItem = {
  name: string;
  type: 'Make' | 'Model' | 'Version' | 'None';
  makeId?: number;
  modelId?: number;
  versionId?: number;
};

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<ResultItem[]>([]);

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text === '') {
      setResults([]);
      return;
    }

    const lowerCaseText = text.toLowerCase().trim();
    const [makeQuery, modelQuery, versionQuery] = lowerCaseText.split(' ');

    // Match Makes
    const matchingMakes = makes.filter((make: Make) =>
      make.name.toLowerCase().includes(makeQuery)
    );

    // Match Models
    let matchingModels: Model[] = [];
    if (modelQuery) {
      matchingModels = models.filter((model: Model) =>
        model.name.toLowerCase().includes(modelQuery) &&
        matchingMakes.some((make: Make) => make.id === model.make_id)
      );
    }

    // Match Versions
    let matchingVersions: Version[] = [];
    if (versionQuery) {
      matchingVersions = versions.filter((version: Version) =>
        version.name.toLowerCase().includes(versionQuery) &&
        matchingModels.some((model: Model) => model.id === version.model_id)
      );
    }

    // Combine results based on query parts
    let combinedResults: ResultItem[] = [];

    if (matchingVersions.length > 0) {
      // If versions are found, show all levels
      combinedResults = matchingVersions.map((version: Version) => {
        const model = matchingModels.find((model: Model) => model.id === version.model_id);
        const make = matchingMakes.find((make: Make) => make.id === model?.make_id);
        return { 
          name: `${make?.name} ${model?.name} ${version.name}`, 
          type: 'Version', 
          makeId: make?.id, 
          modelId: model?.id, 
          versionId: version.id 
        };
      });
    } else if (matchingModels.length > 0) {
      // If models are found but no versions, show makes and models
      combinedResults = matchingModels.map((model: Model) => {
        const make = matchingMakes.find((make: Make) => make.id === model.make_id);
        return { 
          name: `${make?.name} ${model.name}`, 
          type: 'Model', 
          makeId: make?.id, 
          modelId: model.id 
        };
      });
      combinedResults = [...combinedResults, ...matchingMakes.map((make: Make) => ({
        name: make.name, 
        type: 'Make', 
        makeId: make.id 
      }))];
    } else if (matchingMakes.length > 0) {
      // If only makes are found
      combinedResults = matchingMakes.map((make: Make) => ({
        name: make.name, 
        type: 'Make', 
        makeId: make.id 
      }));
    } else {
      combinedResults = [{ name: 'No results found', type: 'None' }];
    }

    setResults(combinedResults);
  };

  const handlePress = (item: ResultItem) => {
    const result = {
      make: item.makeId,
      model: item.modelId || false,
      version: item.versionId || false
    };
    console.log(result);
    Alert.alert('Result', JSON.stringify(result));
  };

  return (
    <View style={{ flex: 1, padding: 20 }}> 
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={query}
        onChangeText={handleSearch}
      />

      <FlashList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[
              styles.item,
              item.type === 'Make' && styles.make,
              item.type === 'Model' && styles.model,
              item.type === 'Version' && styles.version
            ]}
            onPress={() => handlePress(item)}
          >
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        estimatedItemSize={60}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20
  },
  item: {
    padding: 10,
    marginBottom: 10
  },
  make: {
    backgroundColor: 'red'
  },
  model: {
    backgroundColor: 'green'
  },
  version: {
    backgroundColor: 'blue'
  },
  itemText: {
    color: 'white'
  }
});

export default Search;
