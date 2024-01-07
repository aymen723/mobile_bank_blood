import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/Store";
import Icon from "react-native-vector-icons/Feather";
import Iconn from "react-native-vector-icons/Fontisto";
import Icoon from "react-native-vector-icons/MaterialIcons";
import styled from "@emotion/styled";
import { RootStackParamList } from "../Login/Loginlayout";
import { StackNavigationProp } from "@react-navigation/stack";
type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Loginchoice"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};
interface user {
  bloodGroup: string;
  district: {
    id: number;
    name: string | null;
    provinceId: number;
  } | null;
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

export default function Setting({ navigation }: Props) {
  const token = useSelector((state: RootState) => state.role.token);
  const [user, setuser] = useState<user | null>(null);

  function signout() {
    navigation.push("Loginchoice");
  }

  function getprofile() {
    axios
      .get("http://192.168.1.38:8080/api/user/profile", {
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
    console.log(token);
  }, []);

  return (
    <ScrollView>
      <View style={Styles.profilepic}>
        <View style={Styles.pic}>
          <Icon name="user" style={{ fontSize: 50, color: "red" }} />
        </View>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {user?.fullName}
        </Text>
      </View>
      <View style={Styles.infos}>
        <View style={Styles.boxtitles}>
          <Text style={[Styles.txt, { fontSize: 18, color: "black" }]}>
            Personal Information
          </Text>
        </View>
        <View style={Styles.infoarea}>
          <TouchableOpacity style={Styles.btn}>
            <View style={Styles.headerinfo}>
              <Iconn name="email" style={[Styles.txt, { fontSize: 25 }]} />
              <Text style={Styles.txt}>Email</Text>
            </View>
            <Text>{user?.email}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.btn}>
            <View style={Styles.headerinfo}>
              <Iconn name="phone" style={[Styles.txt, { fontSize: 25 }]} />
              <Text style={Styles.txt}>Phone</Text>
            </View>
            <Text>{user?.phoneNumber}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.btn}>
            <View style={Styles.headerinfo}>
              <Iconn name="hospital" style={[Styles.txt, { fontSize: 25 }]} />
              <Text style={Styles.txt}>Hospital</Text>
            </View>
            <Text>{user?.hospital}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.btn}>
            <View style={Styles.headerinfo}>
              <Icoon name="gps-fixed" style={[Styles.txt, { fontSize: 25 }]} />
              <Text style={Styles.txt}>district</Text>
            </View>
            <Text>{user?.district?.name}</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.boxtitles}>
          <Text style={[Styles.txt, { fontSize: 18, color: "black" }]}>
            Utilities
          </Text>
        </View>
        <View style={Styles.boxarea}>
          <TouchableOpacity style={Styles.btn}>
            <View style={Styles.headerinfo}>
              <Text style={Styles.txt}>Sign Out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const Styles = StyleSheet.create({
  profilepic: {
    height: 200,
    borderWidth: 1,
    borderColor: "red",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  pic: {
    width: 100,
    height: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 50,
  },
  infoarea: {
    width: "85%",
    height: 300,
    backgroundColor: "white",
    borderRadius: 15,
  },
  infos: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 30,
  },
  boxarea: {
    width: "85%",
    height: 200,
    backgroundColor: "white",
    borderRadius: 15,
  },
  boxtitles: {
    borderColor: "red",
    // borderWidth: 1,
    width: "85%",
    height: 50,
    display: "flex",
    justifyContent: "center",
  },
  btn: {
    borderWidth: 0.75,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderColor: "lightgray",
    height: 60,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingRight: 10,
  },
  headerinfo: {
    borderColor: "white",
    borderWidth: 1,
    width: 120,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  txt: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
  },
});
