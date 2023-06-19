import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { db } from "../config/firebase";
import { getDoc, doc } from "firebase/firestore";
import chatContext from "../Context/chat/chatContext";

const MessageItem = ({ item }) => {
  const context = useContext(chatContext);
  const { email } = context;
  const [chats, setChats] = useState();

  const [color, setColor] = useState(true);

  const getChats = async () => {
    const data = await getDoc(doc(db, "chat", item));
    setChats({ ...data.data(), id: data.id });
  };
  getChats();
  const navigation = useNavigation();
  const userName =
    chats?.chat["0"] != email
      ? chats?.chat["0"].slice(0, -10)
      : chats?.chat["1"].slice(0, -10);
  return (
    <TouchableOpacity
      onLongPress={() => setColor(!color)}
      onPress={() =>
        navigation.navigate("Chats", {
          chat: chats?.chat,
          userName: userName,
          id: chats?.id,
        })
      }
    >
      <View
        style={[
          styles.listStyle,
          { backgroundColor: color ? "#2DA8D8FF" : "#2DA8F" },
        ]}
      >
        <Image
          style={styles.imageStyle}
          source={require("../assets/profile.jpg")}
        />
        <View>
          <Text style={{ fontWeight: "bold" }}>{userName}</Text>
          <Text
            style={{ color: "#333333", width: 250 }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {chats?.chat?.chating?.slice(-1)[0]}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listStyle: {
    height: 75,
    flexDirection: "row",
    alignItems: "center",
  },
  imageStyle: {
    height: 55,
    width: 55,
    borderRadius: 50,
    marginHorizontal: 10,
  },
});

export default MessageItem;
