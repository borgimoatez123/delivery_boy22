import React, { useState, useCallback, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import { UserReversedGeoCode } from './app/context/UserReversedGeoCode';
import { UserLocationContext } from './app/context/UserLocationContext';
import * as Location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './app/Navigations/TabNavigation';
import Profile from './app/Screens/Login';
import { createStackNavigator } from '@react-navigation/stack';
import Map from './app/Components/Map';
import { AddressProvider } from './app/context/AddressContext';
import LoginScreen from './app/Screens/Login';
const Stack = createStackNavigator();


export default function App() {
  const [location, setLocation] = useState(null);

  const [address, setAddress] = useState(null);

  const [error, setErrorMsg] = useState(null);
  const defaultAddresss = { "city": "Beja", "country": "tunisia", "district": "Pudong", "isoCountryCode": "CN", "name": "33 islaib", "postalCode": "94108", "region": "SH", "street": "z3ma", "streetNumber": "1", "subregion": "tunisia County", "timezone": "America/Los_Angeles" }


  useEffect(() => {
    (async () => {
     setAddress(defaultAddresss);

    let {status} = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted'){
      setErrorMsg('Permission to access location as denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location)
    console.log('this ',location)

    })();
  }, [])


  return (
    <UserLocationContext.Provider value={{ location, setLocation }}>
        <UserReversedGeoCode.Provider value={{ address, setAddress }}>
  
    
      <SafeAreaView style={styles.container}>
        <StatusBar hidden/>
     <AddressProvider>
          <NavigationContainer>
          <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen name="LoginScreen" component={LoginScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="Screen1" component={TabNavigation}  options={{ headerShown: false }}/>
        <Stack.Screen name="Screen2" component={Profile}  options={{ headerShown: false }}/>
        <Stack.Screen name="Map" component={Map}  options={{ headerShown: false }}/>
        </Stack.Navigator>
       
      </NavigationContainer>
          </AddressProvider>
        
      </SafeAreaView>
   

    </UserReversedGeoCode.Provider>
    </UserLocationContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
});
