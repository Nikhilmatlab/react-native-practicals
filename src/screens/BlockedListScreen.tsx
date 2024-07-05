import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CardItem } from "../components";
import { Types } from "../helper";

const BlockedListScreen = ({
  route,
}: {
  route: { params: Types.photoItemType[] };
}) => {
  const blockedList = route?.params;
  const { goBack } = useNavigation();
  const renderItem = ({ item }: { item: Types.photoItemType }) => (
    <CardItem item={item} blockedList={blockedList} />
  );

  console.log("==>", blockedList);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={goBack}>
        <Text>Back</Text>
      </TouchableOpacity>
      <FlatList
        data={blockedList}
        renderItem={renderItem}
        bounces={false}
        // style={{ alignSelf: "center" }}
        ListEmptyComponent={() => <Text>No item found</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  backBtn: {
    paddingVertical: 1,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginLeft: 12,
    marginTop: 12,
  },
});

export default BlockedListScreen;
