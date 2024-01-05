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

interface user {
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

export default function Listusers() {
  const userRole = useSelector((state: RootState) => state.role.userRole);
  const token = useSelector((state: RootState) => state.role.token);
  const [users, setuser] = useState<[user] | null>(null);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  function getusers(role: string) {
    console.log(userRole);
    console.log(token);
    axios
      .get("http://192.168.1.38:8080/api/admin/accounts?role=" + role, {
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
            <Text>DONOR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.btnlist}
            onPress={() => {
              getusers("RECEIVER");
            }}
          >
            <Text>RECEIVER</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.btnlist}
            onPress={() => {
              getusers("DOCTOR");
            }}
          >
            <Text>DOCTOR</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.addbox}>
          <TouchableOpacity style={Styles.btnadd} onPress={() => {}}>
            <Text>Add Doctor</Text>
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
                  <Text>{item?.phoneNumber}</Text>
                  <Text>{item.bloodGroup}</Text>
                  <Text>{item.fullName}</Text>
                  <Text>{item.email}</Text>
                  <Text>{item.district.name}</Text>
                  <Text>{item.role}</Text>
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
  },
  btnlist: {
    // borderWidth: 1,
    // borderColor: "red",
    backgroundColor: "#68B684",
    width: "30%",
    height: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  btnadd: {
    borderWidth: 1,
    borderColor: "red",
    width: 45,
    height: 45,
    borderRadius: 50,
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
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  info: {
    width: "75%",
    height: "100%",
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 30,
  },
  profilepic: {
    width: "25%",
    height: "100%",
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: "65%",
    height: "65%",
  },
});
