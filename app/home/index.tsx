import { View, ImageBackground, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import darkBackground from '@/assets/images/bg-dark.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from 'react-query';
import { getHome } from '@/functions/listing/add-listing/listing';
import ThemedText from '@/components/ThemedText';
import { formatPrice, formatTimeAgo } from '@/functions/utils';
import { URLs } from '@/constants/Urls';
import { router } from 'expo-router';
import SmallCard from '@/components/listings/SmallCard';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');

const HomePage = () => {
  const { data, isLoading } = useQuery('home', getHome);

  const renderListing = ({ item }: { item: any }) => (
    // <TouchableOpacity
    //   onPress={() => router.push('/listing/view/' + item.id)}
    //   key={item.id}
    //   className="bg-light-card dark:bg-dark-card max-h-60 mx-2 rounded-xl overflow-hidden"
    //   style={{width: width/2 - 20}}
    // >
    //   <View className="h-32 dark:bg-dark-card bg-light-card">
    //     <Image
    //       source={{ uri: URLs.listing.image + item.gallery[0].url }}
    //       className="flex-1"
    //       resizeMode="cover"
    //     />
    //   </View>

    //   <View className="p-2">
    //     <ThemedText
    //       type="subheading"
    //       content={`${item.make} ${item.model} ${item.version || ''}`}
    //       otherStyles='-my-1'
    //     />
    //     <ThemedText
    //       type="heading"
    //       content={`Rs ${formatPrice(item.price)}`}
    //       otherStyles="text-light-primary dark:text-dark-primary -my-1"
    //     />

    //     <ThemedText
    //       type="content"
    //       content={`${item.area ? item.area + ',' : ''}${item.city}`}
    //       otherStyles="font-iRegular"
    //     />

    //     <View className="w-full flex-row justify-between px-0">
    //       <ThemedText type="subheading" content={item.year} otherStyles='text-sm'/>
    //         <View className='border-r-2 border-light-muted/20 dark:border-dark-muted/20'/>
    //       <ThemedText type="subheading" content={item.mileage + " km"} otherStyles='text-sm' />
    //         <View className='border-r-2 border-light-muted/20 dark:border-dark-muted/20'/>
    //       <ThemedText type="subheading" content={item.fuel_type}  otherStyles='text-sm'/>
    //     </View>

    //     <ThemedText
    //       type="content"
    //       content={formatTimeAgo(item.updated_at)}
    //       otherStyles="opacity-70 text-xs"
    //     />
    //   </View>
    // </TouchableOpacity>
    <SmallCard 
    item={ item}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-light-background dark:bg-dark-background">
      <ImageBackground
        source={darkBackground}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        {!isLoading && (
          <FlatList
            data={data.recent_listings}
            renderItem={renderListing}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />
        )}
        {!isLoading && (
          <FlatList
            data={data.gp_managed_listings}
            renderItem={renderListing}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />
        )}
        <View className='flex-row items-center mb-1'>
          <View className='w-6 h-6 rounded-full bg-light-background dark:bg-dark-background z'>
              <LottieView
              source={require('@/assets/lottie/sheild.json')}
              autoPlay
              loop          
              style={{ width: '100%', height: '100%', aspectRatio: 1, zIndex: 20}}
              resizeMode='contain'
              />
          </View>
          <ThemedText
          type='content'
          content='Certified'
          otherStyles='bg-light-background dark:bg-dark-background pl-1 pr-2 rounded-r-xl -ml-1 z-10'
          />
        </View>

        <View className='flex-row items-center mb-1'>
          <View className='w-6 h-6 rounded-full bg-light-background dark:bg-dark-background z'>
              <LottieView
              source={require('@/assets/lottie/coin.json')}
              autoPlay
              loop          
              style={{ width: '100%', height: '100%', aspectRatio: 1, zIndex: 20}}
              resizeMode='contain'
              />
          </View>
          <ThemedText
          type='content'
          content='Featured'
          otherStyles='bg-light-background dark:bg-dark-background pl-1 pr-2 rounded-r-xl -ml-1 z-10'
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default HomePage;
