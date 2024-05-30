import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';

import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { BASE_URL } from '../constants/theme';
const Ready = () => {
    const [orders, setOrders] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/order/all`);
                setOrders(response.data); // Assuming response.data is an array of orders
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders(); // Fetch once on mount

        const intervalId = setInterval(fetchOrders, 2000); // Fetch orders every 2 seconds

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []); // Empty dependency array means this effect runs only once on component mount

    const handleCall = (phoneNumber) => {
        Linking.openURL(`tel:${phoneNumber}`);
    };

    const handleDelivered = async (orderId) => {
        try {
            const response = await axios.patch(`${BASE_URL}/api/order/update/${orderId}/deliver`, {
                status: 'Delivered'
            });
            alert('Order status updated to Delivered!');
            const updatedOrders = orders.map(order => {
                if (order._id === orderId) {
                    return { ...order, deliveryStatus: 'Delivered' };
                }
                return order;
            });
            setOrders(updatedOrders);
        } catch (error) {
            console.error('Error updating order status:', error);
            alert('Failed to update order status.');
        }
    };
  
    const undeliveredOrders = orders.filter(order => order.deliveryStatus === "Confirmed");

    return (
        <ScrollView contentContainerStyle={{ padding: 20, marginTop: 25 }}>
       
            {undeliveredOrders.map((order, index) => (
                <View key={index} style={styles.orderContainer}>
                    <Text style={styles.orderInfo}>User: {order.userId?.name}</Text>
                    <Text style={styles.orderInfo}>Email: {order.userId?.email}</Text>
                    <Text style={styles.orderInfo}>Address: {order?.address}</Text>
                    <Text style={styles.orderInfo}>Phone: {order.phone}</Text>
                    <Text style={styles.orderInfo}>Total Price: {order.priceTotal} TND</Text>
                    <Text style={styles.subHeading}>Items Ordered:</Text>
                    {order.items.map((item, i) => (
                        <View key={i} style={styles.itemContainer}>
                            <Text style={styles.itemName}>{item.cheeseId?.name}</Text>
                            <Text style={styles.itemInfo}>Quantity: {item.quantity}</Text>
                            <Text style={styles.itemInfo}>Price: {item.cheeseId?.price} TND </Text>
                            <Text style={styles.itemInfo}>Category: {item.cheeseId?.category}</Text>
                            <Text style={styles.itemInfo}>Store: {item.cheeseId?.store}</Text>
                        </View>
                    ))}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('Map', { address: order.address })}
                        >
                            <MaterialCommunityIcons name="google-maps" size={24} color="white" />
                            <Text style={styles.buttonText}>Go to the Address</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button  ,styles.phoneButton]}
                            onPress={() => handleCall(order.phone)}
                        >
                            <Feather name="phone-call" size={24} color="white" />
                            <Text style={styles.buttonText}>Call the client</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.deliveredButton]}
                            onPress={() => handleDelivered(order._id)}
                        >
                            
                              <AntDesign name="downcircleo" size={24} color="white" />
                            <Text style={styles.buttonText}>Delivered</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    
        heading: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
        },
        orderContainer: {
            marginBottom: 20,
            padding: 10,
            backgroundColor: '#f0f0f0',
            borderRadius: 8,
        },
        orderInfo: {
            marginBottom: 5
        },
        subHeading: {
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 10,
            marginBottom: 5
        },
        itemContainer: {
            marginBottom: 10,
            padding: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5
        },
        itemName: {
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 5
        },
        itemInfo: {
            marginBottom: 3
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
        },
        button: {
            backgroundColor: '#17A2B8',
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
        },
        buttonText: {
            color: '#fff',
            fontWeight: 'bold'
        },
        deliveredButton: {
            backgroundColor: '#6f42c1'
        },
    phoneButton: {
        backgroundColor: '#28a745',
    }
});

export default Ready