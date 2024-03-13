import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/Store";
import { user } from "../Accounts/Listusers";

interface appointment {
  date: string | undefined;
  demandData: string | undefined;
  demandId: number;
  doctorData: user | undefined;
  doctorId: number;
  donationData: {
    date: string;
    donorData: string;
    donorId: number;
    id: number;
    quantity: number;
    status: string;
  };
  donationId: number;
  id: number;
  patientData: user | undefined;
  patientId: number;
  reason: string | undefined;
  status: string | undefined;
  validated: boolean;
}

export default function Listappointments() {
  const [selectedblood, setselectedblood] = useState<appointment | undefined>();
  const token = useSelector((state: RootState) => state.role.token);

  function getappointments() {
    axios
      .get("http://25.55.2.213:8080/api/admin/appointments", {
        headers: {
          Authorization: token as string,
        },
      })
      .then((e) => {
        console.log(e.data);
        setselectedblood(e.data.content);
        console.log("aa");
      });
  }

  useEffect(() => {
    getappointments();
  }, []);

  return <View></View>;
}
