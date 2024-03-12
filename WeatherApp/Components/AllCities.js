import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";

import axios from "axios";

const API_KEY = "e0747255b81f0cf228d13fc402815b24";

const AllCities = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredWeatherData, setFilteredWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  const cities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Jaipur",
    "Ahmedabad",
    "Lucknow",
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = [];
        for (const city of cities) {
          const response = await axios.get(
            `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
          );
          const { lat, lon } = response.data[0];
          const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
          );
          newData.push({ city, weatherData: weatherResponse.data });
        }
        setWeatherData(newData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async (text) => {
    setSearchInput(text);
    try {
      if (text.trim() === "") {
        setFilteredWeatherData([]);
      } else {
        const response = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${text}&limit=1&appid=${API_KEY}`
        );
        const { lat, lon } = response.data[0];
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        setFilteredWeatherData([
          { city: text, weatherData: weatherResponse.data },
        ]);
      }
    } catch (error) {
      console.error(error);
      setFilteredWeatherData([]);
    }
  };

  const displayData =
    searchInput.trim() === "" ? weatherData : filteredWeatherData;

  return (
    <LinearGradient
      colors={["rgb(11,5,81)", "rgb(84,37,154)", "rgb(164,100,206)"]}
      locations={[0.29, 0.53, 0.8]}
      style={styles.allCities}
    >
      <View>
        <Text
          style={{
            color: "#C0C0C0",
            fontSize: 25,
            paddingLeft: 20,
            marginBottom: 20,
          }}
        >
          Weather
        </Text>
        <TextInput
          placeholderTextColor={"#C0C0C0"}
          style={styles.searchByCity}
          placeholder="Search for a city"
          value={searchInput}
          onChangeText={handleSearch}
        />
      </View>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <ScrollView style={styles.weatherByCity}>
          {displayData.map((item, index) => (
            <View key={index} style={styles.weatherView}>
              <View style={styles.weatherViewTop}>
                <Text style={{ color: "white", fontSize: 48 }}>
                  {Math.round(item.weatherData.list[0].main.temp - 273.15)}°C
                </Text>
                <Image
                  style={styles.weatherlogo}
                  source={require("../assets/MainLogo.png")}
                />
              </View>
              <View style={styles.weatherViewBottom}>
                <Text style={{ color: "#C0C0C0", fontSize: 17 }}>
                  {item.city}
                </Text>
                <Text style={{ color: "#C0C0C0" }}>
                  {item.weatherData.list[0].weather[0].description}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  allCities: {
    height: "100%",
    backgroundColor: "transparent",
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  searchByCity: {
    width: "100%",
    height: 45,
    paddingLeft: 10,
    borderRadius: 10,
    borderWidth: 0.3,
    color: "white",
    borderColor: "#848484",
  },
  weatherByCity: {
    height: "80%",
    marginTop: 15,
  },
  weatherView: {
    width: "100%",
    height: 200,
    borderColor: "#E1D9D1",
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 15,
    justifyContent: "space-between",
    padding: 8,
  },
  weatherViewTop: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  weatherViewBottom: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 5,
  },
  weatherlogo: {
    width: 120,
    height: 120,
  },
});

export default AllCities;
