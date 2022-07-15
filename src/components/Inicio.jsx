import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAssignments } from "../state/assignments";
import { getWorkedHours } from "../state/workedHours";
import HomeCard from "./HomeCard";

const Inicio = () => {
  const today = new Date();
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const guard = useSelector((state) => state.guard);
  const assignments = useSelector((state) => state.assignment);
  const workedHours = useSelector((state) => state.workedHours);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback((selectedMonth) => {
    setRefreshing(true);
    wait(2000).then(async () => {
      dispatch(getAssignments({ guardId: guard.id, month: selectedMonth }));
      dispatch(getWorkedHours({ guardId: guard.id, month: selectedMonth }));
      setRefreshing(false);
    });
  }, []);

  const handleMonth = () => {
    const today = new Date();
    if (today.getMonth() === selectedMonth) {
      setSelectedMonth(today.getMonth() - 1);
    } else {
      setSelectedMonth(today.getMonth());
    }
  };

  useEffect(() => {
    dispatch(getAssignments({ guardId: guard.id, month: selectedMonth }));
    dispatch(getWorkedHours({ guardId: guard.id, month: selectedMonth }));
  }, [selectedMonth]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={()=>onRefresh(selectedMonth)} />
      }
    >

      <Text style={styles.title}>SELECCIONAR MES</Text>
      <View style={styles.monthsButtons}>
        <TouchableHighlight
          style={
            selectedMonth === today.getMonth() - 1
              ? styles.buttonSelected
              : styles.button
          }
          underlayColor={"white"}
          onPress={handleMonth}
          disabled={selectedMonth === today.getMonth() - 1}
        >
          <Text
            style={
              selectedMonth === today.getMonth() - 1
                ? styles.buttonTextSelected
                : styles.buttonText
            }
          >
            {monthNames[today.getMonth() - 1].toUpperCase()}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={
            selectedMonth === today.getMonth()
              ? styles.buttonSelected
              : styles.button
          }
          underlayColor={"white"}
          onPress={handleMonth}
          disabled={selectedMonth === today.getMonth()}
        >
          <Text
            style={
              selectedMonth === today.getMonth()
                ? styles.buttonTextSelected
                : styles.buttonText
            }
          >
            {monthNames[today.getMonth()].toUpperCase()}
          </Text>
        </TouchableHighlight>
      </View>
      <View>
        <Text style={styles.title}>HORAS TRABAJADAS</Text>
        <View style={styles.circle}>
          <Text style={styles.hours}>{Math.round(workedHours.data)}</Text>
        </View>
        <View>
          <Text style={styles.title}>
            TAREAS COMPLETAS - {monthNames[selectedMonth].toUpperCase()}
          </Text>
          <ScrollView style={styles.scroll}>
            {assignments?.map((assignment) => {
              if (assignment.state === "COMPLETED")
                return <HomeCard assignment={assignment} key={assignment.id} />;
            })}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  monthsButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
  },
  hours: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  circle: {
    marginTop: 30,
    alignSelf: "center",
    backgroundColor: "#283492",
    height: 110,
    width: 110,
    borderRadius: 110 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTextSelected: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonText: {
    color: "#B9158F",
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    width: 140,
    backgroundColor: "white",
    height: 40,
    justifyContent: "center",
    alignSelf: "center",
    marginHorizontal: 10,
    marginTop: 30,
    borderRadius: 20,
    borderColor: "#B9158F",
    borderWidth: 2,
  },

  buttonSelected: {
    width: 140,
    backgroundColor: "#B9158F",
    height: 40,
    justifyContent: "center",
    alignSelf: "center",
    marginHorizontal: 10,
    marginTop: 30,
    borderRadius: 20,
  },
  title: {
    fontWeight: "bold",
    marginTop: 20,
    fontSize: 18,
    color: "#B9158F",
    alignSelf: "center",
  },
  scroll: {
    marginTop: 30,
    alignSelf: "center",
    height: 250,
    width: 320,
    borderRadius: 15,
  },
});

export default Inicio;
