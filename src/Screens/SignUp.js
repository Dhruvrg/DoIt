import React, { useContext, useState } from "react";
import { auth, db } from "../config/firebase";
import chatContext from "../Context/chat/chatContext";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginOrSignUp, setLoginOrSignUp] = useState(true);

  const context = useContext(chatContext);
  const { setUserEmail } = context;

  const navigation = useNavigation();

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password.trim());
      const data = await addDoc(collection(db, "users"), {
        list: [],
        user: email.trim().slice(0, -10),
      });
      await AsyncStorage.removeItem("@userId");
      await AsyncStorage.setItem("@userId", data.id);
      navigation.navigate("Message");
      setUserEmail(email.trim());
    } catch (error) {
      console.error(error);
    }
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password.trim());
      setUserEmail(email.trim());
      const q = query(
        collection(db, "users"),
        where("user", "==", email.slice(0, -10))
      );
      const data = await getDocs(q);
      data.forEach(async (doc) => {
        await AsyncStorage.removeItem("@userId");
        await AsyncStorage.setItem("@userId", doc.id);
      });
      navigation.navigate("Message");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.loginFormStyle}>
      <TextInput
        placeholder="Enter Your email id"
        placeholderTextColor={"#444444"}
        style={styles.InputStyle}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(value) => setEmail(value)}
      />
      <TextInput
        placeholder="Enter Your Password"
        placeholderTextColor={"#444444"}
        style={styles.InputStyle}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(value) => setPassword(value)}
      />
      {loginOrSignUp ? (
        <TextInput
          placeholder="Enter Confirm Password"
          placeholderTextColor={"#444444"}
          style={styles.InputStyle}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(value) => setConfirmPassword(value)}
        />
      ) : null}
      {loginOrSignUp ? (
        <TouchableOpacity
          onPress={() => {
            if (email == "") Alert.alert("Enter a valid phoneNo");
            if (password == "") Alert.alert("Enter a valid phoneNo");
            if (password != confirmPassword)
              Alert.alert("Password must be same");
            if (email != "" && password != "" && password == confirmPassword) {
              signUp();
            }
          }}
          style={styles.loginButtonStyle}
        >
          <Text style={{ color: "#2DA8D8FF", fontWeight: "bold" }}>
            Sign Up
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            if (email == "") Alert.alert("Enter a valid phoneNo");
            if (password == "") Alert.alert("Enter a valid phoneNo");
            if (email != "" && password != "") {
              login();
            }
          }}
          style={styles.loginButtonStyle}
        >
          <Text style={{ color: "#2DA8D8FF", fontWeight: "bold" }}>Log In</Text>
        </TouchableOpacity>
      )}
      <View>
        <Text style={{ color: "white", alignSelf: "center" }}>
          - - - - - - - - - - - - - - - - OR - - - - - - - - - - - - - - - -
        </Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => setLoginOrSignUp(!loginOrSignUp)}>
          {loginOrSignUp ? (
            <Text style={{ color: "white", alignSelf: "center" }}>
              Already have a account?
            </Text>
          ) : (
            <Text style={{ color: "white", alignSelf: "center" }}>
              Don't have an account?
            </Text>
          )}
        </TouchableOpacity>
      </View>
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
  loginFormStyle: {
    justifyContent: "center",
    gap: 25,
    flex: 1,
    backgroundColor: "#00000d",
    width: "100%",
  },
  loginButtonStyle: {
    alignSelf: "center",
    margin: 10,
  },
});

export default SignUp;
