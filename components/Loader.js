// import React from 'react';
// import { useEffect } from 'react';
// import { ActivityIndicator, StyleSheet, Image, Dimensions, Text, View, Animated } from 'react-native';
// const { width, height } = Dimensions.get('window');

// const Splash = (props) => {
//   useEffect(() => {
//     setTimeout(() => {
//       props.navigation.navigate('RootNavigator');
//     }, 10000);
//   }, []);

//   const animatedStyle = {
//     transform: [{ translateY: 50 }],
//   };

//   return (
//     <View style={[styles.container, styles.horizontal]}>
//       {/* <ActivityIndicator size="large" color="#008ECC" /> */}
//       <Animated.View style={[styles.animatedBox, animatedStyle]}>
//         <Image
//           source={require('../images/logo.png')}
//           style={{
//             width: width,
//             height: 75,
//             alignSelf: 'center',
//           }}
//           resizeMode={'contain'}
//         />
//         {/* <Image
//           source={require('../tusharimg/trust.png')}
//           style={{
//             width: width,
//             height: 6,
//             marginTop: 10,
//             alignSelf: 'center',
//           }}
//           resizeMode={'contain'}
//         /> */}
//         {/* <LinearTextGradient
//                 style={{
//                   fontWeight: 'bold',
//                   fontSize: 20,
//                   alignSelf: 'center',
//                 }}
//                 locations={[0, 1]}
//                 // colors={['#ee3625', '#3eb1f0']}
//                 colors={['#FFF', '#3eb1f0']}
//                 start={{x: 0, y: 0}}
//                 end={{x: 1, y: 0}}>
//                 <Text>Valvoline</Text>
//               </LinearTextGradient> */}
//       </Animated.View>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   horizontal: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     padding: 10,
//   },
// });

// export default Splash;

import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Easing,
} from 'react-native';
import {getSyncData} from './AsyncDataStorage';
const {width, height} = Dimensions.get('window');

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      animationValue: new Animated.Value(0),
    };
  }
  startAnimation = () => {
    Animated.timing(this.state.animationValue, {
      toValue: 30,
      duration: 3000,
      easing: Easing.bounce,
      easing: Easing.back(10),
      easing: Easing.elastic(10),
      useNativeDriver: true,
    }).start();
  };

  checkLogin = async () => {
    const res = await getSyncData('user');
    if (res) {
      this.props.navigation.replace('RootNavigator');
    } else {
      this.props.navigation.replace('SF_Login');
    }
  };

  componentDidMount() {
    this.startAnimation();
    setTimeout(() => {
      this.checkLogin();
    }, 2000);
  }
  render() {
    const animatedStyle = {
      transform: [{translateY: this.state.animationValue}],
    };
    return (
      <View style={styles.MainContainer}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          <Animated.View style={[styles.animatedBox, animatedStyle]}>
            <Image
              source={require('../images/transparentlogo.png')}
              style={{
                width: width,
                height: 75,
                alignSelf: 'center',
              }}
              resizeMode={'contain'}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -60,
    backgroundColor: '#000',
  },
});
