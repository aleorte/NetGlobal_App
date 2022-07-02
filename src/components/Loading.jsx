import React from 'react'
import { StyleSheet, View,Text } from "react-native";


const Loading = () => {
  return (
    <View style={styles.loading}>
    <Text style={styles.text}>Cargando...</Text>
  </View>  )
}

const styles = StyleSheet.create({
    loading: {
      flex: 1,
      backgroundColor: "#1976D2",
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      color: "white",
      fontWeight: "bold",
      fontSize: 20,
    },
  });

export default Loading