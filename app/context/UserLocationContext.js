import React, { createContext, useState, useEffect } from 'react';
import * as Location from 'expo-location';

export const UserLocationContext = createContext();

export const UserLocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        coords: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        }
      });
    })();
  }, []);

  return (
    <UserLocationContext.Provider value={{ location, setLocation }}>
      {children}
    </UserLocationContext.Provider>
  );
};
