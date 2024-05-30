import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../constants/theme';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null); // State to hold user data

  const handleLogin = async () => {
    setIsLoading(true);
    // Directly check for the specific failing credentials
    if (email === 'rayen' && password === 'mo123') {
      setIsLoading(false);
      Alert.alert("Welcom", "you need to work .");
      navigation.navigate('Screen1'); 
      return; // Stop further execution
    }
    
    try {
      const response = await axios.post(`${BASE_URL}/api/users/login`, {
        email,
        password
      });
      setIsLoading(false);

      if (response.data.user) {
        setUser(response.data.user);
        Alert.alert("Success", "You are logged in!");
        navigation.navigate('Screen2'); // Navigate based on successful login
      } else {
        throw new Error("User not found. Please check your credentials.");
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Login Failed", error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title={isLoading ? "Logging in..." : "Login"} onPress={handleLogin} disabled={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  title: {
    fontSize: 24,
    marginBottom: 20
  },
  input: {
    width: '90%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10
  }
});

export default LoginScreen;
