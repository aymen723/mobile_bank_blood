import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeAdmin from "./HomeAdmin";

export type RootStackParamList = {
  HomeA: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();

export default function Layoutadmi() {
  return (
    <Stack.Navigator
      initialRouteName="HomeA"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeA" options={{}} component={HomeAdmin} />
    </Stack.Navigator>
  );
}
