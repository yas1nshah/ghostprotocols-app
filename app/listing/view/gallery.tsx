// app/image-detail.tsx
import React from 'react';
import { View, Dimensions, StatusBar, StyleSheet } from 'react-native';
import { FlatList } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { router, useRouter, useLocalSearchParams } from 'expo-router';
import { URLs } from '@/constants/Urls';

const { width, height } = Dimensions.get('window');

const ImageDetailScreen: React.FC = () => {
  const { images, initialIndex } = useLocalSearchParams();
  const parsedImages = JSON.parse(images as string); // Parse JSON string
  const parsedIndex = Number(initialIndex);

  const imageUrls = parsedImages.map((image: { url: string }) => ({
    url: `${URLs.listing.image}${image.url}`,
  }));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageViewer
        imageUrls={imageUrls}
        index={parsedIndex}
        // renderIndicator={() => null}
        enableImageZoom
        enableSwipeDown
        onSwipeDown={() => {
          // Handle swipe down to close
          router.back();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default ImageDetailScreen;
