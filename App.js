import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

export default function App() {
  const [showDirections, setShowDirections] = useState(false); // State to control showing directions

  const origin = {
    latitude: 13.846322479724758,
    longitude: 100.56969665995808,
  };

  const destination = {
    latitude: 13.846295105738797,
    longitude: 100.56860050643157,
  };

  const GOOGLE_MAPS_APIKEY = 'AIzaSyAuAlLDi9owSLpxwyesXWCCegYMe9ttqNs'; // Replace with your actual API key

  // Function to handle button press
  const handleGetDirections = () => {
    setShowDirections(true); // When button is pressed, show directions
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* Customized Marker for origin */}
        <Marker
          coordinate={origin}
          title="Origin"
          description="Starting Point"
          pinColor="green" // Change the color of the marker
        />
        
        {/* Customized Marker for destination with decreased size */}
        <Marker
          coordinate={destination}
          title="Destination"
          description="Ending Point"
          image={require('./assets/Marker.png')} // Custom marker image
          style={styles.marker} // Apply style to adjust size
        />

        {/* Only render MapViewDirections if the button has been pressed */}
        {showDirections && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="blue"
            mode="WALKING" // Setting the travel mode to walking
            onError={(error) => console.log("Error with directions", error)}
          />
        )}
      </MapView>

      {/* Button to trigger directions */}
      <View style={styles.buttonContainer}>
        <Button title="Get Walking Route" onPress={handleGetDirections} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50, // Position the button above the bottom of the screen
    left: 10,
    right: 10,
    backgroundColor: '#fff',
  },
  marker: {
    width: 5,  // Decrease the width of the marker
    height: 5, // Decrease the height of the marker
    resizeMode: 'contain', // Ensures the image retains its aspect ratio
  },
});
