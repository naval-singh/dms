/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {LogBox, View} from 'react-native';
import ProjectStack from './components/ProjectStack';
import {NavigationContainer} from '@react-navigation/native';
import RootReducer from './components/rootreducer/RootReducer';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import NoInternetConnectionUI from './components/NetworkCheck';
const store = createStore(RootReducer);
const App = () => {
  LogBox.ignoreAllLogs(true);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <ProjectStack />
        <NoInternetConnectionUI />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
