import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import InputSpinner from 'react-native-input-spinner';
import {Divider} from 'react-native-paper';
import {getData, ServerURL} from './FetchNodeServices';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: '#FFF',
  },
  itemView: {
    flex: 1,
    flexDirection: 'row',
    width: width * 0.99,
    //height: height * 0.2,
  },
  imageSize: {
    width: width * 0.25,
    height: height * 0.15,
    resizeMode: 'contain',
  },
});

export default function ShowCart(props) {
  var cart = useSelector((state) => state.cart);
  var length = Object.keys(cart).length;
  var cartitems = Object.values(cart);

  const [getState, setState] = useState(false);
  var dispatch = useDispatch();
  var total = cartitems.reduce(calculate, 0);
  function calculate(a, b) {
    var price =
      b.offerprice == 0 ? b.price * b.qtydemand : b.offerprice * b.qtydemand;
    return a + price;
  }

  var totalsaving = cartitems.reduce(calculatesavings, 0);
  function calculatesavings(a, b) {
    var price = b.price - b.offerprice;
    price = price * b.qtydemand;
    return a + price;
  }
  const [getList, setList] = useState(cartitems);

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
    const handleQtyChange = (value) => {
      console.log(typeof value, value);
      if (value == 0) {
        item['qtydemand'] = value;

        dispatch({type: 'REMOVE_ITEM', payload: [item.productid, item]});

        setState(!getState);
        props.navigation.setParams({x: ''});
      } else {
        item['qtydemand'] = value;
        dispatch({type: 'ADD_CART', payload: [item.productid, item]});
        // setState(!state);
        props.navigation.setParams({x: ''});
      }
    };
    return (
      <View
        style={{
          width: width * 0.98,
          //height: height * 0.2,
          padding: 1,
          backgroundColor: '#FFF',
          borderWidth: 0.5,
          borderColor: '#ecf0f1',
          margin: 1,
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
            <Text numberOfLines={1} style={{fontWeight: 'bold', fontSize: 14}}>
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
            {item.stock == 0 ? (
              <Text style={{color: '#27ae60', fontSize: 20, padding: 5}}>
                Not Available
              </Text>
            ) : item.stock >= 1 && item.stock <= 3 ? (
              <Text style={{color: '#27ae60', fontSize: 20, padding: 5}}>
                Limited Stock {item.stock} items Available
              </Text>
            ) : (
              <Text style={{color: '#27ae60', fontSize: 20, padding: 5}}>
                In Stock
              </Text>
            )}

            <InputSpinner
              max={10}
              min={0}
              step={1}
              colorMax={'#008ECC'}
              colorMin={'#008ECC'}
              color={'#008ECC'}
              value={item.qtydemand}
              style={{alignSelf: 'center'}}
              onChange={(num) => handleQtyChange(num)}
            />
          </View>
        </View>
        <Divider />
      </View>
    );
  };

  useEffect(() => {}, []);
  return (
    <View style={styles.root}>
      <View
        style={{
          fontSize: 18,
          width: width * 0.98,
          padding: 5,
          flexDirection: 'row',
          marginTop: 10,
          marginBottom: 10,
        }}>
        <Text style={{fontSize: 18, textAlign: 'left'}}>
          Subtotal({length} items):
        </Text>
        <Text style={{color: '#c0392b', fontSize: 18, textAlign: 'left'}}>
          {' '}
          &#8377; {total}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          width: width * 0.95,
          borderWidth: 0.5,
          borderColor: '#000',
          borderRadius: 5,
          backgroundColor: '#fdcb6e',
          marginBottom: 10,
        }}
        onPress={() => handleAddToCart()}>
        <Text
          style={{
            textAlign: 'center',
            color: '#000',
            fontSize: 20,
            fontWeight: 'bold',
            padding: 15,
          }}>
          Proceed to Buy
        </Text>
      </TouchableOpacity>

      <FlatList
        data={cartitems}
        renderItem={renderItem}
        keyExtractor={(item) => item.productid.toString()}
      />
    </View>
  );
}
