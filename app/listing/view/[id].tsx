import { View, Text, FlatList, Image, ActivityIndicator, Dimensions, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from 'react-query';
import { getLisitng } from '@/functions/listing/add-listing/listing';
import { URLs } from '@/constants/Urls';
import Gallery from '@/components/listings/view/Gallery';
import ThemedText from '@/components/ThemedText';
import { formatPrice, formatTimeAgo } from '@/functions/utils';

import darkBackground from '@/assets/images/bg-dark.png'; 
import useThemeColors from '@/hooks/useThemeColors';

import YearIcon from '@/assets/icons/listing/year.png'
import MileageIcon from '@/assets/icons/listing/speedometer.png'
import EngineIcon from '@/assets/icons/listing/engine.png'
import RegistrationIcon from '@/assets/icons/listing/ticket.png'
import OverViewItem from '@/components/listings/view/OverViewItem';
import DetailItem from '@/components/listings/view/DetailItem';
import FeaturedAutoPlay from '@/components/FeaturedAutoPlay';

const {width} = Dimensions.get('window')

const Index = () => {
  const { id } = useLocalSearchParams();
  const { data, isLoading, error } = useQuery(['listing', id], () => getLisitng(id));

  const colors = useThemeColors()

  if (isLoading) {
    return (
      <View >
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View >
        <Text>Error loading data.</Text>
      </View>
    );
  }

  return (
    <ScrollView className='bg-light-background dark:bg-dark-background h-full'>
      {/* <Text style={styles.idText}>{id}</Text> */}
      {/* <Text>{JSON.stringify(data)}</Text> */}
      <ImageBackground
        source={darkBackground}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <Gallery
          Images={data?.listing.gallery}
        />
        <View className='p-4'>
          <ThemedText
          content={`${data.listing.make} ${data.listing.model} ${data.listing.version || ''} `}
          type='heading'
          />
          <ThemedText
          content={`Rs ${formatPrice(data.listing.price)}`}
          type='heading'
          otherStyles='text-2xl text-light-primary dark:text-dark-primary'
          />

          <View className='p-2 bg-light-card dark:bg-dark-card rounded-xl my-2 flex-row justify-between'>
            
            <OverViewItem
            img={YearIcon}
            title='Year'
            value={data.listing.year}
            />

            <OverViewItem
            img={MileageIcon}
            title='Mileage'
            value={data.listing.mileage + ' km'}
            />

            <OverViewItem
            img={EngineIcon}
            title='Engine'
            value={data.listing.fuel_type}
            />

            <OverViewItem
            img={RegistrationIcon}
            title='Registration'
            value={data.listing.registration}
            />
            
          </View>

          <View className='py-2'>
            <DetailItem
            title = "Car Location"
            value = {`${data.listing.area ? data.listing.area + ", " : ''}${data.listing.city}`}
            />
            <DetailItem
            title = "Body"
            value = {data.listing.body_type}
            />
            <DetailItem
            title = "Color"
            value = {data.listing.color}
            />
            <DetailItem
            title = "Engine Capacity"
            value = {data.listing.engine_capacity + " cc"}
            />
            <DetailItem
            title = "Transmission"
            value = {data.listing.transmission}
            />
            <DetailItem
            title = "Uploaded"
            value = {formatTimeAgo(data.listing.updated_at)}
            />
            <DetailItem
            title = "Listing ID#"
            value = {data.listing.id}
            />
          </View>

          <View className='my-4 p-4 bg-light-card dark:bg-dark-card rounded-xl'>
            <ThemedText
            content="Seller Comments"
            type='subheading'
            />
            <ThemedText
            content={data.listing.details}
            type='content'
            />
          </View>

          <FeaturedAutoPlay/>
        </View>
        </ImageBackground>
      {/* <FlatList
        data={data?.listing.gallery}
        keyExtractor={(item, index) => item.url + index}
        renderItem={({ item }) => (
          <Image
            source={{ uri: URLs.listing.image + item.url }}
            style={{width: width, height: 250}}
            resizeMode='cover'
          />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // or any background color you prefer
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  idText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
 
});

export default Index;
