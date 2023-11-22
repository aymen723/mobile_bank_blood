import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,SafeAreaView} from 'react-native';
import Login from './comp/pages/Login/Login';
import Signin from './comp/pages/Login/Signin';
import Applayout from './comp/Applayout';
export default function App() {
  return (
    <Applayout></Applayout>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:30
   
  },
});
