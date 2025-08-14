import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Platform } from 'react-native';

// Importando las pantallas
import Home from '../screens/Home';
import ShowUser from '../screens/ShowUser';
import AddUser from '../screens/AddUser';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#6366F1', // Indigo vibrante
        tabBarInactiveTintColor: '#94A3B8', // Gris azulado
        tabBarStyle: { 
          backgroundColor: '#FFF', 
          height: Platform.OS === 'ios' ? 90 : 70,
          borderTopWidth: 0,
          elevation: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
          paddingTop: 10,
          paddingHorizontal: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginBottom: 4,
        },
        tabBarItemStyle: {
          borderRadius: 12,
          marginHorizontal: 4,
        },
        tabBarActiveBackgroundColor: 'rgba(99, 102, 241, 0.1)',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconSize = focused ? size + 2 : size;
          
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'ShowUser') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'AddUser') {
            iconName = focused ? 'person-add' : 'person-add-outline';
          }
          
          return <Ionicons name={iconName} color={color} size={iconSize} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ 
          title: 'Inicio',
          tabBarLabel: 'Inicio'
        }}
      />
      <Tab.Screen
        name="ShowUser"
        component={ShowUser}
        options={{ 
          title: 'Usuarios',
          tabBarLabel: 'Usuarios'
        }}
      />
      <Tab.Screen
        name="AddUser"
        component={AddUser}
        options={{ 
          title: 'Agregar',
          tabBarLabel: 'Agregar'
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;