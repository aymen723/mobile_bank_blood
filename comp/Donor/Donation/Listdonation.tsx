import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/Store";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";
import styled from "@emotion/styled";

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
  const [modalVisible, setModalVisible] = useState(false);

  function getdonation() {
    axios
      .get("http://192.168.43.89:8080/api/donor/donations", {
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
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styless.centeredView}>
            <View style={styless.modalView}>
              <Text style={styless.modalText}>Hello World!</Text>
              <Pressable
                style={[styless.button, styless.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styless.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <FlatList
          data={donation}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={Styles.itembox}
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <View style={Styles.item}>
                <View style={Styles.splitpic}>
                  <Text>pic</Text>
                </View>
                <View style={Styles.infosplit}>
                  <View style={Styles.split1}>
                    <View>
                      <Text style={{ color: "grey" }}>Fullname :</Text>
                      <Text style={{ fontWeight: "bold" }}>
                        {item.donor.fullName}
                      </Text>
                    </View>
                    <View>
                      <Text style={{ color: "grey" }}>Date :</Text>
                      <Text style={{ fontWeight: "bold" }}>{item.date}</Text>
                    </View>
                  </View>
                  <View style={Styles.split2}>
                    <View>
                      <Text style={{ color: "grey" }}>Status :</Text>
                      <Text style={{ fontWeight: "bold" }}>{item.status}</Text>
                    </View>
                    <View>
                      <Text style={{ color: "grey" }}>BloodGroup :</Text>
                      <Text style={{ fontWeight: "bold" }}>
                        {item.bloodGroup}
                      </Text>
                    </View>
                    <View>
                      <Text style={{ color: "grey" }}>BloodGroup :</Text>
                      <Text style={{ fontWeight: "bold" }}>
                        {item.donor.district.name}
                      </Text>
                    </View>
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

  itembox: {
    borderColor: "black",
    borderWidth: 1,
    height: 150,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    width: "95%",
    backgroundColor: "white",
    height: "85%",
    borderRadius: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  infosplit: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "red",
    borderWidth: 1,
    width: "75%",
    height: "100%",
    borderRadius: 15,
  },
  split1: {
    width: "30%",
  },
  split2: {
    borderColor: "green",
    borderWidth: 1,
    width: "70%",
  },
  splitpic: {
    borderColor: "green",
    borderWidth: 1,
    width: "25%",
    height: "100%",
    borderRadius: 15,
  },
});

const styless = StyleSheet.create({
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
