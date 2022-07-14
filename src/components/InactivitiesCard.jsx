import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const InactivitiesCard = ( {Inactivity} ) => {
  
  
  return (
    <View style={styles.viewCard}>
        <Text style = {styles.title}>Inicio de Inactividad:</Text>
        <Text style = {styles.date}>{Inactivity.startDate}</Text>
        <Text style = {styles.title}>Hasta:</Text>
        <Text style = {styles.date}>{Inactivity.endDate}</Text>
        <Text style = {styles.title}>Estado:</Text>
        <Text style = {
          Inactivity.state === "PENDING APPROVAL" ? styles.statusPending
          : Inactivity.state === "APPROVED" ? styles.statusAproved 
          : styles.statusRejected
          }>
          {
           Inactivity.state === "PENDING APPROVAL" ? "Aprobación Pendiente" 
           : Inactivity.state === "APPROVED" ? "Aprobada" 
           : "Cancelado"
          }
        </Text>
    </View>
  )
}

export default InactivitiesCard

const styles = StyleSheet.create({
viewCard : {
    alignSelf: "stretch",
    backgroundColor: "#DAE8FF",
    borderRadius: 20,
    marginVertical:20,
    marginHorizontal:20,
    paddingHorizontal:20,
    paddingVertical:20,
},
date: {
    color:"#283492",
    fontWeight:"bold",
    fontSize: 16,
    marginTop: 2
},
title:{
    fontWeight:"bold",
    marginTop: 2,
    fontSize: 17,
},
statusPending:{
  fontWeight:"bold",
  fontSize: 16,
  marginTop: 2,
  color: "rgba(0,0,0,0.5)"
},
statusAproved:{
  fontWeight:"bold",
  fontSize: 16,
  marginTop: 2,
  color: "rgb(39,135,24)"
},
statusRejected:{
  fontWeight:"bold",
  fontSize: 16,
  marginTop: 2,
  color: "rgb(173,0,0)"
}
});