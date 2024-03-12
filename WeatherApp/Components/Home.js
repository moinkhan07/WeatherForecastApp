import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import axios from "axios";

const API_KEY = "e0747255b81f0cf228d13fc402815b24";
const city = "Mumbai";

const HourlyForecastsScreen = () => {
  const [hourlyData, setHourlyData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
        );
        const { lat, lon } = response.data[0];
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        setHourlyData(weatherResponse.data.list);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const getCurrentDateForecasts = () => {
    if (!hourlyData) {
      return [];
    }
    const currentDate = new Date().toDateString();
    return hourlyData.filter(
      (forecast) => new Date(forecast.dt * 1000).toDateString() === currentDate
    );
  };

  const getFormattedHour = (hour) => {
    return hour % 12 || 12;
  };

  const getAmPm = (hour) => {
    return hour >= 12 ? "PM" : "AM";
  };

  return (
    <ScrollView
      horizontal={true}
      contentContainerStyle={styles.scrollViewContent}
      style={styles.hourlyDailyTemp}
    >
      {getCurrentDateForecasts().map((item, index) => (
        <View key={index} style={styles.weatherTemp}>
          <Text style={{ color: "white", fontSize: 14 }}>
            {getFormattedHour(new Date(item.dt * 1000).getHours())}
            {getAmPm(new Date(item.dt * 1000).getHours())}
          </Text>
          <Image
            style={{ width: 55, height: 55, marginVertical: 6 }}
            source={require("../assets/MainLogo.png")}
          />
          <Text style={{ color: "white", fontSize: 15 }}>
            {Math.round(item.main.temp - 273.15)}°
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const DailyForecastsScreen = () => {
  const [dailyForecasts, setDailyForecasts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
        );
        const dailyData = response.data.list.filter(
          (forecast, index) => index % 8 === 0
        );
        setDailyForecasts(dailyData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const getDayOfWeek = (dateString) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  return (
    <ScrollView
      horizontal={true}
      contentContainerStyle={styles.scrollViewContent}
      style={styles.hourlyDailyTemp}
    >
      {dailyForecasts.map((forecast, index) => (
        <View key={index} style={styles.weatherTemp}>
          <Text style={{ color: "white", fontSize: 13 }}>
            {getDayOfWeek(forecast.dt_txt)}
          </Text>
          <Image
            style={{ width: 55, height: 55, marginVertical: 6 }}
            source={require("../assets/MainLogo.png")}
          />
          <Text style={{ color: "white", fontSize: 15 }}>
            {Math.round(forecast.main.temp - 273.15)}°
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const Tab = createMaterialTopTabNavigator();

const TabBtn = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.tempInfoBtnView}>
      <Pressable
        onPress={() => navigation.navigate("HourlyForecasts")}
        style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
      >
        <Text
          style={{
            color: "#C0C0C0",
          }}
        >
          Hourly Forecasts
        </Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("DailyForecasts")}
        style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
      >
        <Text style={{ color: "#C0C0C0" }}>Daily Forecasts</Text>
      </Pressable>
    </View>
  );
};

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
        );
        const { lat, lon } = response.data[0];
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        setWeatherData(weatherResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <LinearGradient
      colors={["rgb(11,5,81)", "rgb(84,37,154)", "rgb(164,100,206)"]}
      locations={[0.29, 0.53, 0.8]}
      style={styles.homeMain}
    >
      <View style={styles.homeView}>
        <View style={styles.homeImg}>
          <Image
            style={styles.homeLogo}
            source={require("../assets/MainLogo.png")}
          />
          <Text style={{ color: "white", fontSize: 25 }}>{city}</Text>
          <View style={{ flexDirection: "row" }}>
            {weatherData && weatherData.list && weatherData.list[0] && (
              <>
                <Text style={{ color: "white", fontSize: 45 }}>
                  {Math.round(weatherData.list[0].main.temp - 273.15)}
                </Text>
                <Text style={{ color: "white", fontSize: 28 }}>°C</Text>
              </>
            )}
          </View>
          {weatherData && weatherData.list && weatherData.list[0] && (
            <Text style={{ color: "white", fontSize: 18 }}>
              {weatherData.list[0].weather[0].description}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.tempInfo}>
        <Tab.Navigator
          tabBar={(props) => <TabBtn {...props} />}
          screenOptions={{
            headerShown: false,
            swipeEnabled: false,
          }}
          tabBarPosition="top"
        >
          <Tab.Screen
            name="HourlyForecasts"
            component={HourlyForecastsScreen}
          />
          <Tab.Screen name="DailyForecasts" component={DailyForecastsScreen} />
        </Tab.Navigator>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  homeMain: {
    height: "100%",
    backgroundColor: "transparent",
    justifyContent: "space-around",
  },
  homeView: {
    height: "45%",
    justifyContent: "center",
    alignItems: "center",
  },
  homeImg: {
    height: 160,
    justifyContent: "center",
    alignItems: "center",
  },
  homeLogo: {
    width: 150,
    height: 150,
  },
  tempInfo: {
    height: "35%",
  },
  tempInfoBtnView: {
    height: 50,
    borderWidth: 0.3,
    borderColor: "grey",
    borderTopLeftRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  hourlyDailyTemp: {
    height: "80%",
    borderBottomWidth: 0.3,
    borderBottomColor: "#D3D3D3",
    backgroundColor: "#9f5fca",
  },
  scrollViewContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  weatherTemp: {
    width: 90,
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
