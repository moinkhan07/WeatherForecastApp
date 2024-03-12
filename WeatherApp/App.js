import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Welcome from "./Components/Welcome";
import Main from "./Components/Main";
import "react-native-gesture-handler";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function App() {
  return (
    <LinearGradient
      colors={["rgb(11,5,81)", "rgb(84,37,154)", "rgb(164,100,206)"]}
      locations={[0.29, 0.53, 0.8]}
      style={styles.container}
    >
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            component={Welcome}
            name="Welcome"
          />
          <Stack.Screen
            options={{ headerShown: false }}
            component={Main}
            name="Main"
          />
        </Stack.Navigator>
      </NavigationContainer>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 20,
    justifyContent: "space-between",
  },
});
