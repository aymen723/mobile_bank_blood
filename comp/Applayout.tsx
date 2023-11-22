import React from 'react'
import { View,Text,SafeAreaView,StyleSheet } from 'react-native'
import Signin from './pages/Login/Signin'
import Home from './pages/menu/Home'



export default function Applayout() {
  return (
<SafeAreaView style={styles.container}>
      <Home></Home>
</SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
     flex: 1,
    marginTop:30
  }
})
