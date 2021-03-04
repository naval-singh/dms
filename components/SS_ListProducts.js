import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AICON from 'react-native-vector-icons/AntDesign';
import {
  getData,
  ServerURL,
  postData,
  postDataForSF,
  getDataForSF,
} from './FetchNodeServices';
const {width, height} = Dimensions.get('window');
import {getSyncData, storeDatasync, removeDatasync} from './AsyncDataStorage';
import {useDispatch, useSelector} from 'react-redux';
import {
  Dialog,
  Portal,
  Provider,
  Button,
  Menu,
  Divider,
  Searchbar,
} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
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
  root: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 1,
  },
  itemsView: {
    display: 'flex',
    flexDirection: 'row',
  },
  textStyle: {
    flex: 1,
    flexDirection: 'column',
    padding: 3,
    justifyContent: 'center',
  },
  search: {
    fontSize: 20,
    width: width * 0.95,
    borderWidth: 0.3,
    marginLeft: 25,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingLeft: 10,
    borderColor: '#dcdde1',
    paddingRight: 30,
  },
  searchView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
    padding: 5,
    alignContent: 'center',
  },
});

export default function SF_ListProducts(props) {
  const [getList, setList] = useState([]);
  const [getFilterList, setFilterList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState('');
  const [SubCategory, setSubCategory] = useState('');
  const [SubcategoryList, setSubcategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [retailerDetail, setRetailerDetail] = useState(
    props.route.params.retailer,
  );

  const [companyWarehouse, setCompanyWarehouse] = useState({wid: '', wn: ''});
  var network = useSelector((state) => state.network);
  const renderItem = ({item}) => {
    let base64Image = item.image;
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('SF_ShowProduct', {item: item})
        }>
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
            {
              <View style={{padding: 5}}>
                <Image
                  style={styles.imageSize}
                  source={{uri: `${base64Image}`}}
                />
              </View>
            }
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
                {item.name}
              </Text>
              <Text>&#8377; {item.unitPrice}</Text>
              <Text style={{color: '#27ae60'}}>GST:{item.GST}%</Text>
              <Text style={{color: '#27ae60'}}>Stock:{item.stock}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const fillCategories = () => {
    return categoryList.map((item, key) => {
      return <Picker.Item key={item} label={item} value={item} />;
    });
  };

  const fillSubCategories = () => {
    return SubcategoryList.map((item, key) => {
      return <Picker.Item key={item} label={item} value={item} />;
    });
  };

  const fetchData = async () => {
    if (network) {
      let user = await getSyncData('user');

      var list = await getDataForSF(
        `https://p91field-dev-ed.my.salesforce.com/services/apexrest/GetSecondaryData?EMPID=${user.userId}`,
      );

      await storeDatasync('SS_Products', list.data.productList);
      if (retailerDetail.taggedWarehouse.warehouseId != null) {
        const wareHouseWiseProducts = list.data.productList.filter(
          (item) =>
            item.warehouseId == retailerDetail.taggedWarehouse.warehouseId,
        );
        console.warn(retailerDetail.taggedWarehouse);
        setList(wareHouseWiseProducts);
        setFilterList(wareHouseWiseProducts);
        setCompanyWarehouse({
          wid: retailerDetail.taggedWarehouse.warehouseId,
          wn: retailerDetail.taggedWarehouse.warehouseName,
        });
      } else {
        setList(list.data.productList);
        setFilterList(list.data.productList);
        setCompanyWarehouse({
          wid: null,
          wn: 'All Warehouse',
        });
      }
      setLoading(false);

      //   console.log('COMPANY', list.data.productCategory);
      // await storeDatasync('companywarehouse', list.data.companyWareHouse);

      //   setCompanyWarehouse({
      //     wid: list.data.companyWareHouse.warehouseId,
      //     wn: list.data.companyWareHouse.warehouseName,
      //   });
      //   await storeDatasync('subcategory', list.data.productSubCategory);
      //   setSubcategoryList(list.data.productSubCategory);
      //   await storeDatasync('category', list.data.productCategory);
      //   setCategoryList(list.data.productCategory);
    } else {
      const product_data = await getSyncData('SS_Products');
      //   console.warn(product_data);
      if (retailerDetail.taggedWarehouse.warehouseId != null) {
        const wareHouseWiseProducts = product_data.filter(
          (item) =>
            item.warehouseId == retailerDetail.taggedWarehouse.warehouseId,
        );
        console.warn(retailerDetail.taggedWarehouse);
        setList(wareHouseWiseProducts);
        setFilterList(wareHouseWiseProducts);
        setCompanyWarehouse({
          wid: retailerDetail.taggedWarehouse.warehouseId,
          wn: retailerDetail.taggedWarehouse.warehouseName,
        });
      } else {
        setList(product_data);
        setFilterList(product_data);
        setCompanyWarehouse({
          wid: null,
          wn: 'All Warehouse',
        });
      }
      setLoading(false);
      //   var data_product = await getSyncData('products');

      //   var data_subcategory = await getSyncData('subcategory');
      //   var data_category = await getSyncData('category');
      //   setCompanyWarehouse({
      //     wid: data_companywarehouse.warehouseId,
      //     wn: data_companywarehouse.warehouseName,
      //   });
      //   setList(data_product);
      //   setFilterList(data_product);
      //   setCategoryList(data_category);
      //   setSubcategoryList(data_subcategory);
    }
  };

  //   const searchByCategory = () => {
  //     setVisible(false);
  //     var arr = [];
  //     if (SubCategory != '' || category != '') {
  //       getList.map((item) => {
  //         if (
  //           item.category != null &&
  //           item.subCategory != null &&
  //           (item.subCategory.toLowerCase() == SubCategory.toLowerCase() ||
  //             item.category.toLowerCase() == category.toLowerCase())
  //         ) {
  //           arr.push(item);
  //         }
  //       });
  //       setFilterList(arr);
  //     } else {
  //       setFilterList(getList);
  //     }
  //   };

  //   const ShowDialog = () => {
  //     return (
  //       <Provider>
  //         <Portal>
  //           <Dialog
  //             visible={visible}
  //             onDismiss={() => setVisible(false)}
  //             style={{marginBottom: 100}}>
  //             <Dialog.Title>Search By Category</Dialog.Title>
  //             <Dialog.Content>
  //               <View style={{borderWidth: 0.3, borderRadius: 5, margin: 5}}>
  //                 <Picker
  //                   selectedValue={category}
  //                   style={{height: 50, width: width * 0.7}}
  //                   onValueChange={(value) => setCategory(value)}>
  //                   <Picker.Item label="~Category~" value="" />
  //                   {fillCategories()}
  //                 </Picker>
  //               </View>
  //               <View style={{borderWidth: 0.3, borderRadius: 5, margin: 5}}>
  //                 <Picker
  //                   selectedValue={SubCategory}
  //                   style={{height: 50, width: width * 0.7}}
  //                   onValueChange={(itemValue, itemIndex) =>
  //                     setSubCategory(itemValue)
  //                   }>
  //                   <Picker.Item label="~Sub Category~" value="" />
  //                   {fillSubCategories()}
  //                 </Picker>
  //               </View>
  //             </Dialog.Content>
  //             <Dialog.Actions>
  //               <Button onPress={() => searchByCategory()}>Search</Button>
  //             </Dialog.Actions>
  //           </Dialog>
  //         </Portal>
  //       </Provider>
  //     );
  //   };

  const filtering = (search) => {
    var arr = [];
    getList.map((item) => {
      if (item.name.toLowerCase().includes(search.toLowerCase())) {
        arr.push(item);
      }
    });
    setFilterList(arr);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <View style={styles.root}>
        <View style={styles.searchView}>
          <TextInput
            style={styles.search}
            placeholder="Search Product"
            onChangeText={(txt) => filtering(txt.toLowerCase())}
          />
          <AICON
            name="search1"
            size={20}
            color={'#000'}
            style={{right: 30, padding: 5, alignSelf: 'center'}}
          />
          {/* <AICON
            name="filter"
            style={{alignSelf: 'center', right: 25}}
            size={20}
            onPress={() => setVisible(true)}
          /> */}
        </View>
        <View>
          <Text>{companyWarehouse.wn}</Text>
        </View>
        {loading ? (
          <View style={{flex: 1, justifyContent: 'center', marginTop: 300}}>
            <ActivityIndicator size="large" color="red" />
          </View>
        ) : (
          <FlatList
            data={getFilterList}
            renderItem={renderItem}
            keyExtractor={(item) => item.productId.toString()}
          />
        )}
      </View>
      {/* {ShowDialog()} */}
    </>
  );
}
