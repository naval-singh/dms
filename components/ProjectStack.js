import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Listproducts from './Listproducts';
import SF_ListProducts from './SF_ListProducts';
import ShowProduct from './ShowProduct';
import SF_ShowProduct from './SF_ShowProduct';
import SF_ShowCart from './SF_ShowCart';
import SF_Invoice from './SF_Invoice';
import SF_InvoiceDetails from './SF_InvoiceDetails';
import ShowCart from './ShowCart';
import AppHeader from './AppHeader';

import {RootNavigator} from './NavigationDrw/RootNavigator';
import Splash from './Loader';
import ShowMyOrders from './MyOrders';
import SF_GrnHistory from './SF_GrnHistory';
import SF_GrnHistoryDetails from './SF_GrnHistoryDetails';
import SF_MyOrdersDetails from './SF_MyOrdersDetails';
import SF_Login from './SF_Login';
export default function ProjectStack(props) {
  const StackNav = createStackNavigator();
  return (
    <StackNav.Navigator initialRouteName="Splash">
      <StackNav.Screen
        name="SF_ListProducts"
        component={SF_ListProducts}
        options={{header: AppHeader}}
      />

      <StackNav.Screen
        name="Listproducts"
        component={Listproducts}
        options={{header: AppHeader}}
      />

      <StackNav.Screen
        name="ShowProduct"
        component={ShowProduct}
        options={{header: AppHeader}}
      />

      <StackNav.Screen
        name="SF_ShowProduct"
        component={SF_ShowProduct}
        options={{header: AppHeader}}
      />
      <StackNav.Screen
        name="SF_ShowCart"
        component={SF_ShowCart}
        options={{header: AppHeader}}
      />
      <StackNav.Screen
        name="SF_Invoice"
        component={SF_Invoice}
        options={{header: AppHeader}}
      />
      <StackNav.Screen
        name="SF_InvoiceDetails"
        component={SF_InvoiceDetails}
        options={{header: AppHeader}}
      />
      <StackNav.Screen
        name="SF_GrnHistory"
        component={SF_GrnHistory}
        options={{header: AppHeader}}
      />
      <StackNav.Screen
        name="SF_GrnHistoryDetails"
        component={SF_GrnHistoryDetails}
        options={{header: AppHeader}}
      />
      <StackNav.Screen
        name="SF_Login"
        component={SF_Login}
        options={{headerShown: false}}
      />
      <StackNav.Screen
        name="SF_MyOrdersDetails"
        component={SF_MyOrdersDetails}
        options={{header: AppHeader}}
      />

      <StackNav.Screen
        name="ShowCart"
        component={ShowCart}
        options={{header: AppHeader}}
      />

      <StackNav.Screen
        name="order"
        component={ShowMyOrders}
        options={{header: AppHeader}}
      />

      <StackNav.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />

      <StackNav.Screen
        name="RootNavigator"
        component={RootNavigator}
        options={{headerShown: false}}
      />
    </StackNav.Navigator>
  );
}
