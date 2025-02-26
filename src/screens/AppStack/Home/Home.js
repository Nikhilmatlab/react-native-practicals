import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getPhotosApi} from '../../../common/api';
import {STRINGS} from '../../../common/Utils/Strings';
import {COLORS} from '../../../common/Utils/Colors';
import {RFValue} from 'react-native-responsive-fontsize';
import {IMAGES} from '../../../common/Utils/Images';
import {width} from '../../../common/Utils/Constant';
import CommonTextInput from '../../../common/Components/CommonTextInput';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../../common/Utils/Screens';

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [disabledItems, setDisabledItems] = useState(new Map());

  const getPhotosData = useSelector(state => state?.photos?.data);

  useEffect(() => {
    dispatch(getPhotosApi());
    loadDisabledItems();
  }, [dispatch]);

  const loadDisabledItems = async () => {
    try {
      const storedData = await AsyncStorage.getItem('disabledItems');
      if (storedData) {
        setDisabledItems(new Map(JSON.parse(storedData)));
      }
    } catch (error) {
      console.error('Error loading disabled items:', error);
    }
  };

  const saveDisabledItems = async newMap => {
    try {
      await AsyncStorage.setItem(
        'disabledItems',
        JSON.stringify(Array.from(newMap.entries())),
      );
    } catch (error) {
      console.error('Error saving disabled items:', error);
    }
  };

  const toggleSwitch = (id, albumId, title, value) => {
    setDisabledItems(prev => {
      const newMap = new Map(prev);
      const key = `${albumId}-${id}`;

      if (!value) {
        newMap.set(key, {id, albumId, title});
      } else {
        newMap.delete(key);
      }

      saveDisabledItems(newMap);
      return newMap;
    });
  };

  const filteredData = useMemo(() => {
    if (!getPhotosData) return [];
    return getPhotosData
      .filter(item => !disabledItems.has(`${item.albumId}-${item.id}`))
      .filter(item =>
        item.title.toLowerCase().includes(searchText.toLowerCase()),
      );
  }, [searchText, getPhotosData, disabledItems]);

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <Image
          source={IMAGES.NotFound}
          resizeMode="contain"
          style={styles.photoStyle}
        />
        <View style={styles.itemListContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleName}>ID: </Text>
            <Text style={styles.titleText}>{item.id}</Text>
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.titleName}>Album Id: </Text>
            <Text style={styles.titleText}>{item.albumId}</Text>
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.titleName}>Title: </Text>
            <Text style={styles.titleText}>{item.title}</Text>
          </View>

          <Switch
            trackColor={{false: COLORS.Gray, true: COLORS.Green}}
            thumbColor={COLORS.White}
            ios_backgroundColor={COLORS.Gray}
            onValueChange={value =>
              toggleSwitch(item.id, item.albumId, item.title, value)
            }
            value={!disabledItems.has(`${item.albumId}-${item.id}`)}
            style={styles.switchStyle}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.spacingContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.photosText}>{STRINGS.Photos}</Text>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => navigation.navigate(SCREENS.DisableList)}>
            <Text>{STRINGS.DisableList}</Text>
          </TouchableOpacity>
        </View>

        <CommonTextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder={STRINGS.SearchTitle}
          style={{transform: [{scaleX: 0.5}, {scaleY: 0.8}]}}
        />

        {getPhotosData === null ? (
          <View style={styles.noDataContainer}>
            <ActivityIndicator size="large" color={COLORS.Black} />
          </View>
        ) : filteredData.length === 0 ? (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No data Found</Text>
          </View>
        ) : (
          <FlatList
            data={filteredData}
            keyExtractor={item => `${item.albumId}-${item.id}`}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
  },
  spacingContainer: {
    paddingHorizontal: RFValue(15),
  },
  photosText: {
    color: COLORS.Black,
    fontSize: RFValue(20),
    fontWeight: '900',
    textAlign: 'center',
    paddingVertical: RFValue(15),
  },
  itemContainer: {
    shadowColor: COLORS.Black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    paddingVertical: RFValue(10),
    paddingRight: RFValue(50),
    backgroundColor: COLORS.White,
    marginVertical: RFValue(10),
    marginHorizontal: RFValue(5),
    borderRadius: RFValue(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  photoStyle: {
    height: RFValue(60),
    width: RFValue(90),
    borderRadius: RFValue(25),
  },
  titleText: {
    color: COLORS.Black,
    fontSize: RFValue(12),
    fontWeight: '400',
    width: width * 0.44,
  },
  itemListContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  titleContainer: {
    flexDirection: 'row',
    paddingVertical: RFValue(2),
  },
  titleName: {
    color: COLORS.Black,
    fontSize: RFValue(12),
    fontWeight: '700',
  },
  switchStyle: {
    position: 'absolute',
    right: RFValue(26),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: RFValue(8),
  },
  btnStyle: {
    backgroundColor: COLORS.LightBlue,
    padding: RFValue(10),
    borderRadius: RFValue(10),
  },
  noDataText: {
    textAlign: 'center',
    fontSize: RFValue(16),
    color: COLORS.Gray,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: RFValue(250),
  },
});
