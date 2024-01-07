import React from "react";
import { View, Text } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Setting from "../pages/menu/Setting";
import Listdonation from "./Donation/Listdonation";

const Tab = createMaterialBottomTabNavigator();

export default function Homedonor() {
  return (
    <Tab.Navigator
      initialRouteName="Service"
      activeColor="white"
      barStyle={{ backgroundColor: "#FF7F7F" }}
    >
      <Tab.Screen name="Donations" component={Listdonation} />
      <Tab.Screen name="Settings" component={Setting} />
    </Tab.Navigator>
  );
}
