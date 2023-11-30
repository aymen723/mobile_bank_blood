import React from 'react'
import { View,Text,SafeAreaView,StyleSheet } from 'react-native'

import Loginlayout from './pages/Login/Loginlayout'



export default function Applayout() {
  return (
<SafeAreaView style={styles.container}>
      <Loginlayout></Loginlayout>
</SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
     flex: 1,
    marginTop:30
  }
})
