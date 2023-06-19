import React, { useContext } from "react";
import userContext from "../Context/users/userContext";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const TagNameItem = ({ item }) => {
  const context = useContext(userContext);
  const { setSelectTag, deleteATag } = context;

  return (
    <View style={styles.tagNameStyle}>
      <TouchableOpacity
        style={styles.deletenameStyle}
        onPress={() => setSelectTag(item.tagName)}
      ></TouchableOpacity>
      <TouchableOpacity
        style={styles.nameStyle}
        onPress={() => setSelectTag(item.tagName)}
      >
        <Text style={{ textAlign: "center" }}>{item.tagName}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deletenameStyle}
        onPress={() => deleteATag(item.id)}
      >
        <Image
          style={{ height: 25, width: 25, margin: 10 }}
          source={require("../assets/remove.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tagNameStyle: {
    backgroundColor: "white",
    height: 50,
    borderRadius: 25,
    margin: 2.5,
    display: "flex",
    flexDirection: "row",
  },
  nameStyle: {
    paddingVertical: 15,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    width: "70%",
  },
  deletenameStyle: {
    paddingVertical: 15,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    width: "15%",
    justifyContent: "center",
  },
});

export default TagNameItem;
