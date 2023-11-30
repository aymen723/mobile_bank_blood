import React from 'react'
import {View , Text, ScrollView, StyleSheet}from 'react-native'
export default function Setting() {
  return (
   
<View style={Styles.container}>
<View style={Styles.title}>
<Text style={Styles.texttitle} >Settings</Text>
</View>
    <ScrollView>
      
      
     
    </ScrollView>
        </View>

  )
}

const Styles = StyleSheet.create({
  container:{
    flex:1,
    borderWidth:1,
    borderColor:"black"
  },
  title:{
    width:"auto",
    height:80,
    borderWidth:1,
    borderColor:"black",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },
  texttitle:{
    fontWeight:"bold",
    fontSize:20,
  }
})
