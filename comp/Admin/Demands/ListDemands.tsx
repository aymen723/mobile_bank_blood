import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
  Modal,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/Store";
import { user } from "../Accounts/Listusers";
import { Picker } from "@react-native-picker/picker";
import { province } from "../../pages/Login/Signin";

interface demands {
  bloodGroup: string | undefined;
  date: string | undefined;
  id: number;
  quantity: number | undefined;
  readIt: boolean | undefined;
  reason: string | undefined;
  receiver: {
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
  receiverId: number | undefined;
  status: string | undefined;
}

export interface suggestion {
  date: string;
  doctor: {
    bloodGroup: string;
    district: { id: number; name: string; provinceId: number };
    districtId: number;
    email: string;
    fullName: string;
    hospital: {
      districtId: number;
      id: number;
      mapHash: string;
      name: string;
      district: { id: number; name: string; provinceId: number };
    };
    hospitalId: number;
    id: number;
    isEnabled: boolean;
    isNonLocked: boolean;
    phoneNumber: number;
    profilePicUrl: string;
    role: string;
  };
}
export default function ListDemands() {
  const [demand, setdemand] = useState<[demands] | []>([]);
  const token = useSelector((state: RootState) => state.role.token);
  const [refreshing, setRefreshing] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [listdoc, setlistdoc] = useState<[user] | []>([]);
  const [objmodal, setobjmodal] = useState<demands | null>(null);
  const [Provinces, setProvinces] = useState<[province] | []>([]);
  const [selectedProvinces, setselectedProvinces] = useState<
    province | undefined
  >(undefined);
  const [selecteddoc, setselecteddoc] = useState<user | []>([]);
  const [suggestion, setsuggestion] = useState<suggestion | undefined>(
    undefined
  );

  function getProvinces() {
    axios.get("http://25.55.2.213:8080/api/general/provinces").then((e) => {
      console.log(e.data);
      setProvinces(e.data);
    });
  }

  function getseg(object: demands) {
    axios
      .get(
        "http://25.55.2.213:8080/api/admin/appointments/suggestion?type=DEMAND&id=" +
          object.id,
        {
          headers: {
            Authorization: token as string,
          },
        }
      )
      .then((e) => {
        console.log(e.data);
        setsuggestion(e.data);
      });
  }
  function getdoctors() {
    axios
      .get("http://25.55.2.213:8080/api/admin/accounts?role=DOCTOR", {
        headers: {
          Authorization: token as string,
        },
      })
      .then((e) => {
        console.log(e.data.content);
        setlistdoc(e.data.content);
      });
  }

  function arrangerdv() {
    const info = {
      doctorId: suggestion?.doctor.id,
      demandId: objmodal?.id,
      date: suggestion?.date,
    };
    axios
      .post("http://25.55.2.213:8080/api/admin/appointments", info)
      .then((e) => {
        console.log(e.data);
      });
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getdemands();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  function getdemands() {
    axios
      .get("http://25.55.2.213:8080/api/admin/demands", {
        headers: {
          Authorization: token as string,
        },
      })
      .then((e) => {
        console.log(e.data.content);
        setdemand(e.data.content);
        console.log("a");
      });
  }

  useEffect(() => {
    getdemands();
  }, []);
  return (
    <View style={Styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          setobjmodal(null);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
                setobjmodal(null);
              }}
              style={styles.btn}
            >
              <Text style={[styles.btntxt, { color: "#ff8fa3" }]}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() => {
              //   setModalVisible(!modalVisible);
              // }}
              style={styles.btn}
            >
              <Text style={[styles.btntxt, { color: "#ff4d6d" }]}>Cancel</Text>
            </TouchableOpacity>
            <View style={styles.assignview}>
              <Text style={[styles.btntxt, { color: "#52b788" }]}>
                Assign Appointment
              </Text>
              <TouchableOpacity
                onPress={() => {
                  getseg(objmodal as demands);
                  arrangerdv();
                }}
                style={styles.btn}
              >
                <Text style={[styles.btntxt, { color: "#52b788" }]}>
                  DO as Suggested
                </Text>
              </TouchableOpacity>
              <View style={styles.splitview}>
                <View style={styles.split}>
                  <View style={styles.center}>
                    <Text style={{ color: "grey" }}>Provinces :</Text>
                    <Picker
                      selectedValue={selectedProvinces}
                      onValueChange={(itemValue, itemIndex) => {
                        setselectedProvinces(itemValue);
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
                  </View>
                  <View style={styles.center}>
                    <Text style={{ color: "grey" }}>Doctor :</Text>
                    <Picker
                      selectedValue={selecteddoc}
                      onValueChange={(itemValue, itemIndex) => {
                        setselecteddoc(itemValue);
                      }}
                      style={styles.splitpicker}
                    >
                      {listdoc.map((item, index) => {
                        return (
                          <Picker.Item
                            key={index}
                            style={{
                              color: "black",
                              fontSize: 15,
                            }}
                            label={item.fullName}
                            value={item}
                          />
                        );
                      })}
                    </Picker>
                  </View>
                </View>
                <View style={styles.split}>
                  <View style={styles.center}>
                    <Text style={{ color: "grey" }}>Time and Date :</Text>
                    <Picker
                      selectedValue={selecteddoc}
                      onValueChange={(itemValue, itemIndex) => {
                        setselecteddoc(itemValue);
                      }}
                      style={styles.splitpicker}
                    >
                      {listdoc.map((item, index) => {
                        return (
                          <Picker.Item
                            key={index}
                            style={{
                              color: "black",
                              fontSize: 15,
                            }}
                            label={item.fullName}
                            value={item}
                          />
                        );
                      })}
                    </Picker>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          ></RefreshControl>
        }
        data={demand}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              getdoctors();
              setobjmodal(item);
              setModalVisible(true);
              getProvinces();
            }}
            style={Styles.itemlist}
          >
            <View style={[Styles.item, Styles.shadowProp]}>
              <View style={Styles.info}>
                <View style={Styles.infosplit}>
                  <View style={Styles.placeholder}>
                    <Text style={{ color: "grey" }}>Fullname :</Text>
                    <Text style={{ fontWeight: "bold" }}>
                      {item.receiver.fullName}
                    </Text>
                  </View>
                  <View style={Styles.placeholder}>
                    <Text style={{ color: "grey" }}>Reason :</Text>
                    <Text style={{ fontWeight: "bold" }}>{item.reason}</Text>
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
                {item.receiver.profilePicUrl == null ? (
                  <Image
                    style={Styles.icon}
                    source={require("../../../assets/iconprofile.png")}
                  />
                ) : (
                  <Image
                    source={{
                      uri: item.receiver.profilePicUrl as string,
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
    // borderColor: "green",
    // borderWidth: 2,
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
  //////////////////////

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    height: "60%",
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    // marginBottom: 15,
    textAlign: "center",
  },
  btn: {
    width: "100%",
    borderWidth: 0.75,
    borderColor: "lightgray",
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    height: 65,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btntxt: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  assignview: {
    // borderWidth: 1,
    width: "100%",
    height: 330,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  splitview: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "black",
    // borderWidth: 1,
    width: "100%",
    height: "100%",
    flexDirection: "row",
  },
  split: {
    width: "50%",
    // borderColor: "black",
    // borderWidth: 1,
    height: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  splitpicker: {
    width: 165,
    backgroundColor: "#E5E4E2",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
