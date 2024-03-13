import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Addhospital() {
  return (
    <View style={Styles.container}>
      <Text>Coming Soon</Text>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
