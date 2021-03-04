import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import {List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getSyncData, removeDatasync} from '../AsyncDataStorage';
import {TouchableOpacity} from 'react-native-gesture-handler';

export function DrawerContent(props) {
  const [user, setUser] = useState();

  const image = require('../../images/profilePlaceholder.jpg');

  const fetchUser = async () => {
    const data = await getSyncData('user');
    setUser(data);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await removeDatasync('user').then(() => {
      setTimeout(() => {
        props.navigation.replace('SF_Login');
      }, 300);
    });
  };

  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <Avatar.Image source={image} size={70} />

          <Title style={styles.title}>{user && user.name}</Title>
          <Caption style={styles.caption}>{user && user.phone}</Caption>
          <Caption style={styles.caption}>{user && user.username}</Caption>
        </View>
      </View>
      <View style={{height: height * 0.72}}>
        <DrawerContentScrollView {...props}>
          <View
            style={{
              marginTop: 10,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: '#eee',
            }}>
            <List.Section>
              {/* section 1 */}
              <List.Accordion
                title="Primary Sales"
                style={{marginBottom: -15, marginTop: -15}}
                left={(props) => <Icon style={styles.btn} name="bars" />}>
                <List.Item
                  title="My Orders"
                  onPress={() => props.navigation.navigate('order')}
                />
                <List.Item
                  title="My Invoices"
                  onPress={() => props.navigation.navigate('SF_Invoice')}
                />
                <List.Item
                  title="Grn History"
                  onPress={() => props.navigation.navigate('SF_GrnHistory')}
                />
              </List.Accordion>

              {/* section 2 */}
              <List.Accordion
                title="Secondary Sales"
                style={{marginBottom: -15}}
                left={(props) => <Icon style={styles.btn} name="bars" />}>
                <List.Item
                  title="Sales"
                  onPress={() => props.navigation.navigate('SS_Sales')}
                />
                {/* <List.Item
                  title="My Invoices"
                  onPress={() => props.navigation.navigate('SF_Invoice')}
                />
                <List.Item
                  title="Grn History"
                  onPress={() => props.navigation.navigate('SF_GrnHistory')}
                /> */}
              </List.Accordion>
            </List.Section>
          </View>

          {/* <View style={{height: height * 0.6, justifyContent: 'flex-end'}}>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({color, size}) => (
              <MaterialCommunityIcons name="logout" color={color} size={size} />
            )}
            label="Logout"
            onPress={handleLogout}
          />
        </Drawer.Section>
      </View> */}
        </DrawerContentScrollView>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          left: 45,
        }}>
        <TouchableOpacity onPress={handleLogout}>
          <Text
            style={{
              fontSize: 22,
              textAlign: 'center',
              backgroundColor: '#008ECC',
              color: '#fff',
              borderRadius: 5,
              marginHorizontal: 50,
              paddingVertical: 5,
            }}>
            Logout
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'center',
            // borderTopWidth: 1,
            paddingTop: 10,
            // borderTopColor: '#ddd',
          }}>
          Contact us at
          <Text style={{color: 'blue'}}> info@plus91labs.com</Text>
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginHorizontal: 20,
    color: '#666',
    fontSize: 20,
    marginVertical: 15,
  },
  drawerContent: {
    // flex: 1,
  },
  userInfoSection: {
    marginTop: 20,
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
