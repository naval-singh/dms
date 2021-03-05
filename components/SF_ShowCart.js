import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getSyncData, storeDatasync, removeDatasync} from './AsyncDataStorage';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import InputSpinner from 'react-native-input-spinner';
import {Divider} from 'react-native-paper';
import {postDataForSF} from './FetchNodeServices';
import SegmentedControlTab from 'react-native-segmented-control-tab';

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: '#FFF',
  },
  tabView: {
    width: width * 0.95,
    marginVertical: 10,
    paddingBottom: 15,
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

export default function SF_ShowCart(props) {
  var cart = useSelector((state) => state.cart);
  var network = useSelector((state) => state.network);
  var length = Object.keys(cart).length;
  var cartitems = Object.values(cart);

  const distributorCartItems = cartitems.filter(
    (item) => item.flag === 'distributor',
  );
  const retailerCartItems = cartitems.filter(
    (item) => item.flag === 'retailer',
  );

  const [loading, setLoading] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [getState, setState] = useState(false);
  var dispatch = useDispatch();
  var total = cartitems.reduce(calculate, 0);
  const [getList, setList] = useState(cartitems);
  const [getDWH, setDWH] = useState([]);
  const [getDWHId, setDWHId] = useState('');
  function calculate(a, b) {
    var GST = (b.unitPrice * b.GST) / 100;

    var price = (b.unitPrice + GST) * b.qtydemand;

    return a + price;
  }

  const fetchData = async () => {
    const data_dhouse = await getSyncData('data_distributorWarehouse');
    setDWH(data_dhouse);

    // const user = await getSyncData('user');
    // if (network) {
    // var body = {
    //   username: user.username,
    //   password: user.password,
    // };
    // var list = await postDataForSF(
    //   'https://p91field-dev-ed.my.salesforce.com/services/apexrest/GetInitData',
    //   body,
    // );
    //console.log(list.data.distributorWareHouse);
    // setDWH(list.data.distributorWareHouse);
    // await storeDatasync(
    //   'data_distributorWarehouse',
    //   list.data.distributorWareHouse,
    // );
    // } else {
    // }
  };

  const renderItem = ({item}) => {
    let base64Image = item.image;

    const handleQtyChange = (value) => {
      console.log(typeof value, value);
      if (value == 0) {
        item['qtydemand'] = value;

        dispatch({type: 'REMOVE_ITEM', payload: [item.productId, item]});

        setState(!getState);
        props.navigation.setParams({x: ''});
      } else {
        item['qtydemand'] = value;
        dispatch({type: 'ADD_CART', payload: [item.productId, item]});
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
            <Image style={styles.imageSize} source={{uri: `${base64Image}`}} />
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
              {item.name}
            </Text>

            <Text
              style={{
                textDecorationStyle: 'solid',
              }}>
              Unit Price:{item.unitPrice} &#8377; + {item.GST}% GST
            </Text>
            <Text
              style={{
                textDecorationStyle: 'solid',
              }}>
              Amount:
              {(item.unitPrice * item.GST) / 100 + item.unitPrice} &#8377;/Unit
              x {item.qtydemand}
            </Text>

            <Text>
              Total Amount:
              {((item.unitPrice * item.GST) / 100 + item.unitPrice) *
                item.qtydemand}{' '}
              &#8377;
            </Text>

            <Text style={{color: '#27ae60'}}>Stock: {item.stock}</Text>

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

  useEffect(() => {
    fetchData();
  }, []);

  const fillDWH = () => {
    return getDWH.map((item, key) => {
      return (
        <Picker.Item
          key={item.warehouseId}
          label={item.warehouseName}
          value={item.warehouseId}
        />
      );
    });
  };
  const handleAddToCart = async () => {
    setLoading(true);
    const user = await getSyncData('user');
    var productList = [];
    getList.map(function (item) {
      productList.push({
        whpId: item.whpId,
        unitPrice: item.unitPrice,
        skuCode: item.skuCode,

        productId: item.productId,

        name: item.name,

        GST: item.GST,

        quantity: item.qtydemand,

        total:
          ((item.unitPrice * item.GST) / 100 + item.unitPrice) * item.qtydemand,
      });
    });
    if (getDWHId != '') {
      var body = {
        productList: productList,

        fromWareHouse: 'a0M2w000001GzVsEAK', // Company ware house Id

        toWareHouse: getDWHId, // Distributor ware house Id which he will select by dropdown on cart

        EMPID: user.userId, // User Id which we pass to get the data
      };

      if (!network) {
        setLoading(false);
        await storeDatasync(`${user.userId}`, body);
        await storeDatasync('total', total);

        dispatch({type: 'REMOVE_ALL_ITEM'});
        Alert.alert('Order Placed');
        props.navigation.navigate('RootNavigator');
      } else if (network) {
        // console.log('2222', body);
        var result = await postDataForSF(
          'https://p91field-dev-ed.my.salesforce.com/services/apexrest/CreateSalesOrder',
          body,
        );
        setLoading(false);
        console.warn(result);
        if (result.status) {
          dispatch({type: 'REMOVE_ALL_ITEM'});
          Alert.alert('Order Placed');
          props.navigation.navigate('RootNavigator');
        }
      }
    } else {
      setLoading(false);
      Alert.alert('Please select your warehouse!');
    }
  };

  const renderCartThings = (traversingItems) => {
    return (
      <>
        <View style={{borderWidth: 0.3, borderRadius: 5, margin: 5}}>
          <Picker
            selectedValue={getDWHId}
            style={{height: 50, width: width * 0.7}}
            onValueChange={(itemValue, itemIndex) => setDWHId(itemValue)}>
            <Picker.Item label="~Distributor Warehose~" value="" />
            {fillDWH()}
          </Picker>
        </View>
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
            Place Order
          </Text>
        </TouchableOpacity>

        <FlatList
          data={traversingItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.productId.toString()}
        />
      </>
    );
  };

  return (
    <>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', marginTop: -100}}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <View style={styles.root}>
          <View style={styles.tabView}>
            <SegmentedControlTab
              values={['Primary Sales', 'Secondary Sales']}
              selectedIndex={selectedIndex}
              borderRadius={10}
              tabTextStyle={{fontSize: 18, color: '#008ECC'}}
              tabStyle={{borderColor: '#008ECC'}}
              activeTabStyle={{backgroundColor: '#008ECC'}}
              onTabPress={(index) => {
                setSelectedIndex(index);
                console.log('all Items.............', cartitems);
                console.log('distri............', distributorCartItems);
                console.log('retail............', retailerCartItems);
              }}
            />
          </View>
          {selectedIndex == 0
            ? renderCartThings(distributorCartItems)
            : renderCartThings(retailerCartItems)}
        </View>
      )}
    </>
  );
}
