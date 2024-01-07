import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/Store";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";

interface donations {
  bloodGroup: string | undefined;
  date: string | undefined;
  donor: {
    bloodGroup: string | undefined;
    district: {
      id: number | undefined;
      name: string | undefined;
      provinceId: number | undefined;
    };
    districtId: number | undefined;
    email: string | undefined;
    fullName: string | undefined;
    hospital: string | undefined;
    hospitalId: number | undefined;
    id: number | undefined;
    isAccountNonLocked: boolean | undefined;
    isEnabled: boolean | undefined;
    phoneNumber: number | undefined;
    profilePicUrl: string | undefined;
    role: string | undefined;
  };
  donorId: number | undefined;
  id: number;
  quantity: number | undefined;
  status: string | undefined;
}

export default function Listdonation() {
  const token = useSelector((state: RootState) => state.role.token);
  const [donation, setdonations] = useState<[donations] | undefined>(undefined);

  function getdonation() {
    axios
      .get("http://192.168.1.38:8080/api/donor/donations", {
        headers: {
          Authorization: token as string,
        },
      })
      .then((e) => {
        console.log(e.data.content);
        setdonations(e.data.content);
      });
  }

  useEffect(() => {
    getdonation();
  }, []);
  return (
    <View style={Styles.container}>
      <View style={Styles.header}></View>
      <View style={Styles.listview}>
        <FlatList
          data={donation}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={Styles.item}>
              <Text>{item.donor.fullName}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.2,
    borderWidth: 1,
    borderColor: "black",
  },
  listview: {
    flex: 0.8,
    borderWidth: 1,
    borderColor: "black",
  },

  item: {
    borderColor: "black",
    borderWidth: 1,
    height: 130,
  },
});
