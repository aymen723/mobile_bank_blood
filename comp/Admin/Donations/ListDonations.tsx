import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  RefreshControl,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/Store";

interface Donation {
  bloodGroup: string;
  date: string;
  donor: {
    bloodGroup: string;
    district: {
      id: number;
      name: string;
      provinceId: number;
    };
    districtId: number;
    email: string;
    fullName: string;
    hospital: string;
    hospitalId: number;
    id: number;
    isAccountNonLocked: boolean;
    isEnabled: boolean;
    phoneNumber: number;
    profilePicUrl: string;
    role: string;
  };
  donorId: number;
  id: number;
  quantity: number;
  status: string;
}
export default function ListDonations() {
  const token = useSelector((state: RootState) => state.role.token);
  const [donations, setdonations] = useState<[Donation] | []>([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getDonations();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  function getDonations() {
    axios
      .get("http://25.55.2.213:8080/api/admin/donations", {
        headers: {
          Authorization: token as string,
        },
      })
      .then((e) => {
        console.log(e.data.content);
        setdonations(e.data.content);
        console.log("a");
      });
  }
  useEffect(() => {
    getDonations();
  }, []);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      ></Modal>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          ></RefreshControl>
        }
        data={donations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={Styles.itemlist}>
            <View style={[Styles.item, Styles.shadowProp]}>
              <View style={Styles.info}>
                <View style={Styles.infosplit}>
                  <View style={Styles.placeholder}>
                    <Text style={{ color: "grey" }}>Fullname :</Text>
                    <Text style={{ fontWeight: "bold" }}>
                      {item.donor.fullName}
                    </Text>
                  </View>
                  <View style={Styles.placeholder}>
                    <Text style={{ color: "grey" }}>Status :</Text>
                    <Text style={{ fontWeight: "bold" }}>{item.status}</Text>
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
                    <Text style={{ color: "grey" }}>Quantity :</Text>
                    <Text style={{ fontWeight: "bold" }}>{item.quantity}</Text>
                  </View>
                  <View style={Styles.placeholder}>
                    <Text style={{ color: "grey" }}>Date :</Text>
                    <Text style={{ fontWeight: "bold" }}>{item.date}</Text>
                  </View>
                </View>
              </View>
              <View style={Styles.profilepic}>
                {item.donor.profilePicUrl == null ? (
                  <Image
                    style={Styles.icon}
                    source={require("../../../assets/Donor.jpg")}
                  />
                ) : (
                  <Image
                    source={{
                      uri: item.donor.profilePicUrl as string,
                    }}
                  />
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: "black",
  },
  header: {
    height: "16%",
    // borderWidth: 1,
    // borderColor: "black",
    display: "flex",
    flexDirection: "column-reverse",
    justifyContent: "center",
    alignItems: "center",
  },
  selecter: {
    // borderWidth: 1,
    // borderColor: "black",
    width: "100%",
    height: "50%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  addbox: {
    // borderWidth: 1,
    // borderColor: "black",
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
    // borderColor: "red",
    // borderWidth: 2,
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
