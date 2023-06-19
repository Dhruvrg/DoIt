import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/Screens/Home";
import Navbar from "./src/Components/Navbar";
import Header from "./src/Components/Header";
import Tasks from "./src/Screens/Tasks";
import UserState from "./src/Context/users/UserState";
import Create from "./src/Screens/Create";
import Message from "./src/Screens/Message";
import Settings from "./src/Screens/Settings";
import SignUp from "./src/Screens/SignUp";
import Chats from "./src/Screens/Chats";
import Users from "./src/Screens/Users";
import ChatState from "./src/Context/chat/ChatState";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <UserState>
      <ChatState>
        <NavigationContainer>
          <Header />
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={Home}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Tasks"
              component={Tasks}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Create"
              component={Create}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Message"
              component={Message}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Settings"
              component={Settings}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="SignUp"
              component={SignUp}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Chats"
              component={Chats}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Users"
              component={Users}
            />
          </Stack.Navigator>
          <Navbar />
        </NavigationContainer>
      </ChatState>
    </UserState>
  );
}
