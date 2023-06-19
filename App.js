import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/Screens/Home";
import Navbar from "./src/Components/Navbar";
import Header from "./src/Components/Header";
import Tasks from "./src/Screens/Tasks";
import UserState from "./src/Context/users/UserState";
import Create from "./src/Screens/Create";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <UserState>
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
        </Stack.Navigator>
        <Navbar />
      </NavigationContainer>
    </UserState>
  );
}
