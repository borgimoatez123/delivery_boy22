import React, { useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LottieView from "lottie-react-native";
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook if needed
import { COLORS, SIZES } from "../constants/theme";
import Profile from './Login'
export default function Appointment() {
  const navigation = useNavigation(); // Use useNavigation hook to get navigation object

  const animation = useRef(null);

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        ref={animation}
        style={{ width: "100%", height: SIZES.height / 3.2 }}
        source={require("../../assets/anime/delivery.json")}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('Screen2')}
      >
        <Text style={styles.buttonText}>logout </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    elevation: 3, // Android shadow effect
    shadowColor: '#000', // iOS shadow effect
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginTop: 20, // Add spacing between LottieView and button
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
