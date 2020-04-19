import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from "./navigation";
import UserContextProvider from "./context/UserContext";

export default function App() {
  return (
    <UserContextProvider>
      <Navigation />
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
