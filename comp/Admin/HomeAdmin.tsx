import React from "react";
import { View, Text } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Listappointments from "./Appointments/Listappointments";
import Listhospitals from "./hospitals/Listhospitals";
import Setting from "../pages/menu/Setting";
import Listusers from "./Accounts/Listusers";
import ListDonations from "./Donations/ListDonations";
import ListDemands from "./Demands/ListDemands";
import Icon from "react-native-vector-icons/Fontisto";
import Icoon from "react-native-vector-icons/FontAwesome5";
export default function HomeAdmin() {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Service"
      // activeColor="white"
      activeColor="black"
      inactiveColor="white"
      barStyle={{ backgroundColor: "#FF7F7F" }}
    >
      <Tab.Screen
        name="appointment"
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="blood-drop" color={"gray"} size={20} />
          ),
        }}
        component={Listappointments}
      />
      <Tab.Screen
        name="Hospitals"
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="hospital" color={"gray"} size={20} />
          ),
        }}
        component={Listhospitals}
      />
      <Tab.Screen
        name="Users"
        options={{
          tabBarIcon: ({ color }) => (
            <Icoon name="user-alt" color={"gray"} size={20} />
          ),
        }}
        component={Listusers}
      />
      <Tab.Screen
        name="Donations"
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="blood-drop" color={"gray"} size={20} />
          ),
        }}
        component={ListDonations}
      />
      <Tab.Screen
        name="Demands"
        options={{
          tabBarIcon: ({ color }) => (
            <Icoon name="hospital-user" color={"gray"} size={20} />
          ),
        }}
        component={ListDemands}
      />
      <Tab.Screen
        name="Settings"
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="player-settings" color={"gray"} size={20} />
          ),
        }}
        component={Setting}
      />
    </Tab.Navigator>
  );
}
