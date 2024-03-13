import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import { useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "../../Store/Store";
import { user } from "../../Admin/Accounts/Listusers";
import axios from "axios";
import { province, districts } from "../Login/Signin";
export default function Alteruser() {
  const token = useSelector((state: RootState) => state.role.token);
  const [username, setusername] = useState<String | null>(null);
  const [email, setemail] = useState<String | null>(null);
  const [password, setpassword] = useState<String | null>(null);
  const [Provinces, setProvinces] = useState<[province] | []>([]);
  const [districts, setdistricts] = useState<[districts]>();
  const [user, setuser] = useState<user | null>(null);
  function getprofile() {
    axios
      .get("http://25.55.2.213:8080/api/user/profile", {
        headers: {
          Authorization: token as string,
        },
      })
      .then((e) => {
        setuser(e.data);
        console.log(e.data);
      });
  }

  useEffect(() => {
    getprofile();
  }, []);
  return (
    <ScrollView contentContainerStyle={Styles.container}>
      <View style={Styles.Viewinput}>
        <Text>Username :</Text>
        <TextInput
          onChangeText={(e: String) => {
            setusername(e);
          }}
          keyboardType="email-address"
          style={Styles.input}
        ></TextInput>{" "}
      </View>
      <View style={Styles.Viewinput}>
        <Text>Email :</Text>
        <TextInput style={Styles.input}></TextInput>
      </View>
      <View style={Styles.Viewinput}>
        <Text>PhoneNumber :</Text>
        <TextInput style={Styles.input}></TextInput>
      </View>
      <View style={Styles.Viewinput}>
        <Text>Password :</Text>
        <TextInput style={Styles.input}></TextInput>
      </View>
      <View style={Styles.Viewinput}>
        <Text>Username :</Text>
        <TextInput style={Styles.input}></TextInput>
      </View>
    </ScrollView>
  );
}

const Styles = StyleSheet.create({
  container: {
    display: "flex",
  },

  Viewinput: {
    width: "100%",
    height: 120,
    borderColor: "red",
    borderWidth: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  input: {
    width: "85%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "#E5E4E2",
    fontSize: 18,
    padding: 10,
  },
});
