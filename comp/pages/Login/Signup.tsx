import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { RootStackParamList } from "./Loginlayout";
import { StackNavigationProp } from "@react-navigation/stack";

interface result {
  role: String;
  token: String;
}
type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Loginchoice"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};
export default function Signup({ navigation }: Props) {
  const [username, setusername] = useState<null | String>(null);
  const [password, setpassword] = useState<null | String>(null);
  const [res, setres] = useState<null | result>(null);

  function login() {
    let body = {
      username: username,
      password: password,
    };
    axios.post("http://192.168.1.40:8080/login", body).then(async (e) => {
      console.log(e.data.role);
      setres(e.data.role);
      await SecureStore.setItemAsync("role", e.data.role);
      navigation.push(e.data.role);
    });
  }
  return (
    // <ScrollView contentContainerStyle={styles.Scroll}>
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titletxt}>Login</Text>
      </View>
      <View style={styles.boxup}>
        <View style={styles.boxinp}>
          <View style={styles.placeholder}>
            <Text>Username</Text>
          </View>
          <TextInput
            onChangeText={(e: String) => {
              setusername(e);
            }}
            keyboardType="email-address"
            style={styles.input}
          ></TextInput>
        </View>
        <View style={styles.boxinp}>
          <View style={styles.placeholder}>
            <Text>Password</Text>
          </View>
          <TextInput
            onChangeText={(e: String) => {
              setpassword(e);
            }}
            secureTextEntry={true}
            style={styles.input}
          ></TextInput>
        </View>
      </View>
      <View style={styles.boxdown}>
        <View style={styles.boxinp}>
          <TouchableOpacity onPress={login} style={styles.btn}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Scroll: {
    borderWidth: 1,
    borderColor: "black",
  },
  container: {
    backgroundColor: "white",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    width: "100%",
    height: 90,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  },
  boxinp: {
    width: "100%",
    height: 90,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "85%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "#E5E4E2",
    fontSize: 18,
    padding: 10,
  },
  placeholder: {
    width: "85%",
  },
  btn: {
    width: "85%",
    height: 50,
    backgroundColor: "#BF40BF",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  titletxt: {
    fontSize: 30,
    fontWeight: "bold",
  },
  boxdown: {
    width: "100%",
    flex: 0.3,
  },
  boxup: {
    width: "100%",
    backgroundColor: "white",
    height: 200,
  },
});
