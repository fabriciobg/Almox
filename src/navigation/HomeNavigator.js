import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home'

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      headerMode="screen"
      headerMode="none"
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          
        }}
      />
      {/* <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'My profile',
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          gestureEnabled: false,
        }}
      /> */}
    </Stack.Navigator>
  );
}