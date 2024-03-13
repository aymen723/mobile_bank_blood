import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/Store";
import icon from ".iconprofile.png";
import { RootStackParamList } from "../Layoutadmi";
import { StackNavigationProp } from "@react-navigation/stack";

export interface user {
  bloodGroup: string;
  district: {
    id: number;
    name: string;
    provinceId: number;
  };
  districtId: number;
  email: string;
  fullName: string;
  hospital: string | null;
  hospitalId: number | null;
  id: number;
  isAccountNonLocked: boolean;
  isEnabled: boolean;
  phoneNumber: number | null;
  profilePicUrl: string | null;
  role: string;
}

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "HomeA"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export default function Listusers({ navigation }: Props) {
  const userRole = useSelector((state: RootState) => state.role.userRole);
  const token = useSelector((state: RootState) => state.role.token);
  const [users, setuser] = useState<[user] | null>(null);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getusers("DONOR");
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  function getusers(role: string) {
    console.log(userRole);

    console.log(token);

    axios
      .get("http://25.55.2.213:8080/api/admin/accounts?role=" + role, {
        headers: {
          Authorization: token as string,
        },
      })
      .then((e) => {
        console.log(e.data.content);
        setuser(e.data.content);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <View style={Styles.container}>
      <View style={Styles.header}>
        <View style={Styles.selecter}>
          <TouchableOpacity
            style={Styles.btnlist}
            onPress={() => {
              getusers("DONOR");
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>DONOR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.btnlist}
            onPress={() => {
              getusers("RECEIVER");
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>RECEIVER</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.btnlist}
            onPress={() => {
              getusers("DOCTOR");
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>DOCTOR</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.addbox}>
          <TouchableOpacity
            style={Styles.btnadd}
            onPress={() => {
              navigation.navigate("AddDoctor");
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              Add Doctor +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={Styles.listbox}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            ></RefreshControl>
          }
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={Styles.itemlist}>
              <View style={[Styles.item, Styles.shadowProp]}>
                <View style={Styles.info}>
                  <View style={Styles.infosplit}>
                    <View style={Styles.placeholder}>
                      <Text style={{ color: "grey" }}>Fullname :</Text>
                      <Text style={{ fontWeight: "bold" }}>
                        {item.fullName}
                      </Text>
                    </View>
                    <View style={Styles.placeholder}>
                      <Text style={{ color: "grey" }}>Email :</Text>
                      <Text style={{ fontWeight: "bold" }}>{item.email}</Text>
                    </View>
                  </View>
                  <View style={Styles.infosplit}>
                    <View style={Styles.placeholder}>
                      <Text style={{ color: "grey" }}>Blood Groupe :</Text>
                      <Text style={{ fontWeight: "bold" }}>
                        {item.bloodGroup}
                      </Text>
                    </View>
                    <View style={Styles.placeholder}>
                      <Text style={{ color: "grey" }}>district :</Text>
                      <Text style={{ fontWeight: "bold" }}>
                        {item.district.name}
                      </Text>
                    </View>
                    <View style={Styles.placeholder}>
                      <Text style={{ color: "grey" }}>Phone number :</Text>
                      <Text style={{ fontWeight: "bold" }}>
                        {item.phoneNumber}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={Styles.profilepic}>
                  {item.profilePicUrl == null ? (
                    <Image
                      style={Styles.icon}
                      source={require("../../../assets/iconprofile.png")}
                    />
                  ) : (
                    <Image
                      source={{
                        uri: item.profilePicUrl as string,
                      }}
                    />
                  )}
                </View>
              </View>
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
    borderWidth: 1,
    borderColor: "black",
  },
  header: {
    height: "16%",
    borderWidth: 1,
    borderColor: "black",
    display: "flex",
    flexDirection: "column-reverse",
    justifyContent: "center",
    alignItems: "center",
  },
  selecter: {
    borderWidth: 1,
    borderColor: "black",
    width: "100%",
    height: "50%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  addbox: {
    borderWidth: 1,
    borderColor: "black",
    width: "100%",
    height: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 15,
  },
  btnlist: {
    backgroundColor: "#68B684",
    width: "30%",
    height: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  btnadd: {
    backgroundColor: "#68B684",
    width: 120,
    height: 40,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  listbox: {
    borderColor: "green",
    borderWidth: 2,
    flex: 1,
  },

  itemlist: {
    width: "100%",
    borderColor: "red",
    borderWidth: 2,
    height: 150,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    backgroundColor: "white",
    borderRadius: 30,
    width: "95%",
    height: "85%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row-reverse",
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
  info: {
    width: "75%",
    height: "100%",
    borderColor: "red",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    // borderWidth: 1,
    borderRadius: 30,
  },
  profilepic: {
    width: "25%",
    height: "100%",
    // borderColor: "green",
    // borderWidth: 1,
    borderRadius: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: "65%",
    height: "65%",
  },
  placeholder: {
    // borderColor: "black",
    // borderWidth: 1,
  },
  infosplit: {
    width: "50%",
  },
});
