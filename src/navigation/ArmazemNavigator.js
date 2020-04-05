import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import ArmazemHome from '../screens/ArmazemHome'
import ArmazemRegister from '../screens/ArmazemRegister'
import ArmazemList from '../screens/ArmazemList'
import ArmazemEdit from '../screens/ArmazemEdit'

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      initialRouteName="ArmazemHome"
      headerMode="none"
    >
      <Stack.Screen
        name="ArmazemHome"
        component={ArmazemHome}
      />
      <Stack.Screen
        name="ArmazemRegister"
        component={ArmazemRegister}
      />
      <Stack.Screen
        name="ArmazemList"
        component={ArmazemList}
      />
      <Stack.Screen
        name="ArmazemEdit"
        component={ArmazemEdit}
      />
    </Stack.Navigator>
  );
}