import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../screens/RootStackParams';

import axios from 'axios';

import Icon from 'react-native-vector-icons/AntDesign';
import {Card} from 'react-native-elements';

import {MyContext} from '../../context';

type homeProp = StackNavigationProp<RootStackParamList, 'Home'>;

const Home = () => {
  const navigation = useNavigation<homeProp>();

  const [prodList, setProdList] = useState();
  const [limit, setLimit] = useState(4);
  const context = useContext(MyContext);

  useEffect(() => {
    axios.get(`http://10.0.2.2:3000/posts?_limit=${limit}`).then(response => {
      setProdList(response.data).catch(err => {
        console.log('Error description: ' + err);
      });
    });
  }, []);

  return (
    <>
      <View style={styles.cartView}>
        <Text style={styles.cartCount}>{context.prodQuant()}</Text>
        <TouchableHighlight onPress={() => navigation.navigate('Cart')}>
          <Icon name="shoppingcart" size={40} color="#000" />
        </TouchableHighlight>
      </View>
      <ScrollView>
        {prodList ? (
          prodList.map(prod => (
            <Card key={prod.id}>
              <Card.Title>{prod.title}</Card.Title>
              <Card.Divider />
              <Image
                source={{uri: prod.image}}
                style={styles.picture}
                resizeMode="contain"
              />
              <Text>{prod.description}</Text>
              <Text>{prod.price}</Text>
              <Button
                icon={<Icon name="shoppingcart" size={25} color="white" />}
                title="Colocar no carrinho"
                onPress={() => context.addtoCart({prod})}
              />
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
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 50,
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
    width: '100%',
    height: 200,
  },
});

export default Home;
