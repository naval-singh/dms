import NetInfo from '@react-native-community/netinfo';
import React, {useEffect, useState} from 'react';
import {Animated, StyleSheet, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {getSyncData, storeDatasync, removeDatasync} from './AsyncDataStorage';
import Snackbar from 'react-native-snackbar';
import {postDataForSF} from './FetchNodeServices';

let unsubscribe = '';

export default function NoInternetConnectionUI() {
  let [isConnected, closeModal] = useState(false);
  let [animation] = useState(new Animated.Value(0));

  const dispatch = useDispatch();
  useEffect(() => {
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isConnected ? 1 : 0,
      duration: 2000,
    }).start();
  }, [isConnected]);

  React.useMemo(async () => {
    console.error('memo');
    if (!isConnected) {
      const user = await getSyncData('user');
      var data = await getSyncData(user.userId);
      console.log({data});

      if (data != null) {
        var result = await postDataForSF(
          'https://p91field-dev-ed.my.salesforce.com/services/apexrest/CreateSalesOrder',
          data,
        );
        await removeDatasync(user.userId);
        await removeDatasync('total');

        console.warn(result);
        if (result) {
          Snackbar.show({
            text: 'Order Sync Successfully!',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: 'red',
          });
        }
      }
    }
  }, [isConnected]);

  const slideUp = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [1 * 500, -1 * 0],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  useEffect(() => {
    unsubscribe = NetInfo.addEventListener(async (state) => {
      if (state.isConnected) {
        // Constants.NETWORK_CHECK = true;
        dispatch({type: 'SET_STATE', payload: true});

        closeModal(false);
      } else {
        // Constants.NETWORK_CHECK = false;
        dispatch({type: 'SET_STATE', payload: false});
        closeModal(true);
      }
    });
  }, []);

  const showPopup = () => {
    if (success) {
      return (
        <Animated.View style={[styles.mainContainer, slideUp]}>
          <Text allowFontScaling={false} style={styles.offlineTextStyle}>
            {'Order Sync Successfully'}
          </Text>
        </Animated.View>
      );
    }
  };

  // return (
  //   <Animated.View style={[styles.mainContainer, slideUp]}>
  //     <Text allowFontScaling={false} style={styles.offlineTextStyle}>
  //       {'You are not connected to internet'}
  //     </Text>
  //   </Animated.View>
  // );

  return null;
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'red',
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
  },
  offlineTextStyle: {
    color: '#fff',
    fontSize: 15,
    justifyContent: 'center',
  },
});
