import React from "react";
import { View, Text } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Listappointments from "./Appointments/Listappointments";
import Listhospitals from "./hospitals/Listhospitals";
import Setting from "../pages/menu/Setting";
import Listusers from "./Accounts/Listusers";
export default function HomeAdmin() {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Service"
      activeColor="white"
      barStyle={{ backgroundColor: "#FF7F7F" }}
    >
      <Tab.Screen name="Appointments" component={Listappointments} />
      <Tab.Screen name="Hospitals" component={Listhospitals} />
      <Tab.Screen name="Users" component={Listusers} />
      <Tab.Screen name="Settings" component={Setting} />
    </Tab.Navigator>
  );
}
