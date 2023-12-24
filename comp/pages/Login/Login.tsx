import React from 'react'
import { View ,Text ,StyleSheet, TouchableOpacity,Image, SafeAreaView} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './Loginlayout';


type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Loginchoice'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export default function Login({navigation}:Props) {
  return(

    <View style={styles.container}>
    <View style={styles.boxup}> 
          <Image 
   resizeMode={'center'} source={require("../../../assets/logo.png")} style={styles.logo} ></Image>
    </View>
    <View style={styles.box}>
        <View style={styles.boxbtn}>
                  <TouchableOpacity onPress={()=>{
                    navigation.push("home")

                  }}  style={styles.btnin}><Text style={styles.textin}>home</Text></TouchableOpacity>
      </View>
      <View style={styles.boxbtn}>
                  <TouchableOpacity onPress={()=>{
                    navigation.push("Signin")

                  }}  style={styles.btnin}><Text style={styles.textin}>Sign In</Text></TouchableOpacity>
      </View>
      <View style={styles.boxbtn}>
                  <TouchableOpacity  style={styles.btn} onPress={()=>{
                    navigation.push("Signup")

                  }} ><Text style={styles.text}>Sign Up</Text></TouchableOpacity>
      </View>

    </View>
    </View>

  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"white",
    //   borderWidth:1,
    // borderColor:"black",
    

  },
  boxup:{
    width:"100%",
    height:"70%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },
  box:{
    width:"100%",
    height:"30%",
    display:"flex",
    justifyContent:"space-evenly",
    alignItems:"center",
    
  
  },
  boxbtn:{

    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    width:"100%",
    height:60
  },
  btn:{
    borderWidth:2,
    borderColor:"#c91c1c",
    display:"flex",
    backgroundColor:"#c91c1c",
    justifyContent:"center",
    alignItems:"center",
    width:"85%",
    height:50,
    borderRadius:20,    
  },
  btnin:{
     borderWidth:2,
    borderColor:"#c91c1c",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    width:"85%",
    height:50,
    borderRadius:20,  
  },
  textin:{
     color:"#c91c1c",
    fontWeight:"bold",
    fontSize:17
  },
  text:{
    color:"#f2f2f2",
    fontWeight:"bold",
    fontSize:17
  }
  ,logo:{
    width:200,
    height:200
  }
}); 

