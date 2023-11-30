import React from 'react'
import { NavigationContainer  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Signin from './Signin';
import Signup from './Signup';


export type RootStackParamList = {
  Loginchoice: undefined,
  Signin: undefined,
  Signup:undefined
};
const Stack = createStackNavigator<RootStackParamList>();

export default function Loginlayout() {
    // const Stack = createNativeStackNavigator();

  return (
     <NavigationContainer >
      <Stack.Navigator initialRouteName='Loginchoice' screenOptions={{
    headerShown: false
  }}>
        <Stack.Screen name="Loginchoice" options={{}} component={Login} />
        <Stack.Screen name="Signin" options={{}} component={Signin} />
        <Stack.Screen name="Signup" options={{}} component={Signup} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}
