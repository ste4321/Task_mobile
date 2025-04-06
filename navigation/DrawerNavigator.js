// navigation/DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from './StackNavigator.js';
import SettingsScreen from '../screens/SettingsScreen.js';
import HistoryScreen from '../screens/HistoryScreen.js';
import ProfilScreen from '../screens/ProfilScreen.js';

import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
    screenOptions={{
      drawerStyle: {
        backgroundColor: '#222831',
      },
      drawerActiveTintColor: '#00adb5',
      drawerInactiveTintColor: '#eeeeee',
      drawerPosition: 'right', // Position du drawer à droite
    }}
    >
      <Drawer.Screen 
        name="Home" 
        component={StackNavigator} 
        options={{ title: 'Accueil',
                    drawerIcon: ({ color, size }) => (
                    <Ionicons name="home-outline" size={size} color={color} />
          ),}} 
      />
      <Drawer.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ title: 'Paramètres',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ), }} 
      />
      <Drawer.Screen 
        name="Profil" 
        component={ProfilScreen} 
        options={{ title: 'Profil',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ), }} 
      />
      <Drawer.Screen 
        name="History" 
        component={HistoryScreen} 
        options={{ title: 'Historique',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="time-outline" size={size} color={color} />
          ), }} 
      />
    </Drawer.Navigator>
  );
}
