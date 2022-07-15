import React from 'react'
import LottieView from 'lottie-react-native'
import { View,StyleSheet } from 'react-native'

const AppLoader = () => {
  return (
    <View style = {[StyleSheet.absoluteFillObject,styles.container]}>
        <LottieView source = {require("../../assets/lf20_awe7vapl.json") } autoPlay={true} loop={true}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
    },

  });
export default AppLoader