import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Homedonor from "./Homedonor";
export type RootStackParamList = {
  homed: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();

export default function Layoutdonor() {
  return (
    <Stack.Navigator
      initialRouteName="homed"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="homed" options={{}} component={Homedonor} />
    </Stack.Navigator>
  );
}
