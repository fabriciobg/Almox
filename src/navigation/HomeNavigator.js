import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home'
import MeuArmazem from '../screens/MeuArmazem'

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="MeuArmazem" component={MeuArmazem} />
    </Stack.Navigator>
  );
}