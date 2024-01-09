import axios from "axios";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { color } from "@rneui/base";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./Loginlayout";

interface province {
  id: number;
  number: number;
  name: string;
  districts: [
    {
      id: number;
      provinceId: number;
      name: string;
    }
  ];
}
interface districts {
  id: number;
  provinceId: number;
  name: string;
}

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Loginchoice"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export default function Signin({ navigation }: Props) {
  const [username, setusername] = useState<String | null>(null);
  const [email, setemail] = useState<String | null>(null);
  const [password, setpassword] = useState<String | null>(null);
  const [Provinces, setProvinces] = useState<[province] | []>([]);
  const [districts, setdistricts] = useState<[districts]>();
  const [selecteddistrict, setselecteddistricts] = useState<
    districts | undefined
  >(undefined);
  const [selectedProvinces, setselectedProvinces] = useState<
    province | undefined
  >(undefined);
  const [selectedblood, setselectedblood] = useState<string | undefined>();

  const bloodgroupes = [
    {
      value: "A_MINUS",
      label: "A -",
    },
    {
      value: "A_PLUS",
      label: "A +",
    },
    {
      value: "O_MINUS",
      label: "O -",
    },
    {
      value: "O_PLUS",
      label: "O +",
    },
    {
      value: "B_MINUS",
      label: "B -",
    },
    {
      value: "B_PLUS",
      label: "B +",
    },
    {
      value: "AB_PLUS",
      label: "AB +",
    },
    {
      value: "AB_MINUS",
      label: "AB -",
    },
  ];

  function getProvinces() {
    axios.get("http://192.168.1.36:8080/api/general/provinces").then((e) => {
      console.log(e.data);
      setProvinces(e.data);
    });
  }

  function createuser() {
    const user = {
      email: email,

      password: password,
      role: "RECEIVER", // can only be either RECEIVER or DONOR
      fullName: username,
      phoneNumber: "0559679320",

      district: selecteddistrict?.provinceId,

      bloodGroup: selectedblood,
    };

    console.log(user);

    axios
      .post("http://192.168.1.36:8080/api/general/sign-up", user)
      .then((e) => {
        console.log(e.data);
        navigation.push("Signup");
      })
      .catch((e) => {
        console.error(e.request._response);
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
            <Text style={styles.titletxt}>LifeNectar</Text>
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
              <Text style={styles.placeholdertxt}>Province / Districts</Text>
            </View>
            <View
              style={{
                width: 350,
                height: 50,
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Picker
                selectedValue={selectedProvinces}
                onValueChange={(itemValue, itemIndex) => {
                  setselectedProvinces(itemValue);
                  setdistricts(itemValue.districts);
                }}
                style={styles.splitpicker}
              >
                {Provinces.map((item, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      style={{
                        color: "black",
                        fontSize: 15,
                      }}
                      label={item.name}
                      value={item}
                    />
                  );
                })}
              </Picker>
              <Picker
                selectedValue={selecteddistrict}
                onValueChange={(itemValue, itemIndex) =>
                  setselecteddistricts(itemValue)
                }
                style={styles.splitpicker}
              >
                {districts?.map((item, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      style={{
                        color: "black",
                        fontSize: 15,
                      }}
                      label={item.name}
                      value={item}
                    />
                  );
                })}
              </Picker>
            </View>
          </View>
          <View style={styles.boxinp}>
            <View style={styles.placeholder}>
              <Text style={styles.placeholdertxt}>BloodGroup</Text>
            </View>
            <View>
              <Picker
                selectedValue={selectedblood}
                onValueChange={(itemValue, itemIndex) =>
                  setselectedblood(itemValue)
                }
                style={styles.picker}
              >
                {bloodgroupes.map((item, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      style={{
                        color: "black",
                        fontSize: 15,
                      }}
                      label={item.label}
                      value={item.value}
                    />
                  );
                })}
              </Picker>
            </View>
          </View>
          <View style={styles.boxinp}>
            <TouchableOpacity
              onPress={() => {
                createuser();
              }}
              style={styles.btn}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Sing In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
    // display: "flex",
    // justifyContent: "flex-start",
    // alignItems: "center",
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
  picker: {
    width: 330,
    height: "50%",
    backgroundColor: "#E5E4E2",
  },
  splitpicker: {
    width: 165,
    backgroundColor: "#E5E4E2",
  },
});
