import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";
import userContext from "../Context/users/userContext";
import TaskItem from "../Components/TaskItem";
import { SafeAreaView } from "react-native-safe-area-context";

const Tasks = ({ navigation }) => {
  const context = useContext(userContext);
  const { getTasks, tasks, selectTag, taskSearch } = context;

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "#00000d", flex: 1, padding: 2.5 }}>
      {tasks.length == 0 ? (
        <View style={{ justifyContent: "center", flex: 1 }}>
          <Text style={styles.noTaskStyle}>Nothing To Do</Text>
        </View>
      ) : (
        <FlatList
          keyExtractor={(key) => {
            return key.id;
          }}
          data={tasks}
          renderItem={({ item }) => {
            return (selectTag == "All Tasks" || selectTag == "") &&
              item.work.match(new RegExp(taskSearch, "gi")) ? (
              <TaskItem navigation={navigation} item={item} />
            ) : item.tag == selectTag &&
              item.work.match(new RegExp(taskSearch, "gi")) ? (
              <TaskItem navigation={navigation} item={item} />
            ) : (
              ""
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  noTaskStyle: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
  },
});

export default Tasks;
