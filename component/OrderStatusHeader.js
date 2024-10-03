import React from 'react';
import { View, Text, StyleSheet,Image , TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo for icons

// Header component accepting props for dynamic behavior
export default function OrderStatusHeader({ showBackButton, onBackPress, onChatPress }) {
  return (
    <View style={styles.headerContainer}>
      {/* Conditional rendering for back button */}
      {showBackButton && (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Image source={require("./../assets/goBack.png")} style={styles.icon} />
        </TouchableOpacity>
      )}
      
      {/* Header title */}
      <Text style={styles.headerTitle}>สถานะการจัดส่ง</Text>
      
      {/* Conditional rendering for chat button */}
      {onChatPress && (
        <TouchableOpacity onPress={onChatPress} style={styles.chatButton}>
          <Text style={styles.chatButtonText}>แชทกับ admin</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: "#fff",
    marginLeft: 3,
  },
  chatButton: {
    backgroundColor: '#000',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  chatButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  icon: {
    width: 20,
    height: 20,
  },
});
