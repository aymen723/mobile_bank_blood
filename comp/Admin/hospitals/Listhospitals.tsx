import styled from "@emotion/styled";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/Store";
import Icon from "react-native-vector-icons/FontAwesome5";
import { RootStackParamList } from "../Layoutadmi";
import { StackNavigationProp } from "@react-navigation/stack";
export interface hospital {
  district: {
    id: number;
    name: string;
    provinceId: number;
  };
  districtId: number;
  id: number;
  mapHash: string | undefined;
  name: string;
}

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "HomeA"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};
export default function Listhospitals({ navigation }: Props) {
  const token = useSelector((state: RootState) => state.role.token);
  const [hospitals, sethospitals] = useState<[hospital] | null>(null);

  function gethospitals() {
    axios
      .get("http://25.55.2.213:8080/api/admin/hospitals", {
        headers: {
          Authorization: token as string,
        },
      })
      .then((e) => {
        console.log(e.data);
        sethospitals(e.data);
      });
  }
  useEffect(() => {
    gethospitals();
  }, []);
  return (
    <View style={Styles.container}>
      <View style={Styles.searchbox}>
        <TextInput style={Styles.inp}></TextInput>
        <TouchableOpacity
          onPress={() => {
            navigation.push("AddHospital");
          }}
          style={Styles.addbtn}
        >
          <Icon style={{ color: "white", fontSize: 25 }} name="plus" />
        </TouchableOpacity>
      </View>
      <View style={Styles.listbox}>
        <FlatList
          data={hospitals}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={[Styles.listitem]}>
              <View style={[Styles.item, Styles.shadowProp]}>
                <View style={Styles.logo}>
                  <Icon
                    style={{ color: "#68B684", fontSize: 60 }}
                    name="hospital"
                  />
                </View>
                <View style={Styles.split}>
                  <View>
                    <Text style={{ color: "grey" }}>name :</Text>
                    <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                  </View>
                  <View>
                    <Text style={{ color: "grey" }}>District :</Text>
                    <Text style={{ fontWeight: "bold" }}>
                      {item.district.name}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "Black",
    borderWidth: 1,
  },
  searchbox: {
    flex: 0.15,
    borderColor: "Black",
    borderWidth: 1,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  listbox: {
    flex: 0.85,
    borderColor: "Black",
    borderWidth: 1,
  },
  inp: {
    backgroundColor: "lightgray",
    width: "80%",
    borderRadius: 15,
    height: 45,
  },
  addbtn: {
    backgroundColor: "#68B684",
    width: 50,
    height: 50,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  listitem: {
    borderWidth: 1,
    borderColor: "red",
    height: 130,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    width: "95%",
    backgroundColor: "white",
    height: "80%",
    borderRadius: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  split: {
    width: "75%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  logo: {
    width: "25%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
