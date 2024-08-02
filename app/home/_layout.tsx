import useThemeColors from '@/hooks/useThemeColors';
import { Tabs } from 'expo-router';

const HomeLayout = () => {
  const colors = useThemeColors()
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home', headerShown:false }} />
      <Tabs.Screen name="search" options={{ title: 'Search', headerShown:false }} />
      <Tabs.Screen name="addListing" options={{ title: 'Profile', headerShown:false }} />
      <Tabs.Screen name="demandList" options={{ title: 'Demand List', headerShown:false }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings', headerShown:false,
       headerTitleAlign:'center', headerStyle: {backgroundColor: colors.background} }} />
    </Tabs>
  );
}

export default HomeLayout;
