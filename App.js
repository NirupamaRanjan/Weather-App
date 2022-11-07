import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Button,
} from "react-native";

import * as Location from "expo-location";
import WeatherInfo from "./Components/WeatherInfo";
import UnitPicker from "./Components/UnitPicker";
import colors from "./utils/colors";
import ReloadIcon from "./Components/ReloadIcon";
import WeatherDetails from "./Components/WeatherDetails";

const WEATHER_API_KEY = "daf8ef63d35bb2ab4bd43a563394641a";
const BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?";

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setcurrentWeather] = useState(null);
  const [unitSystem, setUnitSystem] = useState("metric");

  useEffect(() => {
    load();
  }, [unitSystem]);

  async function load() {
    setcurrentWeather(null);
    setErrorMessage(null);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMessage("Access to location is needed to run the application");
        return;
      }
      const location = await Location.getLastKnownPositionAsync({});
      const { latitude, longitude } = location.coords;

      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitSystem}&appid=${WEATHER_API_KEY}`;

      const response = await fetch(weatherUrl);

      const result = await response.json();

      if (response.ok) {
        setcurrentWeather(result);
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  if (currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <UnitPicker unitSystem={unitSystem} setUnit={setUnitSystem} />
          <ReloadIcon load={load} />

          <WeatherInfo currentWeather={currentWeather} />
          <WeatherDetails
            currentWeather={currentWeather}
            unitSystem={unitSystem}
          />
        </View>
      </View>
    );
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={{ textAlign: "center" }}>{errorMessage}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  main: {
    justifyContent: "center",
    flex: 1,
  },
});
