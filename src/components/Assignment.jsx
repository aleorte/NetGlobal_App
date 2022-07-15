import { useEffect } from "react"
import { View, Text, StyleSheet,ScrollView,RefreshControl} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import Card from "./Card"
import React from "react"
import { nextAssignments } from "../state/nextAssignments"
import { setBoolean } from "../state/boolean"

const Assignments = () => {
    const dispatch = useDispatch()
    const guardNextAssignments = useSelector((state) => state.nextAssignments)
    const guard = useSelector((state) => state.guard)
    const boolean = useSelector((state)=>state.boolean)
    const [refreshing, setRefreshing] = useState(false);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }

      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() =>{
        
        dispatch(nextAssignments({ guardId: guard.id})).then(
            dispatch(setBoolean(!boolean)).then
            (setRefreshing(false))
        )}

        );

  
      }, []);

    useEffect(() => {
        dispatch(nextAssignments({ guardId: guard.id}))
    }, [])

    return (
        <ScrollView style = {styles.containter}
        refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            
            />}
        >
            <Text style = {styles.text}>PRÓXIMAS TAREAS: </Text>
           {
            guardNextAssignments?.map((assignment)=>{
                return <Card assignment={assignment} key = {assignment.id}/>
            })
           }
        </ScrollView>
    )
} 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "#fff",
    },
    text:{
        fontWeight:"bold",
        fontSize:20,
        paddingLeft: 25,
        paddingTop: 35,
        marginBottom:20,
        color: "#B9158F",

    }

  });

export default Assignments