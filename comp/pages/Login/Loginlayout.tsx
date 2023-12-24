import React , {useReducer} from 'react'
import { NavigationContainer  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Signin from './Signin';
import Signup from './Signup';
import Home from '../menu/Home';

// type AppActions = Increment | Random;
// type Increment = { type: 'increment'; payload: number };
// type Random = { type: 'random' };

export type RootStackParamList = {
  Loginchoice: undefined,
  Signin: undefined,
  Signup:undefined,
  home:undefined
};
const Stack = createStackNavigator<RootStackParamList>();

export default function Loginlayout() {
    // const Stack = createNativeStackNavigator();
  // const [state, dispatch] = useReducer(reducer, initialState);

  return (
     <NavigationContainer >
      <Stack.Navigator initialRouteName='Loginchoice' screenOptions={{
    headerShown: false
  }}>
        <Stack.Screen name="Loginchoice" options={{}} component={Login} />
        <Stack.Screen name="Signin" options={{}} component={Signin} />
        <Stack.Screen name="Signup" options={{}} component={Signup} />
        <Stack.Screen name="home" options={{}}   component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


// function reducer(state : , action :AppActions) {
//     const { type, payload } = action;
//   switch (type) {
//     case 'incremented_age': {
//       return {
//         name: state.name,
//         age: state.age + 1
//       };
//     }
//     case 'changed_name': {
//       return {
//         name: action.nextName,
//         age: state.age
//       };
//     }
//   }
//   throw Error('Unknown action: ' + action.type);
// }