import React, {useState, useEffect, useReducer} from 'react';
import {
  TextInput,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import NumericInput from 'react-native-numeric-input';
import Icon3 from 'react-native-vector-icons/EvilIcons';
import {useDispatch, useSelector} from 'react-redux';
import {getSyncData, storeDatasync} from './AsyncDataStorage';
import {getDataForSF, postDataForSF} from './FetchNodeServices';
const {width, height} = Dimensions.get('window');

//
const discardedArray = [];

function Item({item, props}) {
  const dispatch = useDispatch();
  const [qty, setQty] = useState('');
  const [discardedUnit, setDiscardedUnit] = useState(item.DiscardedUnit);
  const [discardedReason, setDiscardedReason] = useState(item.DiscardedReason);
  const [acceptedUnit, setAcceptedUnit] = useState(
    parseInt(item.AcceptedUnit) - parseInt(item.DiscardedUnit),
  );

  const dispatchDiscardedUnit = (value) => {
    const body = {
      name: item.name,
      DiscardedUnit: value,
      AcceptedUnit: item.AcceptedUnit - value,
      DiscardedReason: discardedReason,
    };
    dispatch({type: 'ADD_PRODUCT', payload: [body.name, body]});
  };

  const dispatchDiscardedReason = (value) => {
    const body = {
      name: item.name,
      AcceptedUnit: acceptedUnit,
      DiscardedUnit: discardedUnit,
      DiscardedReason: value,
    };
    dispatch({type: 'ADD_PRODUCT', payload: [body.name, body]});
  };

  const handleDiscardReason = (discardReason) => {
    setDiscardedReason(discardReason);
    dispatchDiscardedReason(discardReason);
  };

  return (
    <View
      style={{
        width: width * 0.9,
        marginBottom: 15,
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: '#fff',
          borderRadius: 15,
          padding: 20,
        }}>
        <Text numberOfLines={1} style={{fontWeight: 'bold', fontSize: 16}}>
          Product Name : {item.ProductName}
        </Text>
        <Text style={{fontSize: 15, paddingTop: 4}}>
          Total Unit : {item.Quantity}
        </Text>
        <Text style={{fontSize: 15, paddingTop: 4}}>
          Billed Unit : {item.BilledUnit}
        </Text>
        <Text style={{fontSize: 15, paddingTop: 4}}>
          Accepted Unit : {acceptedUnit}
        </Text>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text style={{fontSize: 15, marginRight: 20, paddingTop: 4}}>
            Discarded Unit :
          </Text>
          <NumericInput
            value={discardedUnit}
            onChange={(value) => {
              console.log({value});
              setDiscardedUnit(value);
              dispatchDiscardedUnit(value);
              setAcceptedUnit(parseInt(item.Quantity) - value);
            }}
            totalWidth={100}
            totalHeight={25}
            minValue={0}
            maxValue={item.BilledUnit}
            step={1}
            editable={false}
            valueType="real"
            rounded
            textColor="#B0228C"
            iconStyle={{color: '#fff'}}
            rightButtonBackgroundColor="#008ECC"
            leftButtonBackgroundColor="#008ECC"
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingTop: 4,
          }}>
          <Text>Discarded Reason : </Text>
          <View>
            <Picker
              selectedValue={discardedReason}
              onValueChange={handleDiscardReason}
              style={{height: 20, width: 150}}
              mode="dropdown">
              <Picker.Item label="--Select--" value="--Select--" />
              <Picker.Item label="Material Damaged" value="Material Damaged" />
              <Picker.Item
                label="Good Supplied without order"
                value="Good Supplied without order"
              />
              <Picker.Item
                label="Incorrectness in billing"
                value="Incorrectness in billing"
              />
              <Picker.Item label="Legal Case" value="Legal Case" />
            </Picker>
          </View>
        </View>
      </View>
    </View>
  );
}

export default function SF_InvoiceDetails(props) {
  const [getList, setList] = useState([]);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  const handleChange = async (txt) => {};

  useEffect(() => {
    setList(props.route.params.products.invLineItem);
  }, []);

  const handleSubmit = async () => {
    const sendItems = [];
    const stateValue = Object.values(product);
    getList.map((item) => {
      // let tempItem = {...item};
      let tempItem = {
        recordId: item.recordId,
        quantity: item.Quantity,
        productSKU: item.ProductSKU,
        productName: item.ProductName,
        name: item.name,
        mrp: item.MRP,
        discardedUnit: item.DiscardedUnit,
        discardedReason: item.DiscardedReason,
        billedUnit: item.BilledUnit,
        acceptedUnit: item.AcceptedUnit,
      };
      stateValue.map((stateItem) => {
        if (tempItem.name == stateItem.name) {
          tempItem.acceptedUnit = stateItem.AcceptedUnit;
          tempItem.discardedUnit = stateItem.DiscardedUnit;
          tempItem.discardedReason = stateItem.DiscardedReason;
        }
      });
      sendItems.push(tempItem);
    });

    const body = {
      invoiceId: props.route.params.products.recordId,
      invLineItem: sendItems,
    };

    dispatch({type: 'ADD_INVOICE', payload: [body.invoiceId, body]});
    // console.log('body.................', JSON.stringify(body));

    // console.log('RESULT.......', result);
    // result.status && props.navigation.navigate('SF_Invoice');
    // setTimeout(() => {
    props.navigation.navigate('SF_Invoice');
    dispatch({type: 'REMOVE_ALL_PRODUCT'});
    // }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: '#CAD3C8',
          padding: 8,
          width: width,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.SectionStyle}>
          <Icon3 name="search" size={25} />

          <TextInput
            style={{flex: 1}}
            underlineColorAndroid="transparent"
            placeholder="Search Mobiles.."
            onChangeText={(txt) => handleChange(txt)}
          />
        </View>
      </View>

      <View style={styles.mainHeadStyle}>
        <Text style={{fontSize: 14, marginTop: 10, marginBottom: 5}}>
          All Products
        </Text>
      </View>

      <FlatList
        data={getList}
        renderItem={({item}) => <Item item={item} props={props} />}
        keyExtractor={(item) => Math.random()}
        showsVerticalScrollIndicator={false}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          justifyContent: 'flex-end',
          width,
        }}>
        <TouchableOpacity
          style={{width: width, backgroundColor: '#008ECC'}}
          onPress={handleSubmit}>
          <Text
            style={{
              textAlign: 'center',
              color: '#FFF',
              fontSize: 20,
              fontWeight: 'bold',
              padding: 15,
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    // justifyContent:'center'
  },
  itemView: {
    flex: 1,
    flexDirection: 'row',
    width: width * 0.88,
    height: height * 0.2,
  },
  item: {
    flexDirection: 'row',
    borderColor: '#ECF0F1',
    width: width * 0.9,
    borderWidth: 0.5,
    borderRadius: 15,
    backgroundColor: '#FFF',
    padding: 20,
    marginBottom: 10,
  },
  imageStyle: {
    resizeMode: 'contain',
    width: 90,
    height: 90,
    marginBottom: 20,
    padding: 5,
    marginLeft: 15,
  },
  loginContainer: {
    flexDirection: 'row',
    backgroundColor: '#eb3b5a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 0.5,
    borderColor: '#ecf0f1',

    borderRadius: 15,
  },
  priceStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  priceStyleOffer: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'double',
  },
  priceStyleSave: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'red',
  },
  title: {
    fontSize: 16,

    width: width * 0.6,
  },

  descStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    width: width * 0.5,
    padding: 5,
    color: '#636e72',
  },

  buttonStyle: {
    marginTop: 40,
    fontWeight: 'bold',
    marginRight: 100,
    borderRadius: 15,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ecf0f1',
  },

  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    height: height * 0.05,
    borderRadius: 5,
    width: width * 0.94,
  },
  mainHeadStyle: {
    marginTop: 1,
    width: width,
    marginBottom: 1,
    marginLeft: 45,
    padding: 2,
  },
  emailIcon: {
    color: '#636e72',
  },
  textStyleText: {
    fontSize: 20,
    fontWeight: 'normal',
    width: width * 0.9,

    marginLeft: 5,
  },
});
