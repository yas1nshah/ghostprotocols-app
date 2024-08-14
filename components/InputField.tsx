import { View, Text, TextInput, KeyboardTypeOptions } from 'react-native';
import React from 'react';
import useThemeColors from '@/hooks/useThemeColors';
import ThemedText from './ThemedText';

type Props = {
  title?: string;
  value: string;
  editable?: boolean;
  placeholder?: string;
  handleChange: (text: string) => void;
  onFocus?: () => void;
  otherStyles?: string;
  secureText?: boolean;
  prefix?: string;
  onSubmitEditing?: () => void;
  returnKeyType?: 'default' | 'go' | 'google' | 'join' | 'next' | 'route' | 'search' | 'send' | 'yahoo' | 'done' | 'emergency-call';
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
};

const InputField = React.forwardRef<TextInput, Props>(
  (
    {
      title,
      value,
      editable,
      prefix,
      onFocus,
      placeholder,
      handleChange,
      otherStyles,
      secureText,
      onSubmitEditing,
      returnKeyType,
      keyboardType,
      multiline,
    },
    ref
  ) => {
    const colors = useThemeColors();
    return (
      <View className='my-2'>
        {title && (
          <Text className='text-light-text dark:text-dark-text text-sm opacity-50'>
            {title}
          </Text>
        )}
        <View
          className={`bg-light-background dark:bg-dark-background overflow-hidden border-light-primary rounded-xl focus:border-2 ${
            prefix
              ? 'flex-row items-center border-2 border-light-text/10 dark:border-dark-text/10'
              : ''
          } ${otherStyles}`}
        >
          {prefix && (
            <View className='px-2 py-6 dark:bg-dark-muted/20 bg-light-muted/20 h-full my-auto'>
              <ThemedText type='content' content={prefix} />
            </View>
          )}
          <TextInput
            ref={ref}
            className={`text-normal text-light-text flex-grow  dark:text-dark-text m-1 p-3 rounded-xl ${prefix ? 'pl-2' : 'border-2 border-light-text/10 dark:border-dark-text/10'}`}
            editable={editable ?? true}
            placeholder={placeholder}
            placeholderTextColor={colors.mutedCode}
            onChangeText={handleChange}
            value={value}
            secureTextEntry={secureText ?? false}
            cursorColor={colors.primaryCode}
            returnKeyType={returnKeyType}
            keyboardType={keyboardType ?? 'default'}
            multiline={multiline}
            numberOfLines={multiline ? 6 : 1}
            onSubmitEditing={onSubmitEditing}
          />
        </View>
      </View>
    );
  }
);

export default InputField;
