import { useEffect } from "react"
import { View, Text, StyleSheet,ScrollView } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { getAssignments } from "../state/assignments"
import Card from "./Card"

const Assignments = () => {
    const dispatch = useDispatch()
    const assignments = useSelector((state) => state.assignment)
    const guard = useSelector((state) => state.guard)

    useEffect(() => {
        const date = new Date();
        const month = date.getMonth()
        dispatch(getAssignments({ guardId: guard.id, month: month }))
    }, [])

    return (
        <ScrollView style = {styles.containter}>
            <Text style = {styles.text}>PRÓXIMAS TAREAS: </Text>
           {
            assignments?.map((assignment)=>{
                return <Card assignment={assignment} key = {assignment.id} />
            })
           }
        </ScrollView>
    )
} 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
    },
    text:{
        fontWeight:"bold",
        fontSize:20,
        paddingLeft: 25,
        paddingTop: 35,
        color: "#B9158F",

    }

  });

export default Assignments