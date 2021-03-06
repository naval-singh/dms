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
  ActivityIndicator,
} from 'react-native';
import Icon3 from 'react-native-vector-icons/EvilIcons';
import {useSelector} from 'react-redux';
import {getSyncData, storeDatasync} from './AsyncDataStorage';
import {getDataForSF} from './FetchNodeServices';
const {width, height} = Dimensions.get('window');

function Item({item, props}) {
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('SF_GrnHistoryDetails', {
          products: item,
        })
      }>
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              numberOfLines={1}
              style={{fontWeight: 'bold', fontSize: 13, color: '#666'}}>
              Order Name : {item.OrderName}
            </Text>
            <Text
              numberOfLines={1}
              style={{fontWeight: 'bold', fontSize: 13, color: '#666'}}>
              Invoice no : {item.InvoiceNumber}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              numberOfLines={1}
              style={{fontWeight: 'bold', fontSize: 13, color: '#666'}}>
              Invoice Date : {item.InvoiceDate}
            </Text>
            <Text
              numberOfLines={1}
              style={{fontWeight: 'bold', fontSize: 13, color: '#666'}}>
              Total Amount : &#8377;{item.TotalAmount}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function SF_GrnHistory(props) {
  const [getList, setList] = useState([]);
  const [getList2, setList2] = useState([]);
  const [loading, setLoading] = useState(true);

  var network = useSelector((state) => state.network);

  useEffect(() => {
    fetchData();
  }, [network]);

  const fetchData = async () => {
    const user = await getSyncData('user');
    var data = await getSyncData(user.userId);
    var total = await getSyncData('total');

    if (data != null) {
      var body = {
        totalAmount: total,
        name: '',
        orderDate: new Date(),
        orderStatus: 'Not Sync',
      };
      setList2([body]);
    }

    if (network) {
      var list = await getDataForSF(
        `https://p91field-dev-ed.my.salesforce.com/services/apexrest/GetInvoiceData?EMPID=${user.userId}`,
      );
      // console.log('complete data......', list.invoice);
      await storeDatasync('grnHistory', list.history);
      setList(list.history);
      setLoading(false);
    } else {
      var data_category = await getSyncData('grnHistory');
      setLoading(false)
      setList(data_category);
    }
  };

  const handleChange = async (txt) => {};

  useEffect(function () {
    fetchData();
  }, []);

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
          My GRN History
        </Text>
      </View>
      {!network && (
        <>
          <FlatList
            data={getList2}
            renderItem={({item}) => <Item item={item} props={props} />}
            keyExtractor={(item) => Math.random()}
            showsVerticalScrollIndicator={false}
          />
          <View style={{marginVertical: 5}} />
        </>
      )}
      {loading ? (
        <View>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <FlatList
          data={getList}
          renderItem={({item}) => <Item item={item} props={props} />}
          keyExtractor={(item) => Math.random()}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,

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
