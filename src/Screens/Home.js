import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import userContext from "../Context/users/userContext";
import * as Animatable from "react-native-animatable";
import * as Notifications from "expo-notifications";

const Home = () => {
  const context = useContext(userContext);
  const { getTagName, percentage, getPercentage } = context;
  const [idx, setIdx] = useState(0);
  const [allQuote, setAllQuote] = useState([]);

  const notifications = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
  };
  useEffect(() => {
    notifications();
  }, []);

  useEffect(() => {
    fetchQuotes();
    getTagName();
  }, []);

  const fetchQuotes = async () => {
    const response = await fetch("https://type.fit/api/quotes");
    const json = await response.json();
    setAllQuote(json);
  };

  useEffect(() => {
    getPercentage();
  }, [percentage]);
  setTimeout(() => {
    setIdx(parseInt(1000 * Math.random()));
  }, 10000000);
  return (
    <View style={{ backgroundColor: "black", height: 900, zIndex: -1 }}>
      <View style={styles.containerStyle}>
        {allQuote && allQuote.length > 0 ? (
          <View>
            <Text style={styles.quoteStyle}>{allQuote[idx].text}</Text>
            <Text style={styles.authorStyle}>{allQuote[idx].author}</Text>
          </View>
        ) : null}
      </View>
      <View style={{ alignItems: "center" }}>
        <Animatable.Image
          source={require("../assets/percentageBg.gif")}
          animation="bounceIn"
          style={{ width: "100%", height: "75%" }}
        />
        <Text style={styles.textStyle}>
          {Number.parseInt(isNaN(percentage) ? 0 : percentage)}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: "center",
    height: 125,
    backgroundColor: "#2DA8D8FF",
    margin: 10,
    borderRadius: 15,
    justifyContent: "center",
  },
  quoteStyle: { color: "black", textAlign: "center", paddingHorizontal: 10 },
  authorStyle: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontStyle: "italic",
    marginTop: 5,
  },
  textStyle: {
    fontSize: 35,
    fontWeight: "bold",
    position: "absolute",
    top: "35%",
  },
});

export default Home;
