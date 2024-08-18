import { View, Text, Image as RNImage, FlatList, Dimensions, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { URLs } from '@/constants/Urls';
import ThemedText from '@/components/ThemedText';

// import servicesIcon from '@/assets/icons/services.png'; 
import cameraIcon from '@/assets/icons/camera.png'; 
import useThemeColors from '@/hooks/useThemeColors';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

type ImageType = {
  url: string;
  order: number;
}

type GalleryProps = {
  Images: ImageType[];
}

const Gallery: React.FC<GalleryProps> = ({ Images }) => {
  const sortedImages = Images.sort((a, b) => a.order - b.order);
  const [currentIndex, setCurrentIndex] = useState(0);
  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: any[] }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  };

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50,
  };

  const colors = useThemeColors()
  const handleImagePress = () => {
    router.push({
      pathname: '/listing/view/gallery',
      params: {
        images: JSON.stringify(sortedImages),
        initialIndex: currentIndex,
      },
    });
  };

  return (
    <View>
      <FlatList
        data={sortedImages}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
            <TouchableOpacity onPress={handleImagePress}>
            <RNImage
              source={{ uri: `${URLs.listing.image}${item.url}` }}
              style={{ width, height: 250 }}
              resizeMode='cover'
            />
          </TouchableOpacity>
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />

      <View className=' m-2 flex-row justify-center items-center absolute bottom-0 left-0 rounded-full p-1 pr-2 bg-light-background dark:bg-dark-background' >
        <View className='w-4 h-5 mx-2'>
            <Image 
                source={cameraIcon}
                style={{ height: '100%', width: '100%', resizeMode: 'contain', tintColor: colors.foregroundCode }}
                />
        </View>
        <ThemedText
          type='content'
          content={`${currentIndex + 1}/${sortedImages.length}`}
        />
      </View>
    </View>
  );
}

export default Gallery;
