import React from 'react'
import { View, Text, StyleSheet,ScrollView,TouchableOpacity ,TouchableHighlight} from "react-native"
import { useState } from 'react'

const Card = ({assignment}) => {
  const date = new Date("2022-07-16")
  const today =  date.toLocaleDateString("en-ZA").replaceAll("/","-")
  const [task,setTask] = useState("Iniciar Tarea");
  const [visible,setVisible] = useState(false)

  const handleTask = ()=>{
    setVisible(!visible)
  }
  const buttonHandle = ()=>{
    if(task === "Iniciar Tarea")
    {
        setTask("Finalizar Tarea")
    }
    else if (task === "Finalizar Tarea") {
        setTask("Tarea Completa")
    }
    else{
        setTask("Iniciar Tarea")
    }
  }
  return (
    <TouchableOpacity  onPress = {handleTask} style = {[today === assignment.date ? styles.viewCardToday : styles.viewCard, visible ? styles.viewHeightBig: styles.viewHeightSmall]} >
        <Text style = {styles.date} >{assignment.date}</Text>
        <Text style = {styles.text} >{assignment.branch.name.toUpperCase()}</Text>
        {visible ? <View style={styles.details}>
            <Text style = {styles.title}>Dirección:</Text>
            <Text style = {styles.subtitle}>{`${assignment.branch.street} ${assignment.branch.number}, ${assignment.branch.location}`}</Text>
            <Text style = {styles.title}>Horario de entrada:</Text>
            <Text style = {styles.subtitle}>{assignment.startTime}</Text>
            <Text style = {styles.title}>Horario de salida:</Text>
            <Text style = {styles.subtitle}>{assignment.endTime}</Text>
            {today === assignment.date ? <TouchableHighlight 
            style = {[styles.button, task === "Finalizar Tarea" ? styles.buttonEnd: (task === "Tarea Completa" ? styles.buttonFinished: null)]} 
            underlayColor={"#283492"} onPress={buttonHandle} ><Text style = { styles.buttonText}>{task}</Text></TouchableHighlight>:null }

        </View>:null}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    buttonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },

    button: {
      width: 140,
      backgroundColor: "#B9158F",
      height: 40,
      justifyContent: "center",
      alignSelf: "center",
      marginHorizontal: 120,
      marginTop: 30,
      borderRadius: 20,
    },
    buttonEnd: {
        width: 140,
        backgroundColor: "orange",
        height: 40,
        justifyContent: "center",
        alignSelf: "center",
        marginHorizontal: 120,
        marginTop: 30,
        borderRadius: 20,
      },
      buttonFinished: {
        width: 140,
        backgroundColor: "green",
        height: 40,
        justifyContent: "center",
        alignSelf: "center",
        marginHorizontal: 120,
        marginTop: 30,
        borderRadius: 20,
      },
    viewCard : {
        alignSelf: "stretch",
        backgroundColor: "#DAE8FF",
        borderRadius: 20,
        marginVertical:20,
        marginHorizontal:20,
        paddingHorizontal:20,
        paddingVertical:20,

    },
    viewHeightSmall : {
        height: 100,
    },
    viewHeightBig : {
        height: 320,
    },
    viewCardToday : {
        alignSelf: "stretch",
        borderColor: "#283492",
        backgroundColor: "white",
        borderWidth: 2,
        borderRadius: 20,
        marginVertical:20,
        marginHorizontal:20,
        paddingHorizontal:20,
        height: 100,
        paddingVertical:20,

    },
    details :{
        height: 200,
        borderRadius:20,
        marginTop: 20,
        alignSelf:"stretch"
    },
    text: {
        color:"#283492",
        fontSize:18,
        paddingVertical:5,
        
    },
    date: {
        color:"#283492",
        fontWeight:"bold",
        fontSize: 15,
    },
    title:{
        fontWeight:"bold"
    },
    subtitle:{
        paddingBottom: 10,
    }

  });
  

export default Card