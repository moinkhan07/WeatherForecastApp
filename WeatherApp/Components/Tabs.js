import { View, Text, StyleSheet, Pressable } from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

const Tabs = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.tabsMain}>
      <Pressable
        style={({ pressed }) => [
          styles.pressable,
          { opacity: pressed ? 0.7 : 1 },
        ]}
        onPress={() => navigation.navigate("Home")}
      >
        <View style={styles.pressBtn}>
          <FontAwesome name="home" size={32} color="white" />
          <Text style={styles.pressBtnText}>Home</Text>
        </View>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.pressable,
          { opacity: pressed ? 0.7 : 1 },
        ]}
        onPress={() => navigation.navigate("AllCities")}
      >
        <View style={styles.pressBtn}>
          <FontAwesome5 name="city" size={25} color="white" />
          <Text style={styles.pressBtnText}>All Cities</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  tabsMain: {
    paddingHorizontal: 10,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pressable: {
    width: "45%",
    height: "100%",
    borderRadius: 18,
  },
  pressBtn: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderRadius: 10,
    borderWidth: 0.3,
  },
  pressBtnText: {
    fontSize: 18,
    color: "white",
    paddingLeft: 5,
  },
});

export default Tabs;
