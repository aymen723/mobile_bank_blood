import React from 'react'
import { View , ScrollView,StyleSheet,TextInput,Text ,TouchableOpacity} from 'react-native'

export default function Signin() {
  return (
    <ScrollView contentContainerStyle={styles.scroll}>

<View style={styles.container}>

<View style={styles.boxup}> 
<View style={styles.title}>
    <Text>Create an Account</Text>
</View>
<View style={styles.boxinp}>
    <View style={styles.placeholder}>
    <Text>Username</Text>
    </View>
    <TextInput style={styles.input}></TextInput>
</View>
<View style={styles.boxinp}>
        <View style={styles.placeholder}>
        <Text>Email</Text>
        </View>
    <TextInput style={styles.input}></TextInput>
</View>
<View style={styles.boxinp}>
    <View style={styles.placeholder}>
            <Text>Password</Text>
    </View>
    <TextInput style={styles.input}></TextInput>
</View>
<View style={styles.boxinp}>
    <View style={styles.placeholder}>
    <Text>Rest Password</Text>
    </View>
    <TextInput style={styles.input}></TextInput>
</View>
<View style={styles.boxinp}>
   <TouchableOpacity style={styles.btn}>
        <Text style={{color:"white",fontWeight:"bold"}}>Sing In</Text>
   </TouchableOpacity>
</View>
</View>
<View style={styles.boxdown}> 
<View style={styles.boxinp}>
   <TouchableOpacity style={styles.google}>
        <Text style={{color:"white",fontWeight:"bold"}}>Sing In with Google</Text>
   </TouchableOpacity>
</View>
</View>
    </View>
    </ScrollView>

  )
}


const styles = StyleSheet.create({

    container : {
        flex:1
    },
    scroll:{
        borderWidth:1,
        borderColor:"black",
    },
    boxup:{
        width:"100%",
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"center"    },
    boxdown:{
         flex:0.3
        ,borderWidth:1,
        borderColor:"black",
          display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    boxinp:{
        width:"100%",
        height:90,
        borderWidth:1,
        borderColor:"black",
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
    },
    title:{
        width:"100%",
        height:90,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        fontWeight:"bold"
    },
    btn:{
        width:"85%",
        height:50,
        backgroundColor:"#BF40BF",
        borderRadius:10,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",

    },
      google:{
        width:"85%",
        height:50,
        backgroundColor:"#FF7F7F",
        borderRadius:10,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",

    }
})