import { View, ScrollView, Image, Dimensions } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';

import expressLubeImg from '@/assets/images/featured/express-lube.png';
import naPerformanceImg from '@/assets/images/featured/na-performance.png';
import profixGarageImg from '@/assets/images/featured/profix-garage.png';
import streetPerformanceImg from '@/assets/images/featured/street-performance.png';
import sultanTradersImg from '@/assets/images/featured/sultan-traders.png';
import useThemeColors from '@/hooks/useThemeColors';
import ThemedText from './ThemedText';

const FeaturedAutoPlay = () => {
  const colors = useThemeColors();
  const scrollViewRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (scrollViewRef.current) {
        if (scrollPosition >= contentWidth - Dimensions.get('window').width) {
          // If we are at the end, scroll back to the start
          scrollViewRef.current.scrollTo({ x: 0, animated: true });
          setScrollPosition(0);
        } else {
          // Otherwise, keep scrolling forward
          scrollViewRef.current.scrollTo({
            x: scrollPosition,
            animated: true,
          });
          setScrollPosition((prevPosition) => prevPosition + 200); // Adjust the scroll increment as needed
        }
      }
    }, 1000); // Adjust the interval time as needed

    return () => clearInterval(intervalId);
  }, [scrollPosition, contentWidth]);

  return (
    <View className='my-6'>
      <ThemedText
        type='heading'
        content='Featuring Companies'
      />

      <ScrollView 
        className='py-4'
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        onContentSizeChange={(width) => setContentWidth(width)} // Get the content width
        onScroll={(event) => {
          const contentOffsetX = event.nativeEvent.contentOffset.x;
          setScrollPosition(contentOffsetX);
        }}
        scrollEventThrottle={16}
      >
        <View className='bg-dark-card h-24 w-44 mr-4 rounded-xl'>
          <Image 
            source={naPerformanceImg}
            style={{ height: '100%', width: '100%', resizeMode: 'contain', tintColor: colors.foregroundCode }}
          />
        </View>

        <View className='bg-dark-card h-24 w-44 mr-4 rounded-xl'>
          <Image 
            source={profixGarageImg}
            style={{ height: '100%', width: '100%', resizeMode: 'contain', tintColor: colors.foregroundCode }}
          />
        </View>

        <View className='bg-dark-card h-24 w-44 mr-4 rounded-xl'>
          <Image 
            source={expressLubeImg}
            style={{ height: '100%', width: '100%', resizeMode: 'contain', tintColor: colors.foregroundCode }}
          />
        </View>

        <View className='bg-dark-card h-24 w-44 mr-4 rounded-xl'>
          <Image 
            source={streetPerformanceImg}
            style={{ height: '100%', width: '100%', resizeMode: 'contain', tintColor: colors.foregroundCode }}
          />
        </View>

        <View className='bg-dark-card h-24 w-44 mr-4 rounded-xl'>
          <Image 
            source={sultanTradersImg}
            style={{ height: '100%', width: '100%', resizeMode: 'contain', tintColor: colors.foregroundCode }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default FeaturedAutoPlay;
