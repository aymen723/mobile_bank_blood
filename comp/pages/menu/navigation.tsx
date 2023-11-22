import React from 'react'
import { View , Text } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Setting from './Setting';
import { NavigationContainer } from '@react-navigation/native';
import service from '../donationpage/service';

export default function navigation() {
    const Tab = createMaterialBottomTabNavigator();

  return (
   
    <NavigationContainer>

    <Tab.Navigator
      initialRouteName="Setting"
      activeColor="#e91e63"
      barStyle={{ backgroundColor: 'tomato' }}
    >
      <Tab.Screen
        name="Setting"
        component={Setting}
      />
       <Tab.Screen
        name="Service"
        component={service}
      />
      </Tab.Navigator>
          </NavigationContainer>

  )
}
