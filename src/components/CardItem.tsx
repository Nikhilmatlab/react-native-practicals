import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { Types } from "../helper";

const CardItem = ({
  item,
  blockedList,
  onSwitchPress,
}: {
  item: Types.photoItemType;
  blockedList: Types.photoItemType[];
  onSwitchPress?: (item: Types.photoItemType) => void;
}) => {
  const isEnabled = blockedList?.some(
    (i) => i?.albumId === item?.albumId && i?.id === item?.id
  );
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <FastImage
          source={{ uri: item?.thumbnailUrl, priority: "high" }}
          style={styles.imageStyle}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1}>Title: {item?.title}</Text>
        <Text>ID: {item?.id}</Text>
        <Text>AlbumId: {item?.albumId}</Text>
        {onSwitchPress && (
          <Switch
            onValueChange={() => onSwitchPress(item)}
            value={isEnabled ? false : true}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#00000030",
    flexDirection: "row",
    // alignItems: "center",
    paddingHorizontal: 12,
    marginHorizontal: 12,
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageStyle: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 12,
  },
});

export default CardItem;
