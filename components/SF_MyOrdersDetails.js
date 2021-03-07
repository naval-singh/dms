import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Icon3 from 'react-native-vector-icons/EvilIcons';
const {width, height} = Dimensions.get('window');

function Item({item, props}) {
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
          Product Name : {item.productName}
        </Text>
        <Text style={{fontSize: 15, paddingTop: 4}}>
          Total Unit : {item.quantity}
        </Text>
        <Text style={{fontSize: 15, paddingTop: 4}}>
          Unit Price : &#8377;&nbsp;{item.unitPrice}
        </Text>
        <Text style={{fontSize: 15, paddingTop: 4}}>
          Total Amount : &#8377;&nbsp;{item.totalAmountincltax}
        </Text>
      </View>
    </View>
  );
}

export default function SF_MyOrdersDetails(props) {
  const [getList, setList] = useState([]);

  const handleChange = async (txt) => {};

  useEffect(() => {
    setList(props.route.params.product);
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
          Ordered Products
        </Text>
      </View>

      <FlatList
        data={getList}
        renderItem={({item}) => <Item item={item} props={props} />}
        keyExtractor={(item) => Math.random()}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
