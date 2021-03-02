import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
} from 'react-native';
import FICON from 'react-native-vector-icons/Octicons';
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

export default function HomeScreen(props) {
  const [refresh, setRefresh] = useState(false);
  var cart = useSelector((state) => state.cart);
  var network = useSelector((state) => state.network);
  var length = Object.keys(cart).length;
  console.log({length});
  useFocusEffect(
    React.useCallback(() => {
      props.navigation.setParams({x: ''});
      setRefresh(!refresh);
    }, [length]),
  );

  return (
    <View>
      <Appbar.Header style={{backgroundColor: '#008ECC'}}>
        {/* <Appbar.BackAction onPress={_goBack} /> */}
        <Appbar.Action
          icon="menu"
          onPress={() => props.navigation.openDrawer()}
        />

        <Appbar.Content title={'Plus91labs'} subtitle={'Beta Version'} />

        <View
          style={{
            flexDirection: 'row',
            width: Dimensions.get('window').width * 0.15,
            justifyContent: 'space-between',
            right: 5,
            alignItems: 'center',
          }}>
          <>
            <MICON
              name="shopping-cart"
              size={30}
              color="#FFF"
              onPress={() => props.navigation.navigate('SF_ShowCart')}
            />
            <Badge style={{position: 'absolute', top: -5, left: -7}}>
              {length}
            </Badge>
          </>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <FICON
              name="primitive-dot"
              size={30}
              color={network ? 'green' : 'red'}
            />
            <Text style={{fontSize: 6, textAlign: 'center', color: '#fff'}}>
              {network ? 'Online' : 'Offline'}
            </Text>
          </View>
        </View>
      </Appbar.Header>
      <SF_ListProducts props={props} />
    </View>
  );
}
