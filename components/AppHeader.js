import * as React from 'react';
import {Appbar, Badge} from 'react-native-paper';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import MICON from 'react-native-vector-icons/MaterialIcons';
import FICON from 'react-native-vector-icons/Octicons';
import {useDispatch, useSelector} from 'react-redux';
export default function AppHeader(props) {
  var cart = useSelector((state) => state.cart);
  var network = useSelector((state) => state.network);
  var length = Object.keys(cart).length;
  const _goBack = () => {
    props.navigation.goBack();
  };

  return (
    <Appbar.Header style={{backgroundColor: '#008ECC'}}>
      <Appbar.BackAction onPress={_goBack} />
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
  );
}

/*
npm i --save react-native-vector-icons
react-native link react-native-vector-icons
*/
