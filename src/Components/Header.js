import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "react-native-modal";
import userContext from "../Context/users/userContext";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  FlatList,
} from "react-native";
import TagNameItem from "./TagNameItem";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();
  const context = useContext(userContext);
  const { tags, taskSearch, setTaskSearch } = context;
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <SafeAreaView style={{ backgroundColor: "black" }}>
      <View style={styles.navbarStyle}>
        <Image
          style={styles.logoStyle}
          source={require("../assets/logo.jpeg")}
        />
        <View>
          <Text style={{ fontWeight: "bold", color: "#2DA8D8FF" }}>DoIt</Text>
          <Text style={{ fontWeight: "bold", color: "#555555" }}>
            Add Your Task
          </Text>
        </View>
        <View style={styles.innerContainerStyle}>
          <Image
            style={{ height: 20, width: 20 }}
            source={require("../assets/search.png")}
          />
          <TextInput
            style={{ color: "white" }}
            placeholder="Task Name"
            keyboardType="default"
            value={taskSearch}
            onChangeText={(value) => setTaskSearch(value)}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Users")}>
          <Image
            style={{ height: 25, width: 25, marginTop: 5 }}
            source={require("../assets/user-avatar.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsModalVisible(!isModalVisible)}>
          <Image
            style={{ height: 25, width: 25, marginTop: 5 }}
            source={require("../assets/filtering.png")}
          />
        </TouchableOpacity>
      </View>
      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1 }}>
          <FlatList
            keyExtractor={(key) => key.id}
            data={tags}
            renderItem={({ item }) => {
              return <TagNameItem item={item} />;
            }}
          />
          <Button
            title="Hide"
            onPress={() => setIsModalVisible(!isModalVisible)}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoStyle: {
    height: 40,
    width: "12%",
    borderRadius: 50,
    backgroundColor: "white",
  },
  navbarStyle: {
    display: "flex",
    flexDirection: "row",
    columnGap: 5,
    backgroundColor: "black",
    paddingHorizontal: 7.5,
    paddingVertical: 5,
  },
  containerStyle: { flexDirection: "row", alignItems: "center" },
  innerContainerStyle: {
    flexDirection: "row",
    backgroundColor: "#333333",
    padding: 2.5,
    paddingHorizontal: 7.5,
    columnGap: 7.5,
    alignItems: "center",
    flex: 1,
    borderRadius: 10,
    marginBottom: 2.5,
  },
});

export default Header;
