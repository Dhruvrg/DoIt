import { View } from "react-native";
import React from "react";
import * as Notifications from "expo-notifications";

const MyNotication = ({ title, body }) => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  const schedulePushNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        data: { data: "goes here scheduleNotificationAsyn" },
      },
      trigger: null,
    });
  };
  schedulePushNotification();
  return <></>;
};

export default MyNotication;
