import React from 'react'
import Setting from './Setting';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import service from '../donationpage/service';

export default function Home() {

const Tab = createMaterialBottomTabNavigator();

  return (
        <NavigationContainer>

   <Tab.Navigator
      initialRouteName="Service"
      activeColor="white"
      barStyle={{ backgroundColor: '#FF7F7F' }}
    >
      
         <Tab.Screen
        name="Service"
        component={service}
      />

      <Tab.Screen
        name="Setting"
        component={Setting}
      />
      
      </Tab.Navigator>
</NavigationContainer>

  )
}
