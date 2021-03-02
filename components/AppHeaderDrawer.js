import * as React from 'react';
import {Appbar, Badge} from 'react-native-paper';
import {StyleSheet, Text, View} from 'react-native';
import MICON from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {useState} from 'react';
export default function AppHeader(props) {
  const [refresh, setRefresh] = useState(false);
  var cart = useSelector((state) => state.cart);
  var length = Object.keys(cart).length;

  useEffect(() => {
    console.warn('print');
    setRefresh(!refresh);
  }, [length]);

  return (
    <Appbar.Header style={{backgroundColor: '#008ECC'}}>
      {/* <Appbar.BackAction onPress={_goBack} /> */}
      <Appbar.Action
        icon="menu"
        onPress={() => props.navigation.openDrawer()}
      />

      <Appbar.Content title={'Plus91labs'} subtitle={'Beta Version'} />

      <View>
        <MICON
          name="shopping-cart"
          size={30}
          color="#FFF"
          onPress={() => props.navigation.navigate('SF_ShowCart')}
        />

        <Badge style={{position: 'absolute', top: -5, left: -7}}>
          {length}
        </Badge>
      </View>
    </Appbar.Header>
  );
}

/*
npm i --save react-native-vector-icons
react-native link react-native-vector-icons
*/
