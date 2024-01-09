import { createStackNavigator } from "@react-navigation/stack";
import HomeDoc from "./HomeDoc";
import test from "./test";

export type RootStackParamList = {
  HomeD: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function LayoutDoc() {
  return (
    <Stack.Navigator
      initialRouteName="HomeD"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeD" component={test} />
      {/* <Stack.Screen name="HomeD" options={{}} component={HomeDoc} /> */}
    </Stack.Navigator>
  );
}
