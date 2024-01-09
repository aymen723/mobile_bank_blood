import React from "react";
import { View, Text } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Setting from "../pages/menu/Setting";
export default function HomeDoc() {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Settings"
      activeColor="white"
      barStyle={{ backgroundColor: "#FF7F7F" }}
    >
      <Tab.Screen name="Settings" component={Setting} />
    </Tab.Navigator>
  );
}
