import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  Modal,
} from "react-native";
import MapView, { Marker } from "react-native-maps"; // Use this for showing the map
import MapViewDirections from "react-native-maps-directions";
import OrderStatusHeader from "./../component/OrderStatusHeader"; // Import the header component
import { useNavigation } from "@react-navigation/native"; // Import navigation hook

export default function OrderStatus() {
  const navigation = useNavigation(); // Use the navigation hook
  const [status, setStatus] = useState("searching"); // Change the status to render different UIs
  const [modalVisible, setModalVisible] = useState(false); // For controlling the modal visibility

  // Dummy data for order and walker
  const order = {
    orderId: "1234",
    walker: {
      name: "นายเกิน เจเลเวนท์",
    },
  };

  const origin = {
    latitude: 13.846322479724758,
    longitude: 100.56969665995808,
  };

  const destination = {
    latitude: 13.846295105738797,
    longitude: 100.56860050643157,
  };

  const GOOGLE_MAPS_APIKEY = "AIzaSyAuAlLDi9owSLpxwyesXWCCegYMe9ttqNs";

  // Function for handling back button press
  const handleBackPress = () => {
    console.log("Back button pressed");
    navigation.goBack();
  };

  // Function for handling chat button press
  const handleChatPress = () => {
    console.log("Chat with admin button pressed");
    navigation.navigate("ChatScreen"); // Navigate to the ChatScreen
  };

  // Condition to render Chat button only for specific statuses
  const showChatButton = status !== "searching" && status !== "completed";


  const renderStatusContent = () => {
    switch (status) {
      case "searching":
        return (
          <View>
            <Text style={styles.statusText}>สถานะ: กำลังค้นหา Walker</Text>
            <Text style={styles.subText}>
              ระบบกำลังจัดหาผู้จัดส่งให้กับท่าน
            </Text>
            <View style={styles.iconsContainer}>
              <Image
                source={require("./../assets/binoculars.png")}
                style={styles.icon}
              />
              <Image
                source={require("./../assets/food.png")}
                style={[styles.icon, { opacity: 0.1 }]}
              />
              <Image
                source={require("./../assets/walk.png")}
                style={[styles.icon, { opacity: 0.1 }]}
              />
              <Image
                source={require("./../assets/checked.png")}
                style={[styles.icon, { opacity: 0.1 }]}
              />
            </View>
            <Text style={styles.orderId}>รายการสั่งซื้อ {order.orderId}</Text>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(true)} // Open the modal when cancel is pressed
            >
              <Text style={styles.cancelButtonText}>ยกเลิกออเดอร์</Text>
            </TouchableOpacity>
          </View>
        );
      case "picking_up_food":
        return (
          <View>
            <Text style={styles.statusText}>สถานะ: Walker กำลังรับอาหาร</Text>
            <Text style={styles.subText}>คาดการณ์เวลาอีก 15.00 นาที</Text>
            <View style={styles.iconsContainer}>
              <Image
                source={require("./../assets/binoculars.png")}
                style={[styles.icon, { opacity: 0.1 }]}
              />
              <Image
                source={require("./../assets/food.png")}
                style={styles.icon}
              />
              <Image
                source={require("./../assets/walk.png")}
                style={[styles.icon, { opacity: 0.1 }]}
              />
              <Image
                source={require("./../assets/checked.png")}
                style={[styles.icon, { opacity: 0.1 }]}
              />
            </View>
            <Text style={styles.orderId}>รายการสั่งซื้อ {order.orderId}</Text>
            <View style={styles.walkerInfoContainer}>
              {/* Walker's Image */}
              <Image
                source={require("./../assets/food.png")} // Use the actual path or URL of the image here
                style={styles.walkerImage}
              />

              {/* Walker's Name */}
              <Text style={styles.walkerName}>Walker: {order.walker.name}</Text>
            </View>
            <TouchableOpacity style={styles.ChatWalkerButton} onPress={() => {handleChatPress();}}>
              <Text style={styles.ChatWalkerButtonText}>Chat with Walker</Text>
            </TouchableOpacity>
          </View>
        );
      case "delivering":
        return (
          <View>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 13.846322,
                longitude: 100.569696,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={origin}
                title="Origin"
                description="Starting Point"
                pinColor="green" // Change the color of the marker
              />
              <Marker
                coordinate={destination}
                title="Destination"
                description="Ending Point"
                image={require("./../assets/Marker.png")} // Custom marker image
                style={styles.marker} // Apply style to adjust size
              />
              <MapViewDirections
                origin={origin}
                destination={destination}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="blue"
                mode="WALKING" // Setting the travel mode to walking
                onError={(error) => console.log("Error with directions", error)}
              />
            </MapView>
            <Text style={styles.statusText}>สถานะ: Walker กำลังจัดส่ง</Text>
            <Text style={styles.subText}>คาดการณ์เวลาอีก 5.00 นาที</Text>
            <View style={styles.iconsContainer}>
              <Image
                source={require("./../assets/binoculars.png")}
                style={[styles.icon, { opacity: 0.1 }]}
              />
              <Image
                source={require("./../assets/food.png")}
                style={[styles.icon, { opacity: 0.1 }]}
              />
              <Image
                source={require("./../assets/walk.png")}
                style={styles.icon}
              />
              <Image
                source={require("./../assets/checked.png")}
                style={[styles.icon, { opacity: 0.1 }]}
              />
            </View>
            <Text style={styles.orderId}>รายการสั่งซื้อ {order.orderId}</Text>
            <View style={styles.walkerInfoContainer}>
              {/* Walker's Image */}
              <Image
                source={require("./../assets/food.png")} // Use the actual path or URL of the image here
                style={styles.walkerImage}
              />

              {/* Walker's Name */}
              <Text style={styles.walkerName}>Walker: {order.walker.name}</Text>
            </View>
            <TouchableOpacity style={styles.ChatWalkerButton} onPress={() => {handleChatPress();}}>
              <Text style={styles.ChatWalkerButtonText}>Chat with Walker</Text>
            </TouchableOpacity>
          </View>
        );
      case "completed":
        return (
          <View>
            <Text style={styles.statusText}>สถานะ: จัดส่งสำเร็จ</Text>
            <Text style={styles.subText}>ขอบคุณที่ใช้บริการ KU MAN</Text>
            <View style={styles.iconsContainer}>
              <Image
                source={require("./../assets/binoculars.png")}
                style={[styles.icon, { opacity: 0.1 }]}
              />
              <Image
                source={require("./../assets/food.png")}
                style={[styles.icon, { opacity: 0.1 }]}
              />
              <Image
                source={require("./../assets/walk.png")}
                style={[styles.icon, { opacity: 0.1 }]}
              />
              <Image
                source={require("./../assets/checked.png")}
                style={styles.icon}
              />
            </View>
            <Text style={styles.orderId}>รายการสั่งซื้อ {order.orderId}</Text>
            <View style={styles.walkerInfoContainer}>
              {/* Walker's Image */}
              <Image
                source={require("./../assets/food.png")} // Use the actual path or URL of the image here
                style={styles.walkerImage}
              />

              {/* Walker's Name */}
              <Text style={styles.walkerName}>Walker: {order.walker.name}</Text>
            </View>
            <TouchableOpacity style={styles.reviewButton}>
              <Text style={styles.reviewButtonText}>review</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reportButton}>
              <Text style={styles.reportButtonText}>report</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Render the custom header */}
      <OrderStatusHeader
        showBackButton={true}
        onBackPress={handleBackPress}
        onChatPress={showChatButton ? handleChatPress : null} // Conditionally render the chat button
      />

      <View style={styles.statusContainer}>
        {renderStatusContent()}

        {/* Modal for cancel order confirmation */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>ต้องการยกเลิกการสั่งซื้อ?</Text>
              <Text style={styles.modalSubText}>
                หากยกเลิกการสั่งซื้อ ข้อมูลที่สั่งไว้จะถูกล้าง
              </Text>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.modalCancelButton}
                  onPress={() => {
                    console.log("Order canceled");
                    setModalVisible(false); // Close the modal
                  }}
                >
                  <Text style={styles.modalCancelButtonText}>ยกเลิกรายการ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalGoBackButton}
                  onPress={() => setModalVisible(false)} // Close the modal when "Go Back" is pressed
                >
                  <Text style={styles.modalGoBackButtonText}>ย้อนกลับ</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Buttons to navigate through different statuses */}
        <View style={styles.statusButtonContainer}>
          <Button title="ค้นหา Walker" onPress={() => setStatus("searching")} />
          <Button title="กำลังรับอาหาร" onPress={() => setStatus("picking_up_food")}/>
          <Button title="กำลังจัดส่ง" onPress={() => setStatus("delivering")} />
          <Button title="จัดส่งสำเร็จ" onPress={() => setStatus("completed")} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  statusContainer: {
    flex: 1,
    padding: 20,
  },
  statusText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  icon: {
    width: 40,
    height: 40,
  },
  orderId: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  walkerName: {
    fontSize: 18,
    color: "#4CAF50",
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  chatButton: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  ChatWalkerButton: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  ChatWalkerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 600,
  },
  reviewButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  reviewButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  reportButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  reportButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  map: {
    height: 200,
    width: "100%",
    marginBottom: 20,
  },
  statusButtonContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginTop: 20,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalSubText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  modalCancelButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  modalCancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalGoBackButton: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
  },
  modalGoBackButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  walkerInfoContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  walkerImage: {
    width: 40,  // Adjust the size of the image as needed
    height: 40,
    borderRadius: 20,  // Makes the image circular
    marginRight: 10,   // Adds spacing between the image and text
  },
  walkerName: {
    fontSize: 18,
    color: "#4CAF50",
    fontWeight: "bold",
  },
});
