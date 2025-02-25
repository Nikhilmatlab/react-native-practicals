import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList } from 'react-native';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { loadDisabledCards } from '../utils/storageHelper';
import CardItem from '../components/CardItems';

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const disabledCards = useSelector((state) => state.toggles.disabledCards);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/photos')
      .then(response => setData(response.data))
      .catch(error => console.error(error));
    loadDisabledCards(dispatch);
  }, []);

  const filteredData = data.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase()) && 
    !disabledCards.includes(`${item.albumId}-${item.id}`)
  );

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <TextInput 
        placeholder="Search by title..." 
        onChangeText={setSearch} 
        className="border border-gray-400 bg-white rounded-lg p-3 text-lg shadow-sm"
      />
      <FlatList 
        data={filteredData} 
        keyExtractor={item => `${item.albumId}-${item.id}`}
        renderItem={({ item }) => <CardItem item={item} />}
      />
    </View>
  );
};

export default HomeScreen;
