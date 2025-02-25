import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import CardItem from '../components/CardItems';

const DisabledScreen = () => {
  const [fullData, setFullData] = useState([]);
  const disabledCards = useSelector((state) => state.toggles.disabledCards);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/photos')
      .then(response => {
        const filtered = response.data.filter(item => 
          disabledCards.includes(`${item.albumId}-${item.id}`)
        );
        setFullData(filtered);
      })
      .catch(error => console.error(error));
  }, [disabledCards]);

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <FlatList 
        data={fullData}
        keyExtractor={(item) => `${item.albumId}-${item.id}`}
        renderItem={({ item }) => <CardItem item={item} />}
      />
    </View>
  );
};

export default DisabledScreen;
