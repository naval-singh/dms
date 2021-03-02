import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {getData, ServerURL} from './FetchNodeServices';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemView: {
    flex: 1,
    flexDirection: 'row',
    width: width * 0.88,
    height: height * 0.2,
  },
  imageSize: {
    width: width * 0.25,
    height: height * 0.15,
    resizeMode: 'contain',
  },
});

export default function Listproducts(props) {
  const [getList, setList] = useState([]);

  const renderItem = ({item}) => {
    var actualprice = '';
    var save = '';
    var price = '';
    if (item.offerprice == 0) {
      actualprice = item.price;
      save = 0;
    } else {
      price = item.price;
      actualprice = item.offerprice;
      save = item.price - item.offerprice;
    }

    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate('ShowProduct', {item: item})}>
        <View
          style={{
            width: width * 0.9,
            height: height * 0.2,
            padding: 10,
            backgroundColor: '#FFF',
            borderWidth: 0.5,
            borderColor: '#ecf0f1',
            margin: 5,
          }}>
          <View style={styles.itemView}>
            <View style={{padding: 5}}>
              <Image
                style={styles.imageSize}
                source={{
                  uri: ServerURL + '/images/' + item.picture,
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                paddingLeft: 15,
                paddingRight: 5,
                paddingTop: 5,
              }}>
              <Text
                numberOfLines={1}
                style={{fontWeight: 'bold', fontSize: 14}}>
                {item.productname}
              </Text>
              <Text
                style={{
                  textDecorationLine: 'line-through',
                  textDecorationStyle: 'solid',
                }}>
                &#8377; {price}
              </Text>
              <Text>&#8377; {actualprice}</Text>
              <Text style={{color: '#27ae60'}}>You Save &#8377; {save}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const fetchData = async () => {
    var list = await getData('product/displayall');
    setList(list);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View style={styles.root}>
      <FlatList
        data={getList}
        renderItem={renderItem}
        keyExtractor={(item) => item.productid.toString()}
      />
    </View>
  );
}
