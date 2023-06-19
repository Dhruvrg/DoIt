import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import userContext from "../Context/users/userContext";
import MyNotication from "./MyNotication";

const TaskItem = ({ item, navigation }) => {
  const context = useContext(userContext);
  const { deleteATasks, setEditId, setWork, setDue, setTag, taskStatus } =
    context;
  const { id, work, tag, due, result } = item;
  const [done, setDone] = useState(result);
  const [total, setTotal] = useState(1000);
  today = JSON.stringify(due);
  const d = new Date(due);

  useEffect(() => {
    setInterval(() => {
      today.slice(1, 11) == JSON.stringify(new Date()).slice(1, 11)
        ? setTotal(
            ((d.getHours() - new Date().getHours()) * 60 +
              d.getMinutes() -
              new Date().getMinutes()) *
              60 +
              new Date().getSeconds()
          )
        : null;
    }, 1000);
  }, []);

  return (
    <View style={styles.containerStyle}>
      <TouchableOpacity
        onPress={() => {
          taskStatus(!done, id);
          setDone(!done);
        }}
      >
        <View
          style={[
            styles.tickStyle,
            { backgroundColor: done ? "#5BB450" : "#2DA8D8FF" },
          ]}
        >
          <Image
            style={{ height: 25, width: 25 }}
            source={require("../assets/check-mark.png")}
          />
        </View>
      </TouchableOpacity>
      {today.slice(1, 11) == JSON.stringify(new Date()).slice(1, 11) &&
      total == 5
        ? (console.log(total),
          (<MyNotication title={"You've a task 📬"} body={work} />))
        : null}
      <View style={styles.contentStyle}>
        <TouchableOpacity
          onPress={() => {
            setEditId(id);
            setDue(due);
            setWork(work);
            setTag(tag);
            navigation.navigate("Create");
          }}
        >
          <Text numberOfLines={1} style={{ textAlign: "left", width: 200 }}>
            {work}
          </Text>
          <Text numberOfLines={1} style={{ textAlign: "left", width: 200 }}>
            {tag}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={{ textAlign: "center" }}>
          {today.slice(1, 11) == JSON.stringify(new Date()).slice(1, 11)
            ? `${d.getHours() < 10 ? `0${d.getHours()}` : d.getHours()}:${
                d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()
              }:00`
            : today.slice(1, 11)}
        </Text>
        <TouchableOpacity onPress={() => deleteATasks(id)}>
          <Image
            style={{ height: 25, width: 25 }}
            source={require("../assets/delete.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentStyle: {
    width: "100%",
    flex: 1,
    height: 50,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  containerStyle: {
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 7.5,
    backgroundColor: "#2DA8D8FF",
    padding: 7.5,
  },
  tickStyle: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
    borderRadius: 5,
    borderWidth: 2.5,
  },
});

export default TaskItem;
