import React from "react";
import { View, StyleSheet, Platform, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

function UnitPicker({ unitSystem, setUnit }) {
  return (
    <View style={styles.unitSystem}>
      <Picker
        selectedValue={unitSystem}
        onValueChange={(item) => setUnit(item)}
        mode="dropdown"
        itemStyle={{ fonntSize: 12 }}
      >
        <Picker.item label="C" value="metric" />
        <Picker.item label="F" value="imperial" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  unitSystem: {
    position: "absolute",
    ...Platform.select({
      ios: {
        top: -20,
      },
      android: {
        top: 30,
      },
    }),
    left: 20,
    height: 50,
    width: 100,
  },
});

export default UnitPicker;
