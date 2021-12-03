import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {View, Text, Button, ScrollView, Image, StyleSheet} from 'react-native';
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
      <ScrollView>
        {context.state.map(prod => (
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
            <Text>Quantidade no carrinho: {prod.quant}</Text>
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
          </Card>
        ))}
      </ScrollView>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button
          title="Continuar comprando"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  picture: {
    width: '100%',
    height: 200,
  },
  quantityCard: {
    flex: 1,
    flexDirection: 'row',
  },
  plusIcon: {
    marginRight: 20,
    marginTop: 10,
  },
  minusIcon: {
    marginTop: 10,
  },
});

export default CartScreen;
