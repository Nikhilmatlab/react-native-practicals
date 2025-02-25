import React from 'react';
import { View, Text, Image, Switch, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCard } from '../redux/togglesSlice';

const CardItem = ({ item }) => {
  const dispatch = useDispatch();
  const disabledCards = useSelector((state) => state.toggles.disabledCards);
  const cardKey = `${item.albumId}-${item.id}`;
  const isDisabled = disabledCards.includes(cardKey);

  return (
    <View style={styles.card}>
      <Image source={{ uri: item.url || 'https://via.placeholder.com/100' }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.id}>ID: {item.id}</Text>
        <Text style={styles.albumId}>Album ID: {item.albumId}</Text>
        <Text style={styles.title}>Title: {item.title}</Text>
      </View>
      <Switch value={!isDisabled} onValueChange={() => dispatch(toggleCard(item))} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  id: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  albumId: {
    fontSize: 16,
    color: '#555',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444',
  },
});

export default CardItem;
