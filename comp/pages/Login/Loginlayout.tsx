import React, { useReducer } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
import Signin from "./Signin";
import Signup from "./Signup";
import Home from "../menu/Home";
import * as SecureStore from "expo-secure-store";
import HomeAdmin from "../../Admin/HomeAdmin";
import Homereceiver from "../../Receiver/Homereceiver";
import Homedonor from "../../Donor/Homedonor";
import HomeDoc from "../../Doc/HomeDoc";
import { useSelector } from "react-redux";
import type { RootState } from "../../Store/Store";

export type RootStackParamList = {
  Loginchoice: undefined;
  Signin: undefined;
  Signup: undefined;
  ADMIN: undefined;
  RECEIVER: undefined;
  DONOR: undefined;
  DOCTOR: undefined;
  Guest: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();

export default function Loginlayout() {
  // const [userRole, setUserRole] = React.useState<String | null>(null);
  const userRole = useSelector((state: RootState) => state.role.userRole);

  // React.useEffect(() => {
  //   SecureStore.getItemAsync("role").then((role) => {
  //     setUserRole(role);
  //     console.log(userRole);
  //     console.log("testaaa°");
  //   });
  // }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Loginchoice"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Loginchoice" options={{}} component={Login} />
        <Stack.Screen name="Signin" options={{}} component={Signin} />
        <Stack.Screen name="Signup" options={{}} component={Signup} />
        {userRole === "RECEIVER" ? (
          <Stack.Screen name="RECEIVER" component={Homereceiver} />
        ) : userRole === "DONOR" ? (
          <Stack.Screen name="DONOR" options={{}} component={Homedonor} />
        ) : userRole === "ADMIN" ? (
          <Stack.Screen name="ADMIN" options={{}} component={HomeAdmin} />
        ) : userRole === "DOCTOR" ? (
          <Stack.Screen name="DOCTOR" options={{}} component={HomeDoc} />
        ) : (
          <Stack.Screen name="Guest" options={{}} component={Home} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
