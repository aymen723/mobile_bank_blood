import React from 'react'
import { View , Text , StyleSheet, TextInput} from 'react-native'



export default function Input() {


  return (
    <View style={styles.boxinp}>
    <View style={styles.placeholder}>
    <Text>Username</Text>
    </View>
    <TextInput style={styles.input}></TextInput>
</View>
  )
}

const styles = StyleSheet.create({
      boxinp:{
        width:"100%",
        height:90,

        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    input:{
        width:"85%",
        height:40,
        borderRadius:10,
        backgroundColor:"#f2f2f2"
    },
    placeholder:{
        width:"85%",
    }

})