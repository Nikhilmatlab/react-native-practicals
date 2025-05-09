import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {STRINGS} from '../../../common/Utils/Strings';
import {COLORS} from '../../../common/Utils/Colors';
import {RFValue} from 'react-native-responsive-fontsize';
import {IMAGES} from '../../../common/Utils/Images';
import {width} from '../../../common/Utils/Constant';

const DisableList = () => {
  const navigation = useNavigation();
  const [disabledItems, setDisabledItems] = useState([]);

  useEffect(() => {
    loadDisabledItems();
  }, []);

  const loadDisabledItems = async () => {
    try {
      const storedData = await AsyncStorage.getItem('disabledItems');
      if (storedData) {
        setDisabledItems(Array.from(new Map(JSON.parse(storedData)).values())); // Convert back to array
      }
    } catch (error) {
      console.error('Error loading disabled items:', error);
    }
  };

  const renderItem = ({item}) => (
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
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.spacingContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.btnBack}>
            <Text style={styles.btnText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>{STRINGS.DisableList}</Text>
        </View>

        {disabledItems.length === 0 ? (
          <Text style={styles.noDataText}>No disabled items</Text>
        ) : (
          <FlatList
            data={disabledItems}
            keyExtractor={item => `${item.albumId}-${item.id}`}
            renderItem={renderItem}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default DisableList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
    padding: RFValue(15),
  },
  spacingContainer: {
    paddingHorizontal: RFValue(20),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: RFValue(10),
  },
  headerText: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    color: COLORS.Black,
  },
  btnBack: {
    paddingVertical: RFValue(10),
    borderRadius: RFValue(10),
  },
  btnText: {
    color: COLORS.Black,
    fontSize: RFValue(14),
    fontWeight: 'bold',
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
  noDataText: {
    textAlign: 'center',
    fontSize: RFValue(16),
    color: COLORS.Gray,
  },
});
