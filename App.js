import React, { Component } from 'react'

import { Provider as ReduxProvider } from 'react-redux'

import { SafeAreaView } from 'react-native'

import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import { Ionicons } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-native-paper'

import BottomTabNavigator from './src/navigation/BottomTabNavigator'
import { Colors } from './src/styles'

import store from './src/store'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: true };
  }


  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font
    })
    this.setState({ loading: false })
  }

  render() {
    if (this.state.loading) {
      return <AppLoading />
    }
    return (
      <>
        <SafeAreaView style={{ flex: 0, ...Colors.headerBackgroundColor }} />
        <SafeAreaView style={{ flex: 1, ...Colors.headerBackgroundColor }} >
          <Provider>
            <ReduxProvider store={store}>
              <NavigationContainer>
                <BottomTabNavigator />
              </NavigationContainer >
            </ReduxProvider>
          </Provider>
        </SafeAreaView>
      </>
    );
  }
}