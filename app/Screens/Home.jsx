import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';

import axios from 'axios';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { BASE_URL } from '../constants/theme';
export default function Home() {
    const [orders, setOrders] = useState([]);
  
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/order/all`);
                setOrders(response.data); // Assuming response.data is an array of orders
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        // Call fetchOrders immediately when the component mounts
        fetchOrders();

        // Set up an interval to call fetchOrders every second
        const intervalId = setInterval(fetchOrders, 1000);

        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array means this effect runs only once on component mount

    const handleCall = (phoneNumber) => {
        Linking.openURL(`tel:${phoneNumber}`);
    };

    const handleConfirm = async (order) => {
        try {
            const response = await axios.patch(`${BASE_URL}/api/order/update/${order._id}/deliver`, {
                status: 'Confirmed'
            });
            alert('Order status updated to Confirmed!');
            const updatedOrders = orders.map(o => o._id === order._id ? { ...o, deliveryStatus: 'Confirmed' } : o);
            setOrders(updatedOrders);
        } catch (error) {
            console.error('Error updating order status:', error);
            alert('Failed to update order status.');
        }
    };
    

    const undeliveredOrders = orders.filter(order => order.deliveryStatus === "Pending");

    return (
        <ScrollView contentContainerStyle={{ padding: 20, marginTop: 25 }}>
          
    
            {undeliveredOrders.map((order, index) => {
                // Check if all items in the order have valid name, price, category, and store
                const hasValidItems = order.items.every(item =>
                    item.cheeseId?.name && item.cheeseId?.price && item.cheeseId?.category && item.cheeseId?.store
                );
    
                // Only render the order view if all items are valid
                if (!hasValidItems) {
                    return null; // Do not render this order if any item is invalid
                }
    
                return (
                    <View key={order._id || index} style={styles.orderContainer}>
                        <Text style={styles.orderInfo}>User: {order.userId?.name}</Text>
                        <Text style={styles.orderInfo}>Email: {order.userId?.email}</Text>
                        <Text style={styles.orderInfo}>Address: {order.address}</Text>
                        <Text style={styles.orderInfo}>Phone: {order.phone}</Text>
                        <Text style={styles.orderInfo}>Total Price: {order.priceTotal} TND</Text>
                        <Text style={styles.subHeading}>Items Ordered:</Text>
                        {order.items.map((item, i) => (
                            <View key={item.cheeseId._id || i} style={styles.itemContainer}>
                                <Text style={styles.itemName}>{item.cheeseId.name}</Text>
                                <Text style={styles.itemInfo}>Quantity: {item.quantity}</Text>
                                <Text style={styles.itemInfo}>Price: {item.cheeseId.price} TND</Text>
                                <Text style={styles.itemInfo}>Category: {item.cheeseId.category}</Text>
                                <Text style={styles.itemInfo}>Store: {item.cheeseId.store}</Text>
                            </View>
                        ))}
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => handleCall(order.phone)}
                            >
                                <Feather name="phone-call" size={24} color="white" />
                                <Text style={styles.buttonText}>Call the client</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.deliveredButton]}
                                onPress={() => handleConfirm(order)}
                            >
                                <FontAwesome6 name="motorcycle" size={24} color="white" />
                                <Text style={styles.buttonText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            })}
        </ScrollView>
    );
    
}


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
      marginTop: 10
  },
  button: {
      backgroundColor: '#28a745',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      width: '45%'
  },
  buttonText: {
      color: '#fff',
      fontWeight: 'bold'
  },
  deliveredButton: {
      backgroundColor: '#007BFF'
  }
});
