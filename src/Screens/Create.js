import React, { useContext, useState } from "react";
import userContext from "../Context/users/userContext";
import DateField from "react-native-datefield";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ToastAndroid,
  FlatList,
  Image,
} from "react-native";

const Create = ({ navigation }) => {
  const context = useContext(userContext);
  const [isListVisible, setIsListVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const {
    addTasks,
    work,
    setWork,
    due,
    setDue,
    tag,
    setTag,
    editId,
    editTask,
    tags,
  } = context;
  return (
    <View style={styles.createStyle}>
      <TextInput
        placeholder="Enter Your Task"
        placeholderTextColor={"#444444"}
        style={styles.InputStyle}
        value={work}
        onChangeText={(value) => setWork(value)}
      />
      <View style={[styles.InputStyle, { flexDirection: "row" }]}>
        <DateField
          placeholderTextColor={"#444444"}
          labelDate="DD"
          labelMonth="MM"
          labelYear="YYYY"
          styleInput={{ fontSize: 15, color: "#2DA8D8FF" }}
          containerStyle={[styles.InputStyle, { width: 200 }]}
          onSubmit={(value) => setDue(value)}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          style={[styles.InputStyle, { width: 100, padding: 0 }]}
          onConfirm={(value) => setDue(value)}
          onCancel={() => setDatePickerVisibility(false)}
        />
        <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
          <Image
            style={{ height: 25, width: 25, marginLeft: 15 }}
            source={require("../assets/clock.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.InputStyle, { flexDirection: "row" }]}>
        <TextInput
          placeholder="Enter Your Tag"
          placeholderTextColor={"#444444"}
          style={[styles.InputStyle, { width: 225, padding: 0 }]}
          value={tag}
          onChangeText={(value) => setTag(value)}
        />
        <TouchableOpacity onPress={() => setIsListVisible(!isListVisible)}>
          {isListVisible ? (
            <Image
              style={{ height: 15, width: 15 }}
              source={require("../assets/down-chevron.png")}
            />
          ) : (
            <Image
              style={{ height: 15, width: 15 }}
              source={require("../assets/up-chevron.png")}
            />
          )}
        </TouchableOpacity>
      </View>
      {isListVisible ? (
        <View>
          <FlatList
            keyExtractor={(key) => key.id}
            data={tags.slice(1)}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => setTag(item.tagName)}>
                  <Text style={styles.listStyle}>{item.tagName}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : null}
      <TouchableOpacity
        onPress={() => {
          if (tag != "" && JSON.stringify(due).length >= 10 && work != "") {
            if (editId == 0) {
              addTasks(work, due, tag);
            } else {
              editTask(editId, work, due, tag);
            }
            setTag("");
            setWork("");
            setDue(new Date());
            setIsListVisible(false);
            navigation.navigate("Tasks");
          } else {
            if (tag == "") ToastAndroid.show("Enter Tag", ToastAndroid.SHORT);
            if (JSON.stringify(due).length < 10)
              ToastAndroid.show("Enter Due Date", ToastAndroid.SHORT);
            if (work == "") ToastAndroid.show("Enter Work", ToastAndroid.SHORT);
          }
        }}
        style={styles.buttonStyle}
      >
        <Text style={{ color: "#2DA8D8FF", fontWeight: "bold" }}>
          {editId == 0 ? "SUMBIT" : "UPDATE"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  InputStyle: {
    borderBottomWidth: 1,
    alignSelf: "center",
    borderBottomColor: "white",
    height: 45,
    width: 250,
    padding: 10,
    color: "#2DA8D8FF",
  },
  createStyle: {
    justifyContent: "center",
    gap: 25,
    flex: 1,
    backgroundColor: "#00000d",
    width: "100%",
  },
  buttonStyle: { alignSelf: "center", margin: 25 },
  listStyle: {
    backgroundColor: "white",
    borderRadius: 25,
    width: "50%",
    marginHorizontal: "25%",
    textAlign: "center",
    marginVertical: 1,
  },
});

export default Create;
