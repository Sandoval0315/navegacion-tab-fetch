import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

import Home from '../screens/Home.js';
import ShowUser from '../screens/ShowUser.js';
import AddUser from '../screens/AddUser.js';
import TabNavigator from './TabNavigator';
import LoginScreen from '../screens/LoginScreen.js';
import Products from '../screens/Products.js';

export default function Navigation() {
  const Stack = createNativeStackNavigator();
  const { authToken } = useContext(AuthContext); // Usar el contexto aquí
  
  return (
    <NavigationContainer> 
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {authToken ? (
          // Si hay token, mostrar las pantallas principales
          <>
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name="Home" component={Home} /> 
            <Stack.Screen name="Products" component={Products} /> 
            <Stack.Screen name="ShowUser" component={ShowUser} /> 
            <Stack.Screen name="AddUser" component={AddUser} />
          </>
        ) : (
          // Si no hay token, solo mostrar login
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}