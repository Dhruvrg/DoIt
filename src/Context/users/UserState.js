import { useState } from "react";
import UserContext from "./userContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";
const UserState = (props) => {
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(0);
  const [work, setWork] = useState("");
  const [due, setDue] = useState({});
  const [tag, setTag] = useState("");
  const [selectTag, setSelectTag] = useState("");
  const [taskSearch, setTaskSearch] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [tags, setTags] = useState([
    { id: 0, tagName: "All Tasks" },
    { id: 1, tagName: "Work" },
    { id: 2, tagName: "Shopping" },
    { id: 3, tagName: "Personal" },
  ]);

  const getTasks = async () => {
    let data = await AsyncStorage.getItem("@MyTasks");
    data == null ? setPercentage(0) : setTasks(await JSON.parse(data));
  };

  const getPercentage = async () => {
    let data = await AsyncStorage.getItem("@MyTasks");
    data == null ? (data = []) : (data = await JSON.parse(data));
    let count = 0;
    for (let index = 0; index < data.length; index++) {
      if (data[index].result) {
        count++;
      }
    }
    setPercentage((count * 100) / data.length);
  };

  const getTagName = async () => {
    let data = await AsyncStorage.getItem("@MyTags");
    data != null ? setTags(await JSON.parse(data)) : null;
  };

  const addTagName = async (tagName) => {
    let data = await AsyncStorage.getItem("@MyTags");
    let id = Number.parseInt(tags.slice(-1)[0].id) + 1;
    if (data == null) {
      data = tags;
    } else {
      data = await JSON.parse(data);
      id = Number.parseInt(data.slice(-1)[0].id) + 1;
    }
    data.push({ id: id, tagName: tagName });
    await AsyncStorage.removeItem("@MyTags");
    setTags(data);
    await AsyncStorage.setItem("@MyTags", JSON.stringify(data));
  };

  const addTasks = async (work, due, tag) => {
    const newTags = tags.filter((temp) => {
      return temp.tagName == tag.trim();
    });
    if (newTags.length == 0) {
      addTagName(tag);
    }
    let data = await AsyncStorage.getItem("@MyTasks");
    let id = 0;
    if (data == null) {
      data = [];
    } else {
      data = await JSON.parse(data);
      id = Number.parseInt(data.slice(-1)[0].id) + 1;
    }
    data.push({ id: id, work: work, due: due, tag: tag.trim(), result: false });
    await AsyncStorage.removeItem("@MyTasks");
    setTasks(data);
    await AsyncStorage.setItem("@MyTasks", JSON.stringify(data));
    getPercentage();
    ToastAndroid.show("Added Successfully", ToastAndroid.SHORT);
  };

  const editTask = async () => {
    let data = await AsyncStorage.getItem("@MyTasks");
    data = await JSON.parse(data);
    await AsyncStorage.removeItem("@MyTasks");
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if (element.id === editId) {
        data[index].work = work;
        data[index].due = due;
        data[index].tag = tag.trim();
        break;
      }
    }
    setTasks(data);
    await AsyncStorage.setItem("@MyTasks", JSON.stringify(data));
    setEditId(0);
    ToastAndroid.show("Task Updated", ToastAndroid.SHORT);
  };

  const taskStatus = async (result, id) => {
    let data = await AsyncStorage.getItem("@MyTasks");
    data = await JSON.parse(data);
    await AsyncStorage.removeItem("@MyTasks");
    const n = data.length;
    for (let index = 0; index < n; index++) {
      if (data[index].id === id) {
        data[index].result = result;
        break;
      }
    }
    result
      ? setPercentage(percentage + n / 100)
      : setPercentage(percentage - n / 100);
    setTasks(data);
    await AsyncStorage.setItem("@MyTasks", JSON.stringify(data));
    setEditId(0);
  };

  const deleteATasks = async (id) => {
    let data = await AsyncStorage.getItem("@MyTasks");
    data = await JSON.parse(data);
    await AsyncStorage.removeItem("@MyTasks");
    const newData = data.filter((task) => {
      return task.id !== id;
    });
    setTasks(newData);
    newData.length == 0
      ? (await AsyncStorage.removeItem("@MyTasks"), setPercentage(0))
      : (await AsyncStorage.setItem("@MyTasks", JSON.stringify(newData)),
        getPercentage());
    ToastAndroid.show("Deleted Successfully", ToastAndroid.SHORT);
  };

  const deleteATag = async (id) => {
    let data = await AsyncStorage.getItem("@MyTags");
    data = await JSON.parse(data);
    await AsyncStorage.removeItem("@MyTags");
    const newData = data.filter((temp) => {
      return temp.id !== id;
    });
    setTags(newData);
    await AsyncStorage.setItem("@MyTags", JSON.stringify(newData));
    ToastAndroid.show("Deleted Successfully", ToastAndroid.SHORT);
  };

  return (
    <UserContext.Provider
      value={{
        getTasks,
        addTasks,
        tasks,
        deleteATasks,
        editId,
        setEditId,
        work,
        setWork,
        due,
        setDue,
        tag,
        setTag,
        editTask,
        tags,
        setSelectTag,
        selectTag,
        getTagName,
        taskSearch,
        setTaskSearch,
        deleteATag,
        taskStatus,
        percentage,
        getPercentage,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserState;
