// import { StatusBar } from "expo-status-bar";
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {storeDatasync} from './AsyncDataStorage';
import {postDataForSF} from './FetchNodeServices';
const {width, height} = Dimensions.get('window');

export default function SF_Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState();

  const handleLogin = async () => {
    setLoading(true);
    const body = {
      username: email,
      password,
    };
    const list = await postDataForSF(
      'https://p91field-dev-ed.my.salesforce.com/services/apexrest/GetInitData',
      body,
    );
    if (list.message === 'Success') {
      const user = {
        image: list.data.userImage,
        userId: list.data.userId,
        phone: list.data.phone,
        name: list.data.name,
        username: email,
        password,
      };
      await storeDatasync('user', user);
      setLoading(false);
      props.navigation.replace('RootNavigator');
    } else {
      setLoading(false);
      alert('username/password is invalid');
    }
  };

  return (
    <>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.image}
              source={require('../images/logo.png')}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Email"
              placeholderTextColor="#003f5c"
              onChangeText={(email) => setEmail(email)}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>

          <TouchableOpacity>
            <Text style={styles.forgot_button}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={{color: '#fff'}}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // height: height * 1.1,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imgContainer: {
    width: width * 0.5,
    height: width * 0.1,
    marginBottom: 100,
  },

  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },

  inputView: {
    // backgroundColor: '#f7f7f7',
    borderRadius: 30,
    borderWidth: 1,
    width: width * 0.7,
    height: 45,
    marginBottom: 20,

    alignItems: 'center',
  },

  TextInput: {
    height: 50,
    width: '100%',
    flex: 1,
    padding: 10,
    textAlign: 'center',
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: width * 0.8,
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#008ECC',
  },
});
