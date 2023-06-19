import { View, Text, StyleSheet, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import chatContext from "../Context/chat/chatContext";
import { TextInput } from "react-native-web";

const Users = ({ navigation }) => {
  const context = useContext(chatContext);
  const { email, list, getOtherUsers } = context;
  useEffect(() => {
    getOtherUsers();
  }, []);

  return (
    <View style={{ backgroundColor: "#00000d", flex: 1 }}>
      <FlatList
        keyExtractor={(key) => {
          return key.id;
        }}
        data={list}
        renderItem={({ item }) => {
          return item.user != email.slice(0, -10) ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Chats", {
                  chat: {
                    chating: [],
                    idx: "0",
                    0: email,
                    1: item.user + "@gmail.com",
                  },
                  userName: item.user,
                  id: 0,
                  otherUserId: item.id,
                });
              }}
              style={styles.listStyle}
            >
              <Image
                style={styles.imageStyle}
                source={require("../assets/profile.jpg")}
              />
              <View>
                <Text style={{ fontWeight: "bold" }}>{item.user}</Text>
              </View>
            </TouchableOpacity>
          ) : null;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listStyle: {
    backgroundColor: "#2DA8D8FF",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  imageStyle: {
    height: 45,
    width: 45,
    borderRadius: 50,
    marginHorizontal: 10,
  },
});

export default Users;
