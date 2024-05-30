import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Button, Dimensions, Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import Home from '../Screens/Home'
import Profile from '../Screens/Login'
import Appointment from '../Screens/Appointment'
import Ready from '../Screens/Ready'
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
const Tab=createBottomTabNavigator()

export default function TabNavigation () {

    
    
    return (
      <Tab.Navigator screenOptions={{headerShow:false}}>
        <Tab.Screen name='new orders ' component={Home}
        options={{tabBarIcon:({color,size})=>(
          <FontAwesome name="list-alt" size={24} color="black" />)
    }}
        />
        

        <Tab.Screen name='Ready for delivery ' component={Ready}
        options={{tabBarIcon:({color,size})=>(
          <FontAwesome5 name="motorcycle" size={24} color="black" />)
    }}
        />

        <Tab.Screen name='Profile' component={Appointment}
        options={{tabBarIcon:({color,size})=>(
          <Entypo name="user" size={size} color={color} />)
        }}
        />
       
      </Tab.Navigator>
    )
  }
  