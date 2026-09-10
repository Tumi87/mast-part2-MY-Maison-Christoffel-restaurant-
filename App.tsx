import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './navigation/types';
import { MenuProvider } from './context/MenuContext';

import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import ChefMenuScreen from './screens/ChefMenu';
import AddDishScreen from './screens/AddDishScreen';
import EditDishScreen from './screens/EditDishScreen';
import ItemDetailScreen from './screens/ItemDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="ChefMenu" component={ChefMenuScreen} />
          <Stack.Screen name="AddDish" component={AddDishScreen} />
          <Stack.Screen name="EditDish" component={EditDishScreen} />
          <Stack.Screen name="ItemDetail" component={ItemDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}
