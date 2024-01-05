import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Login from "./comp/pages/Login/Login";
import Signin from "./comp/pages/Login/Signin";
import Applayout from "./comp/Applayout";
import { Provider } from "react-redux";
import { store } from "./comp/Store/Store";
export default function App() {
  return (
    <Provider store={store}>
      <Applayout></Applayout>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
});
