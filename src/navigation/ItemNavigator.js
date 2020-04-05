import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import ItemHome from '../screens/ItemHome'
import ItemRegister from '../screens/ItemRegister'
import ItemList from '../screens/ItemList'
import ItemEdit from '../screens/ItemEdit'

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      initialRouteName="ItemHome"
      headerMode="none"
    >
      <Stack.Screen
        name="ItemHome"
        component={ItemHome}
      />
      <Stack.Screen
        name="ItemRegister"
        component={ItemRegister}
      />
      <Stack.Screen
        name="ItemList"
        component={ItemList}
      />
      <Stack.Screen
        name="ItemEdit"
        component={ItemEdit}
      />
    </Stack.Navigator>
  );
}