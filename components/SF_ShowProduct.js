import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  Dimensions,
  Touchable,
  Alert,
} from 'react-native';
import {getData, postData, ServerURL} from './FetchNodeServices';
const {width, height} = Dimensions.get('window');
import InputSpinner from 'react-native-input-spinner';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  itemView: {
    flexDirection: 'column',
    width: width * 0.88,
    //  height: height * 0.2,
  },
  imageSize: {
    width: width * 0.4,
    height: height * 0.24,
    resizeMode: 'contain',
  },
});

export default function SF_ShowProduct(props) {
  //console.log(props)

  //'data:image/jpeg;base64,00D2w000007OFtO!AQEAQCq54.setmhxV6cIvn08PASYzJ5.ie8USh7bK17oX9AgAZ6MCORsFMa_fPzqBiCb6qw5yCZQSQXlqvTGcSfROPzDNWPK';
  var dispatch = useDispatch();
  var cartitems = useSelector((state) => state.cart);
  var item = props.route.params.item;
  let base64Image = item.image;
  const [qty, setQty] = useState(1);
  const [getProductPictureList, setProductPictureList] = useState([]);
  const [activeslide, setslide] = useState(0);
  var network = useSelector((state) => state.network);
  useEffect(function () {
    //fetchProductPictures();
  }, []);

  const fetchProductPictures = async () => {
    let body = {productid: item.productid};
    var list = await postData('productpicture/displaybyproductid', body);
    // console.log("images-",images)
    setProductPictureList(list);
  };
  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={{uri: `${ServerURL}/images/${item.productpicture}`}}
          style={{
            width: width * 0.6,
            height: height * 0.28,
            resizeMode: 'contain',
          }}
        />
      </View>
    );
  };
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

  const handleAddToCart = () => {
    item['qtydemand'] = qty;
    item.flag = props.route.params.flag;
    console.warn({item});
    dispatch({type: 'ADD_CART', payload: [item.productId, item]});
    props.navigation.setParams({x: ''});
    Alert.alert('Product Added Successfully!');
  };

  //console.log(item)
  return (
    <View style={styles.root}>
      <View
        style={{
          width: width,

          backgroundColor: '#FFF',
          borderWidth: 0.5,
          borderColor: '#ecf0f1',
        }}>
        <View
          style={{
            padding: 5,
            display: 'flex',
            width: width,

            alignItems: 'center',
            marginBottom: 5,
            alignSelf: 'center',
            borderWidth: 0.5,
            borderColor: 'grey',
          }}>
          <Image style={styles.imageSize} source={{uri: `${base64Image}`}} />

          {/* <Carousel
            layout={'default'}
            //ref={ref => this.carousel = ref}
            data={getProductPictureList}
            sliderWidth={width * 1}
            itemWidth={width * 0.9}
            renderItem={renderItem}
            onSnapToItem={(index) => setslide(index)}
            autoplay={true}
            loop={true}
          />
          <Pagination
            dotsLength={getProductPictureList.length}
            activeDotIndex={activeslide}
            dotStyle={{
              width: 15,
              height: 15,
              borderRadius: 7.5,
            }}
            inactiveDotStyle={
              {
                // Define styles for inactive dots here
              }
            }
            inactiveDotOpacity={0.2}
            inactiveDotScale={0.5}
          />
        */}
        </View>
        <View
          style={{
            flexDirection: 'column',
            paddingLeft: 15,
            paddingRight: 5,
            paddingTop: 15,
          }}>
          <Text
            numberOfLines={1}
            style={{fontWeight: 'bold', fontSize: 24, padding: 5}}>
            {item.name}
          </Text>

          <Text
            style={{
              padding: 5,
              // textDecorationLine: 'line-through',
              textDecorationStyle: 'solid',
              fontSize: 20,
            }}>
            M.R.P. &#8377; {item.unitPrice}
          </Text>
          <Text style={{fontSize: 20, padding: 5}}>
            GST: &#8377; {item.GST}% Extra
          </Text>
          <Text style={{fontSize: 20, padding: 5}}>
            Stock: &#8377; {item.stock}
          </Text>
          <InputSpinner
            max={10}
            min={1}
            step={1}
            colorMax={'#008ECC'}
            colorMin={'#008ECC'}
            color={'#008ECC'}
            value={qty}
            style={{alignSelf: 'center', marginVertical: 50, padding: 10}}
            onChange={(num) => setQty(num)}
          />
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          justifyContent: 'flex-end',
          width,
        }}>
        <TouchableOpacity
          style={{width: width, backgroundColor: '#008ECC'}}
          onPress={() => handleAddToCart()}>
          <Text
            style={{
              textAlign: 'center',
              color: '#FFF',
              fontSize: 20,
              fontWeight: 'bold',
              padding: 15,
            }}>
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
