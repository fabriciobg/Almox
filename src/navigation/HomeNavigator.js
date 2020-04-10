import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home'
import MeuArmazem from '../screens/MeuArmazem'
import ItemArmazemRegister from '../screens/ItemArmazemRegister'
import ItemArmazemManage from '../screens/ItemArmazemManage'
import ItemArmazemCheck from '../screens/ItemArmazemCheck'

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="MeuArmazem" component={MeuArmazem} />
      <Stack.Screen name="ItemArmazemRegister" component={ItemArmazemRegister} />
      <Stack.Screen name="ItemArmazemManage" component={ItemArmazemManage} />
      <Stack.Screen name="ItemArmazemCheck" component={ItemArmazemCheck} />
    </Stack.Navigator>
  );
}