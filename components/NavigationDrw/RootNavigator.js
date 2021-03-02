import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import {Appbar, Badge} from 'react-native-paper';
import MICON from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from './DrawerContent';
//import { FontFamily } from '../config/FontFamily';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import AppHeader from '../AppHeaderDrawer';
import {createStackNavigator} from '@react-navigation/stack';
import SF_ListProducts from '../SF_ListProducts';
import {useFocusEffect} from '@react-navigation/native';
import {useState} from 'react';
import HomeScreen from './HomeScreen';
const Drawer = createDrawerNavigator();
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  HBoxes: {
    backgroundColor: '#FFF',
    shadowColor: '#000',
    elevation: 8,
    padding: 10,
  },
});
/*
function DrawerContent() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Drawer content</Text>
    </View>
  );
}
*/

const StackNav = createStackNavigator();

function Component() {
  return (
    <StackNav.Navigator>
      <StackNav.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </StackNav.Navigator>
  );
}

export const RootNavigator = (props) => {
  return (
    <Drawer.Navigator drawerContent={() => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={Component}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};
