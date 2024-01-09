import React from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function Listappointments() {
  const [selectedblood, setselectedblood] = React.useState();

  return (
    <View>
      <Text>testapp</Text>
      <Picker
        selectedValue={selectedblood}
        onValueChange={(itemValue, itemIndex) => console.log(itemValue)}
      >
        <Picker.Item
          style={{ color: "black", fontSize: 15 }}
          label="Java"
          value="java"
        />
        <Picker.Item
          style={{ color: "black", fontSize: 15 }}
          label="test"
          value="test"
        />
      </Picker>
    </View>
  );
}
