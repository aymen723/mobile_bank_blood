import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeAdmin from "./HomeAdmin";
import Adddoctor from "./Accounts/Adddoctor";
import Addhospital from "./hospitals/Addhospital";
import Alteruser from "../pages/menu/Alteruser";

export type RootStackParamList = {
  HomeA: undefined;
  AddDoctor: undefined;
  AddHospital: undefined;
  Alter: undefined;
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
      <Stack.Screen
        name="AddDoctor"
        options={{ headerShown: true }}
        component={Adddoctor}
      />
      <Stack.Screen
        name="AddHospital"
        options={{ headerShown: true }}
        component={Addhospital}
      />
      <Stack.Screen
        name="Alter"
        options={{ headerShown: true }}
        component={Alteruser}
      />
    </Stack.Navigator>
  );
}
