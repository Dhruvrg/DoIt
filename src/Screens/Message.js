import React, { useContext, useEffect, useState } from "react";
import MessageItem from "../Components/MessageItem";
import chatContext from "../Context/chat/chatContext";
import { db } from "../config/firebase";
import { getDoc, doc } from "firebase/firestore";
import { View, StyleSheet, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Message = () => {
  const context = useContext(chatContext);
  const {} = context;
  const [chatList, setChatList] = useState([]);

  const getOtherUsers = async () => {
    const userId = await AsyncStorage.getItem("@userId");
    try {
      const data = await getDoc(doc(db, "users", userId));
      setChatList(data.data().list);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOtherUsers();
  }, []);

  return (
    <View style={{ backgroundColor: "#00000d", flex: 1 }}>
      <FlatList
        keyExtractor={(key) => {
          return key;
        }}
        data={chatList}
        renderItem={({ item }) => {
          return <MessageItem item={item} />;
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({});

export default Message;
