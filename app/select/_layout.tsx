import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import useThemeColors from '@/hooks/useThemeColors';

const SelectLayout = () => {
  const colors = useThemeColors();
  return (
    <Stack>
      <Stack.Screen
        name="cities"
        options={{
          headerTitle: "Select City",
          headerShown: true,
          headerStyle: { backgroundColor: colors.backgroundCode },
          headerTintColor: colors.foregroundCode,
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
};

export default SelectLayout;
