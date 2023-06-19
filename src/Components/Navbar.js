import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";

const Navbar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.navbarStyle}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <View style={styles.itemStyle}>
          <Image
            style={styles.iconStyle}
            source={require("../assets/home.png")}
          />
          <Text style={styles.textStyle}>Home</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Create")}>
        <Image
          style={styles.CreateStyle}
          source={require("../assets/add-button.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Tasks")}>
        <View style={styles.itemStyle}>
          <Image
            style={styles.iconStyle}
            source={require("../assets/checklist.png")}
          />
          <Text style={styles.textStyle}>Tasks</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbarStyle: {
    backgroundColor: "black",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    paddingTop: "2.5%",
  },
  itemStyle: { display: "flex", alignItems: "center" },
  textStyle: { fontSize: 10, color: "white" },
  iconStyle: { height: 25, width: 25 },
  CreateStyle: { height: 35, width: 35, marginTop: 1 },
});

export default Navbar;
