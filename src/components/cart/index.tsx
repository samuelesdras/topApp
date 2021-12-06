import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Button} from 'react-native-elements';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../screens/RootStackParams';
import Icon from 'react-native-vector-icons/AntDesign';
import {Card} from 'react-native-elements';

import {MyContext} from '../../context';

type cartProp = StackNavigationProp<RootStackParamList, 'Cart'>;

const CartScreen = ({route}) => {
  const navigation = useNavigation<cartProp>();
  const context = useContext(MyContext);

  return (
    <>
      {context.state.length > 0 ? (
        <ScrollView>
          {context.state.map(prod => (
            <Card key={prod.id}>
              <Card.Title style={{fontSize: 20}}>{prod.title}</Card.Title>
              <Card.Divider />
              <Image
                source={{uri: prod.image}}
                style={styles.picture}
                resizeMode="contain"
              />
              <View style={styles.detailsView}>
                <View>
                  <Text>{prod.description}</Text>
                  <Text style={{fontWeight: '900', fontSize: 15}}>
                    {prod.price}
                  </Text>
                  <Text>
                    Quantidade no carrinho:{' '}
                    <Text style={{fontWeight: '600', fontSize: 15}}>
                      {prod.quant}
                    </Text>
                  </Text>
                </View>
                <View style={styles.quantityCard}>
                  <Icon
                    name="plus"
                    size={20}
                    color="#000"
                    style={styles.plusIcon}
                    onPress={() => context.addtoCart({prod})}
                  />
                  <Icon
                    name="minus"
                    size={20}
                    color="#000"
                    style={styles.minusIcon}
                    onPress={() => context.removeFromCart({prod})}
                  />
                </View>
              </View>
            </Card>
          ))}
          <View style={styles.keepBuyinBtnView}>
            <Button
              buttonStyle={styles.keepBuyinBtn}
              title="Continuar comprando"
              onPress={() => navigation.navigate('Home')}
            />
          </View>
        </ScrollView>
      ) : (
        <>
          <View style={styles.noItem}>
            <ActivityIndicator size="large" />
            <Text>Nenhum item no carrinho</Text>
          </View>
          <View style={styles.keepBuyinBtnView}>
            <Button
              buttonStyle={styles.keepBuyinBtn}
              title="Continuar comprando"
              onPress={() => navigation.navigate('Home')}
            />
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  picture: {
    width: '100%',
    height: 200,
  },
  detailsView: {
    flexDirection: 'row',
    marginTop: 10,
  },
  quantityCard: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  plusIcon: {
    marginRight: 20,
    marginLeft: 25,
    marginTop: 10,
  },
  minusIcon: {
    marginTop: 10,
  },
  noItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keepBuyinBtn: {
    borderRadius: 15,
    width: 250,
  },
  keepBuyinBtnView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default CartScreen;
