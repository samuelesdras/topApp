import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import {Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../screens/RootStackParams';

import axios from 'axios';

import Icon from 'react-native-vector-icons/AntDesign';
import Dot from 'react-native-vector-icons/Entypo';
import {Card} from 'react-native-elements';

import {MyContext} from '../../context';

type homeProp = StackNavigationProp<RootStackParamList, 'Home'>;

const Home = () => {
  const navigation = useNavigation<homeProp>();

  const [prodList, setProdList] = useState();
  const context = useContext(MyContext);

  useEffect(() => {
    axios.get(`http://10.0.2.2:3000/posts`).then(response => {
      setProdList(response.data).catch(err => {
        console.log('Error description: ' + err);
      });
    });
  }, []);

  return (
    <>
      <View style={styles.cartView}>
        {context.totalQuant != 0 ? (
          <Text style={styles.cartCount}>{context.totalQuant}</Text>
        ) : null}
        <TouchableHighlight onPress={() => navigation.navigate('Cart')}>
          <Icon name="shoppingcart" size={40} color="#000" />
        </TouchableHighlight>
      </View>
      <ScrollView>
        {prodList ? (
          prodList.map(prod => (
            <Card key={prod.id}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View>
                  <Card.Image
                    source={{uri: prod.image}}
                    style={styles.picture}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.details}>
                  <View style={styles.detailsTitleView}>
                    <Text style={styles.detailsTitle}>{prod.title}</Text>
                  </View>
                  <Text>
                    <Dot name="dot-single" size={25} color="black" />
                    {prod.description}
                  </Text>
                  <Text>
                    <Dot name="dot-single" size={25} color="black" />
                    {prod.price}
                  </Text>
                </View>
              </View>
              <View style={styles.addToCardBtnView}>
                <Button
                  buttonStyle={styles.addToCardBtn}
                  icon={<Icon name="shoppingcart" size={25} color="white" />}
                  title="Colocar no carrinho"
                  onPress={() => context.addtoCart({prod})}
                />
              </View>
            </Card>
          ))
        ) : (
          <ActivityIndicator size="large" />
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  cartView: {
    flexDirection: 'row-reverse',
    marginLeft: 20,
    marginTop: 10,
  },
  cartCount: {
    backgroundColor: 'red',
    borderRadius: 10,
    color: 'white',
    width: 20,
    marginTop: 18,
    marginLeft: -5,
    paddingLeft: 6,
  },
  picture: {
    width: 180,
  },
  addToCardBtn: {
    borderRadius: 15,
    width: 250,
  },
  addToCardBtnView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  details: {
    marginLeft: 7,
    width: 180,
  },
  detailsTitle: {
    marginBottom: 2,
    fontSize: 20,
    fontWeight: '600',
  },
  detailsTitleView: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
