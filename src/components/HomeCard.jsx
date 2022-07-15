import React from 'react'
import { View,Text,StyleSheet } from 'react-native'

const HomeCard = ({assignment}) => {
  return (
    <View style = {styles.card}>
        <View style = {styles.column}>
            <Text>{assignment.date}</Text>
            <Text style = {styles.branch}>{assignment.branch.name.toUpperCase()}</Text>
        </View>
        <View style = {styles.column}>
            <Text>Horas completas</Text>
            <Text style = {styles.hours}>{Number(assignment.workedHours).toFixed(2)}</Text>
        </View>



    </View>
  )
}
const styles = StyleSheet.create({
    column:{
        paddingTop:8,
    },
    branch:{
        paddingTop:10,
        fontSize: 14,
        color:"#283492",
        fontWeight:"bold"

    },
    hours:{
        fontWeight:"bold",
        fontSize:16,
        alignSelf:"center",
        paddingTop:10,
        color: "#B9158F",
    },

    title: {
      fontWeight:"bold",
      marginTop:20,
      fontSize: 18,
      color: "#B9158F",
      alignSelf:"center"
    },
    card: {
      marginVertical:10,
      backgroundColor:"#DAE8FF",
      alignSelf:"center",
      height: 80,
      width: 320,
      borderRadius:15,
      flexDirection:"row",
      justifyContent: "space-evenly"
    }
  });

export default HomeCard