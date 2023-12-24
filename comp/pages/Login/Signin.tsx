import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function Signin() {
  const [username, setusername] = useState<String | null>(null);
  const [email, setemail] = useState<String | null>(null);
  const [password, setpassword] = useState<String | null>(null);

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        <View style={styles.boxup}>
          <View style={styles.title}>
            <Text style={styles.titletxt}>Create an Account</Text>
          </View>
          <View style={styles.boxinp}>
            <View style={styles.placeholder}>
              <Text>Username</Text>
            </View>
            <TextInput
              onChangeText={(e: String) => {
                setusername(e);
                console.log(e);
              }}
              style={styles.input}
            ></TextInput>
          </View>
          <View style={styles.boxinp}>
            <View style={styles.placeholder}>
              <Text>Email</Text>
            </View>
            <TextInput
              keyboardType="email-address"
              onChangeText={(e: String) => {
                setemail(e);
                console.log(e);
              }}
              style={styles.input}
            ></TextInput>
          </View>
          <View style={styles.boxinp}>
            <View style={styles.placeholder}>
              <Text>Password</Text>
            </View>
            <TextInput
              secureTextEntry={true}
              onChangeText={(e: String) => {
                setpassword(e);
                console.log(e);
              }}
              style={styles.input}
            ></TextInput>
          </View>
          <View style={styles.boxinp}>
            <View style={styles.placeholder}>
              <Text>Confirm Password</Text>
            </View>
            <TextInput
              secureTextEntry={true}
              onChangeText={(e: String) => {}}
              style={styles.input}
            ></TextInput>
          </View>
          <View style={styles.boxinp}>
            <View style={styles.placeholder}>
              <Text>Province</Text>
            </View>
            <TextInput
              onChangeText={(e: String) => {}}
              style={styles.input}
            ></TextInput>
          </View>
          <View style={styles.boxinp}>
            <TouchableOpacity style={styles.btn}>
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Sing In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={styles.boxdown}> 
<View style={styles.boxinp}>
   <TouchableOpacity style={styles.google}>
        <Text style={{color:"white",fontWeight:"bold"}}>Sing In with Google</Text>
   </TouchableOpacity>
</View>
</View> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    borderWidth: 1,
    borderColor: "black",
  },
  boxup: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  boxdown: {
    flex: 0.3,
    borderWidth: 1,
    borderColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  boxinp: {
    width: "100%",
    height: 90,
    borderWidth: 1,
    borderColor: "black",
    display: "flex",
    justifyContent: "space-evenly",
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
  title: {
    width: "100%",
    height: 90,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
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
  google: {
    width: "85%",
    height: 50,
    backgroundColor: "#FF7F7F",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  titletxt: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
