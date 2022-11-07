import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../utils/colors";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

export default function WeatherDetails(currentWeather, unitSystem) {
  const {
    main: { feels_like, humidity, pressure },
    wind: { speed },
  } = currentWeather.currentWeather;

  const windSpeed =
    unitSystem === "metric"
      ? `${Math.round(speed)} m/s`
      : `${Math.round(speed)} miles/h`;
  return (
    <View style={WeatherDetails}>
      <View style={styles.WeatherDetailsRow}>
        <View
          style={{
            ...styles.WeatherDetailsBox,
            borderRightWidth: 1,
            borderRightColor: colors.BORDER_COLOR,
          }}
        >
          <View style={styles.WeatherDetailsRow}>
            <FontAwesome5
              name="temperature-low"
              size={25}
              color={colors.PRIMARY_COLOR}
            />
            <View style={styles.WeatherDetailsItems}>
              <Text>Feels_like:</Text>
              <Text style={styles.textSecondary}>{feels_like}</Text>
            </View>
          </View>
        </View>
        <View style={styles.WeatherDetailsBox}>
          <View style={styles.WeatherDetailsRow}>
            <MaterialCommunityIcons
              name="water"
              size={30}
              color={colors.PRIMARY_COLOR}
            />
            <View style={styles.WeatherDetailsItems}>
              <Text>Humidity:</Text>
              <Text style={styles.textSecondary}>{humidity}%</Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          ...styles.WeatherDetailsRow,
          borderTopWidth: 1,
          borderTopColor: colors.BORDER_COLOR,
        }}
      >
        <View
          style={{
            ...styles.WeatherDetailsBox,
            borderRightWidth: 1,
            borderRightColor: colors.BORDER_COLOR,
          }}
        >
          <View style={styles.WeatherDetailsRow}>
            <MaterialCommunityIcons
              name="weather-windy"
              size={30}
              color={colors.PRIMARY_COLOR}
            />
            <View style={styles.WeatherDetailsItems}>
              <Text>Wind Speed:</Text>
              <Text style={styles.textSecondary}>{windSpeed}</Text>
            </View>
          </View>
        </View>
        <View style={styles.WeatherDetailsBox}>
          <View style={styles.WeatherDetailsRow}>
            <MaterialCommunityIcons
              name="speedometer"
              size={30}
              color={colors.PRIMARY_COLOR}
            />
            <View style={styles.WeatherDetailsItems}>
              <Text>Pressure:</Text>
              <Text style={styles.textSecondary}>{pressure} hpa</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  WeatherDetails: {
    marginTop: "auto",
    margin: 15,
    borderWidth: 1,
    borderRadius: colors.BORDER_COLOR,
    borderRadius: 10,
  },
  WeatherDetailsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  WeatherDetailsBox: {
    flex: 1,
    padding: 20,
  },
  WeatherDetailsItems: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  textSecondary: {
    fontSize: 15,
    color: colors.SECONDARY_COLOR,
  },
});
