import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { LinearGradient } from "expo-linear-gradient";

const Welcome = () => {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={["rgb(11,5,81)", "rgb(84,37,154)", "rgb(164,100,206)"]}
      locations={[0.29, 0.53, 0.8]}
      style={styles.welcomeMain}
    >
      <View>
        <View style={styles.logoView}>
          <Image
            style={styles.welcomeImg}
            source={require("../assets/MainLogo.png")}
          />
        </View>
        <View>
          <View style={styles.weatherTextView}>
            <Text style={styles.weatherText}>Weather </Text>
            <Text style={styles.forecastText}>ForeCasts</Text>
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.weatherBtnPress,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={() => navigation.replace("Main")}
          >
            <View style={styles.weatherBtnView}>
              <Text style={styles.weatherBtnText}>Get Start</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  welcomeMain: {
    height: "100%",
    backgroundColor: "transparent",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  logoView: {
    width: 300,
    height: 300,
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 40,
  },
  welcomeImg: {
    width: "80%",
    height: "80%",
  },
  weatherTextView: {
    width: 300,
    alignItems: "center",
    marginTop: 90,
  },
  weatherText: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "600",
  },
  forecastText: {
    fontSize: 40,
    color: "#DDB000",
  },
  weatherBtnPress: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  weatherBtnView: {
    width: "75%",
    height: 55,
    backgroundColor: "#DDB000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  weatherBtnText: {
    fontSize: 18,
    color: "#0B0551",
  },
});

export default Welcome;
