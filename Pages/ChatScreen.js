import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  TextInput,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import io from "socket.io-client";
import { Ionicons } from "@expo/vector-icons"; // For icons
import "react-native-url-polyfill/auto";
import { useNavigation } from "@react-navigation/native"; // Import the hook from '@react-navigation/native'

export default function App() {
  const [userId, setUserId] = useState("123"); // Assuming a default user ID
  const [role, setRole] = useState("requester");
  const [orderId, setOrderId] = useState(""); // Set the order ID as necessary
  const [targetRole, setTargetRole] = useState("admin"); // "walker" or "admin"
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const navigation = useNavigation(); // Initialize the navigation hook

  // Initialize Socket.IO client
  useEffect(() => {
    const newSocket = io("https://ku-man-chat.vimforlanie.com/");
    setSocket(newSocket);

    // Listen for incoming messages
    newSocket.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => newSocket.disconnect();
  }, []);

  const joinOrderChat = () => {
    if (socket) {
      socket.emit("joinOrderChat", { userId, role, targetRole, orderId });
    }
  };

  const sendOrderMessage = (msg) => {
    if (socket && msg.trim() !== "") {
      const newMessage = {
        orderId,
        message: msg,
        fromUser: userId,
        role,
        targetRole,
      };

      socket.emit("orderMessage", newMessage);

      // Add the sent message to the messages array for immediate display
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      setMessage(""); // Clear the input after sending
    }
  };
  const goBack = () => {
    navigation.goBack(); // Go back to the previous screen
  };

  // Conditionally render the chat based on targetRole (admin or walker)
  const renderChatHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => goBack()} style={styles.backButton}>
        <Image source={require("./../assets/goBack.png")} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>
        {targetRole === "admin" ? "ติดต่อกับ Admin" : "ติดต่อกับผู้จัดส่ง"}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Chat Header */}
      {renderChatHeader()}

      {/* Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageWrapper,
              item.fromUser === userId
                ? styles.sentMessage
                : styles.receivedMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.message}</Text>
            <Ionicons
              name={
                item.role === "admin"
                  ? "person-circle"
                  : "person-circle-outline"
              }
              size={32}
              color={item.role === "admin" ? "black" : "green"}
            />
          </View>
        )}
      />

      {/* Message Input with KeyboardAvoidingView */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 5 : 0}
        style={styles.inputWrapper}
      >
        <TextInput
          style={styles.messageInput}
          placeholder="Send a message"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity
          onPress={() => sendOrderMessage(message)}
          style={styles.sendButton}
        >
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    paddingLeft: 9,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  backButton: {
    backgroundColor: "#fff",
    marginLeft: 3,
  },
  messageWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 16,
    maxWidth: "80%", // Ensure the message doesn't take the full width
  },
  sentMessage: {
    backgroundColor: "#E0E0E0",
    padding: 10,
    borderRadius: 15,
    alignSelf: "flex-end", // Align to the right
  },
  receivedMessage: {
    backgroundColor: "#E8F5E9",
    padding: 10,
    borderRadius: 15,
    alignSelf: "flex-start", // Align to the left
  },
  messageText: {
    fontSize: 16,
    marginRight: 10,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#F8F8F8",
  },
  messageInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 20,
    padding: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
});
