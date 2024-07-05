import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Types } from "../helper";
import { CardItem } from "../components";
import { photoItemType } from "../helper/types/Types";
import { fetchPhotoList } from "../services/api/apiFunctions";

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchedText, setSearchedText] = useState<string>("");

  const [photoList, setPhotoList] = useState<photoItemType[]>([]);
  const [filteredArr, setFilteredArr] = useState<photoItemType[]>([]);
  const [blockedList, setBlockedList] = useState<photoItemType[]>([]);

  const { navigate } = useNavigation<any>();

  useEffect(() => {
    getData();
  }, []);

  const onBlockBtnPress = () => {
    navigate("BlockedListScreen", blockedList);
  };

  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchPhotoList();
      if (data?.data?.length > 0) {
        setPhotoList(data?.data);
        setFilteredArr(data?.data);
      }
      const listArr = await AsyncStorage.getItem("blockList");
      if (listArr !== null) {
        const newArr: Types.photoItemType[] = JSON.parse(listArr);
        setBlockedList(newArr);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("getData - Home", error);
    }
  };

  const onSwitchPress = async (item: Types.photoItemType) => {
    try {
      const isEnabled = blockedList?.some(
        (i) => i?.albumId === item?.albumId && i?.id === item?.id
      );
      console.log(isEnabled);

      if (!isEnabled) {
        const newArr = [...blockedList, item];
        await AsyncStorage.setItem("blockList", JSON.stringify(newArr));
        setBlockedList(newArr);
      } else {
        const newArr = blockedList?.filter(
          (i) => i?.id !== item?.id
          // && i?.albumId !== item?.albumId
        );
        await AsyncStorage.setItem("blockList", JSON.stringify(newArr));
        setBlockedList(newArr);
      }
    } catch (error) {
      console.log("onSwitchPress - Home", error);
    }
  };

  const onChangeText = (text: string) => {
    if (text?.trim()?.length) {
      setSearchedText(text);
      const newArr = [...photoList]?.filter((i) =>
        i?.title
          ?.toLocaleLowerCase()
          ?.includes(text?.trim()?.toLocaleLowerCase())
      );
      setFilteredArr(newArr);
    } else {
      setSearchedText(text);
      setFilteredArr(photoList);
    }
  };

  const renderItem = ({ item }: { item: Types.photoItemType }) => (
    <CardItem
      item={item}
      onSwitchPress={onSwitchPress}
      blockedList={blockedList}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.blockBtn} onPress={onBlockBtnPress}>
        <Text>BlockedList</Text>
      </TouchableOpacity>

      <TextInput
        value={searchedText}
        placeholder="Search"
        style={styles.searchBox}
        onChangeText={onChangeText}
      />
      {isLoading && (
        <ActivityIndicator
          size={"large"}
          style={styles.indicatorStyle}
          color={"red"}
        />
      )}
      <FlatList
        data={filteredArr}
        renderItem={renderItem}
        bounces={false}
        ListEmptyComponent={() => (
          <Text style={{ alignSelf: "center" }}>No Item Found</Text>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
  },
  searchBox: {
    width: "90%",
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 12,
    marginVertical: 10,
    paddingVertical: 10,
    paddingLeft: 10,
  },
  indicatorStyle: {
    position: "absolute",
    alignSelf: "center",
  },
  blockBtn: {
    paddingVertical: 1,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 12,
    alignSelf: "flex-end",
    marginRight: 12,
    marginTop: 12,
  },
});

export default Home;
