import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { db } from "../config/firebase";
import chatContext from "../Context/chat/chatContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  addDoc,
  collection,
  updateDoc,
  doc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";

const Chats = () => {
  const {
    params: { chat, userName, id, otherUserId },
  } = useRoute();

  const context = useContext(chatContext);
  const { email } = context;

  const [chats, setChats] = useState(chat);
  const [chatId, setChatId] = useState(id);
  const [message, setMessage] = useState("");

  const getChats = async () => {
    try {
      const data = await getDoc(doc(db, "chat", chatId));
      setChats(data.data().chat);
    } catch (error) {
      console.error(error);
    }
  };

  chatId === 0 ? () => null : getChats();

  const sendMsg = async () => {
    chats.chating.push(message);
    try {
      const data = await addDoc(collection(db, "chat"), {
        chat: {
          chating: [message],
          idx: "0",
          0: email,
          1: userName + "@gmail.com",
        },
      });
      setChatId(data.id);
      const userId = await AsyncStorage.getItem("@userId");
      await updateDoc(
        doc(db, "users", otherUserId),
        "list",
        arrayUnion(data.id)
      );
      setChatId(data.id);
      await updateDoc(doc(db, "users", userId), "list", arrayUnion(data.id));
    } catch (error) {
      console.error(error);
    }
    setMessage("");
  };

  const index = chats["0"] === email ? 0 : 1;

  const updateChat = async () => {
    chats.chating.push(message);
    chats.idx += index;
    try {
      {
        index == 0
          ? await updateDoc(doc(db, "chat", chatId), {
              chat: {
                chating: chats.chating,
                idx: chats.idx,
                0: email,
                1: userName + "@gmail.com",
              },
            })
          : await updateDoc(doc(db, "chat", chatId), {
              chat: {
                chating: chats.chating,
                idx: chats.idx,
                0: userName + "@gmail.com",
                1: email,
              },
            });
      }
    } catch (error) {
      console.error(error);
    }
    setMessage("");
  };

  return (
    <View style={{ backgroundColor: "#00000d", flex: 1 }}>
      <ScrollView>
        {chats.chating.length != 0 &&
          chats?.chating?.map((msg, idx) =>
            chats.idx[idx] == index ? (
              <Text key={idx} style={styles.yourMsgStyle}>
                {msg}
              </Text>
            ) : (
              <Text key={idx} style={styles.userMsgStyle}>
                {msg}
              </Text>
            )
          )}
      </ScrollView>
      <View style={styles.sendingMsgStyle}>
        <TextInput
          placeholder="Message"
          placeholderTextColor={"#444444"}
          style={styles.InputStyle}
          value={message}
          onChangeText={(value) => setMessage(value)}
        />
        <TouchableOpacity
          onPress={() =>
            message.length != 0
              ? chats.chating.length != 0
                ? updateChat()
                : sendMsg()
              : null
          }
        >
          <Image
            style={{ height: 25, width: 25, margin: 10 }}
            source={require("../assets/send-message.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  InputStyle: {
    flex: 1,
    borderWidth: 1,
    borderColor: "white",
    height: 45,
    width: "100%",
    padding: 10,
    color: "#2DA8D8FF",
    borderRadius: 20,
    marginBottom: 7.5,
    backgroundColor: "#00000d",
  },
  sendingMsgStyle: {
    flexDirection: "row",
    marginHorizontal: 10,
    position: "absolute",
    bottom: 0,
  },
  userMsgStyle: {
    color: "white",
    backgroundColor: "#808080",
    borderRadius: 5,
    padding: 5,
    marginVertical: 2,
    marginHorizontal: 5,
    alignSelf: "flex-start",
    maxWidth: "75%",
  },
  yourMsgStyle: {
    color: "white",
    backgroundColor: "#808080",
    borderRadius: 5,
    padding: 5,
    marginVertical: 2,
    marginHorizontal: 5,
    alignSelf: "flex-end",
    maxWidth: "75%",
  },
});

export default Chats;
