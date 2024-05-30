import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { address } from '../constants/uidata';
import { useRoute } from '@react-navigation/native';

const Map = () => {
  
  const route = useRoute();
  const currentAddress = route.params.address; 
console.log('jhgjg',currentAddress) // This should log the array of addresses
const matchingAddress =address.find(addr => addr.title.toLowerCase().trim() === currentAddress.toLowerCase().trim());

  // Find matching address from uidata

  const handleOpenGoogleMaps = () => {
    if (matchingAddress) {
      const url = `https://www.google.com/maps/search/?api=1&query=${matchingAddress.coords.latitude},${matchingAddress.coords.longitude}`;
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open this URL: " + url);
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      {matchingAddress ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: matchingAddress.coords.latitude,
            longitude: matchingAddress.coords.longitude,
            latitudeDelta: matchingAddress.coords.latitudeDelta,
            longitudeDelta: matchingAddress.coords.longitudeDelta
          }}
        >
          <Marker
            coordinate={{
              latitude: matchingAddress.coords.latitude,
              longitude: matchingAddress.coords.longitude
            }}
            title={matchingAddress.title}
          />
        </MapView>
      ) : (
        <Text style={styles.noAddressText}>No matching address found.</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={handleOpenGoogleMaps}>
        <Text style={styles.buttonText}>Open in Google Maps</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: 10,
    backgroundColor: 'royalblue',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    marginLeft: 5
  }
});

export default Map;
