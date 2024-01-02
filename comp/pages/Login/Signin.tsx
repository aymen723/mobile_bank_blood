import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";

interface province {
  id: number;
  number: number;
  name: String;
  districts: {
    id: number;
    provinceId: number;
    name: String;
  };
}

export default function Signin() {
  const [username, setusername] = useState<String | null>(null);
  const [email, setemail] = useState<String | null>(null);
  const [password, setpassword] = useState<String | null>(null);
  const [Provinces, setProvinces] = useState([]);
  const countries = ["Egypt", "Canada", "Australia", "Ireland"];

  function getProvinces() {
    axios.get("http://192.168.1.40:8080/api/general/provinces").then((e) => {
      console.log(e.data);
      setProvinces(e.data);
    });
  }

  useEffect(() => {
    getProvinces();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        <View style={styles.boxup}>
          <View style={styles.title}>
            <Text style={styles.titletxt}>Create an Account</Text>
          </View>
          <View style={styles.boxinp}>
            <View style={styles.placeholder}>
              <Text style={styles.placeholdertxt}>Username</Text>
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
              <Text style={styles.placeholdertxt}>Email</Text>
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
              <Text style={styles.placeholdertxt}>Password</Text>
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
              <Text style={styles.placeholdertxt}>Confirm Password</Text>
            </View>
            <TextInput
              secureTextEntry={true}
              onChangeText={(e: String) => {}}
              style={styles.input}
            ></TextInput>
          </View>
          <View style={styles.boxinp}>
            <View style={styles.placeholder}>
              <Text style={styles.placeholdertxt}>Province</Text>
            </View>
            <TextInput
              onChangeText={(e: String) => {}}
              style={styles.input}
            ></TextInput>
          </View>
          <View style={styles.boxinp}>
            <View style={styles.placeholder}>
              <Text style={styles.placeholdertxt}>BloodGroup</Text>
            </View>
            <SelectDropdown
              data={countries}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
            />
          </View>
          <View style={styles.boxinp}>
            <TouchableOpacity onPress={getProvinces} style={styles.btn}>
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
    // fontFamily: "OpenSans-Bold",
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
  placeholdertxt: {
    fontWeight: "bold",
  },
});
