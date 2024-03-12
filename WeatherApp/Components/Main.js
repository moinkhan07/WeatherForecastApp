import Tabs from "./Tabs";
import AllCities from "./AllCities";
import Home from "./Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

const Main = () => {
  return (
    <LinearGradient
      colors={["rgb(11,5,81)", "rgb(84,37,154)", "rgb(164,100,206)"]}
      locations={[0.29, 0.53, 0.8]}
      style={styles.mainComp}
    >
      <Tab.Navigator tabBar={(props) => <Tabs {...props} />}>
        <Tab.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name="AllCities"
          component={AllCities}
        />
      </Tab.Navigator>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  mainComp: {
    height: "100%",
  },
});

export default Main;
