import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Settings = () => {
  const signOutAccount = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("@userId");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ backgroundColor: "#00000d", height: 900 }}>
      <View>
        <TouchableOpacity onPress={() => signOutAccount()}>
          <Text style={{ color: "white", alignSelf: "center" }}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Settings;
