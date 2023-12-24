import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
export default function Signup() {
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
          <TextInput style={styles.input}></TextInput>
        </View>
        <View style={styles.boxinp}>
          <View style={styles.placeholder}>
            <Text>Username</Text>
          </View>
          <TextInput style={styles.input}></TextInput>
        </View>
      </View>
      <View style={styles.boxdown}>
        <View style={styles.boxinp}>
          <TouchableOpacity style={styles.btn}>
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
