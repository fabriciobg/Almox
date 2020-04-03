import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import HomeNavigator from './HomeNavigator'
import ItemNavigator from './ItemNavigator'
import ArmazemNavigator from './ArmazemNavigator'

import { Colors } from '../styles'

const Tab = createBottomTabNavigator();

export default () => {
  return (
    <Tab.Navigator
      initialRouteName="Home Navigator"
      tabBarOptions={{
        activeTintColor: Colors.bottomTabIconColor,
      }}
    >
      <Tab.Screen
        name="Home Navigator"
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size}/>
          ),
        }}
      />
      <Tab.Screen
        name="Armazem Navigator"
        component={ArmazemNavigator}
        options={{
          tabBarLabel: 'Armazém',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="treasure-chest" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Item Navigator"
        component={ItemNavigator}
        options={{
          tabBarLabel: 'Itens',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="toolbox" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// https://reactnavigation.org/docs/bottom-tab-navigator