import React, { useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OrderStatus from './Pages/OrderStatus';
import ChatScreen from './Pages/ChatScreen';

export default function App() {
  const Stack = createStackNavigator();

  return (
    // <ScrollView>
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{ headerShown: false }}>
        {/* Define your screens here */}
        <Stack.Screen name="OrderStatus" component={OrderStatus} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    // </ScrollView>
  );
}