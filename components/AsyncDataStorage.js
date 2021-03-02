import AsyncStorage from '@react-native-community/async-storage';

export async function getSyncData(key) {
  try {
    const value = await AsyncStorage.getItem(`@${key}`);
    console.log('Async Data CHAT out:', value);
    if (value !== null) {
      // value previously stored

      var orderData = JSON.parse(value);
      console.log('Async Data :', value);
      return orderData;
    } else {
      console.log('No Data Found..');
      return null;
    }
  } catch (e) {
    console.log('Async Data Error', e);
    return null;
  }
}

export async function storeDatasync(key, body) {
  try {
    await AsyncStorage.setItem(`@${key}`, JSON.stringify(body));
  } catch (e) {
    console.log('Error in saving data');
  }
}

export async function removeDatasync(key) {
  try {
    const data = await AsyncStorage.removeItem(`@${key}`);
    console.log({data});
  } catch (e) {
    console.log('Error in saving data');
  }
}
