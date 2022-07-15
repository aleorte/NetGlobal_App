import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { useState } from "react";
import * as Location from "expo-location";
import { setStartTime } from "../state/taskTime";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setEndTime } from "../state/taskTime";
import getDistanceInKM from "../utils/getDistanceInKm";
import { assignmentEndTime } from "../state/nextAssignments";
import { assignmentStartTime } from "../state/nextAssignments";

const Card = ({ assignment }) => {
  const date = new Date();
  const today = date.toLocaleDateString("en-ZA").replaceAll("/", "-");
  const [visible, setVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const guard = useSelector((state) => state.guard);
  const {reload} = useSelector((state)=>state.boolean)
  const guardTask = useSelector((state) => state.guardTask);
  const [task, setTask] = useState(
    assignment.state === "COMPLETED"
      ? "Tarea completa"
      : assignment.state === "IN PROCESS"
      ? "Finalizar tarea"
      : "Iniciar tarea"
  );
  const dispatch = useDispatch();

  const handleTask = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    const now = new Date()
    if(new Date(assignment.startTime) - now<=300000)
    setButtonVisible(true)

    if (today === assignment.date) {
      if (assignment.id === guardTask.start.id) {
        dispatch(
          assignmentStartTime({
            assignmentId: assignment.id,
            time: guardTask.start.time,
            guardId: guard.id,
          })
        ).then(setTask("Finalizar tarea"));
      }
      if (assignment.id === guardTask.end.id) {
        dispatch(
          assignmentEndTime({
            assignmentId: assignment.id,
            time: guardTask.end.time,
            guardId: guard.id,
          })
        ).then(setTask("Tarea completa"));
      }
    }
  }, [guardTask.start.time, guardTask.end.time, reload]);

  const buttonHandle = async () => {
    if (task === "Iniciar tarea") {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "denied") {
        Alert.alert(
          "Importante",
          "Se requiere acceso a tu ubicación para poder realizar esta acción."
        );
      } else {
        setTask("Cargando...");
        let location = await Location.getCurrentPositionAsync({});

        if (
          getDistanceInKM(
            location.coords.latitude,
            location.coords.longitude,
            assignment.branch.coordinateLatitude,
            assignment.branch.coordinateLength
          ) <= 0.05
        )
          dispatch(setStartTime(assignment.id));
        else {
          Alert.alert(
            "Importante",
            "Debes estar a menos de 50 metros de la sucursal."
          );
          setTask("Iniciar tarea");
        }
      }
    } else if (task === "Finalizar tarea") {
      if (await createTwoButtonAlert()) {
        setTask("Cargando...");
        let location = await Location.getCurrentPositionAsync({});
        if (
          getDistanceInKM(
            location.coords.latitude,
            location.coords.longitude,
            assignment.branch.coordinateLatitude,
            assignment.branch.coordinateLength
          ) <= 0.05
        ) {
          dispatch(setEndTime(assignment.id));
        } else {
          Alert.alert(
            "Importante",
            "Debes estar a menos de 50 metros de la sucursal."
          );
          setTask("Finalizar tarea");
        }
      }
    }
  };
  const createTwoButtonAlert = async () =>
    new Promise((resolve) => {
      Alert.alert("¿Estás seguro?", "Finalizar la tarea no tiene retroceso.", [
        {
          text: "Cancel",
          onPress: () => resolve(false),
          style: "cancel",
        },
        { text: "OK", style: "destructive", onPress: () => resolve(true) },
      ]);
    });

  return (
    <TouchableOpacity
      onPress={handleTask}
      style={[
        today === assignment.date ? styles.viewCardToday : styles.viewCard,
        visible && today === assignment.date ? styles.viewHeightBig :null,
      ]}
    >
      <Text style={styles.date}>{assignment.date}</Text>
      <Text style={styles.text}>{assignment.branch.name.toUpperCase()}</Text>
      {visible ? (
        <View style={styles.details}>
          <Text style={styles.title}>Notas:</Text>
          <Text style={styles.subtitle}>{assignment.notes}</Text>
          <Text style={styles.title}>Dirección:</Text>
          <Text
            style={styles.subtitle}
          >{`${assignment.branch.street} ${assignment.branch.number}, ${assignment.branch.location}`}</Text>
          <Text style={styles.title}>Horario de entrada:</Text>
          <Text style={styles.subtitle}>
            {new Date(assignment.startTime).toLocaleString("es-AR")}{" "}
          </Text>
          <Text style={styles.title}>Horario de salida:</Text>
          <Text style={styles.subtitle}>
          {new Date(assignment.endTime).toLocaleString("es-AR")}{" "}
          </Text>

          {today === assignment.date ? (
            <>
              <Text style={styles.title}>Horario real de entrada:</Text>
              <Text style={styles.subtitle}>
              {assignment.realStartTime ? new Date(assignment.realStartTime).toLocaleString("es-AR"):null}

              </Text>
              <Text style={styles.title}>Horario real de salida:</Text>
              <Text style={styles.subtitle}>
              {assignment.realEndTime ? new Date(assignment.realStartTime).toLocaleString("es-AR"):null}
              </Text>
              {                
                buttonVisible ? <TouchableHighlight
                style={[
                  styles.button,
                  task === "Finalizar tarea"
                    ? styles.buttonEnd
                    : task === "Tarea completa"
                    ? styles.buttonFinished
                    : null,
                ]}
                underlayColor={"#283492"}
                onPress={buttonHandle}
              >
                <Text style={styles.buttonText}>{task}</Text>
              </TouchableHighlight> : null
              }

            </>
          ) : null}
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
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
  viewCard: {
    alignSelf: "stretch",
    backgroundColor: "#DAE8FF",
    borderRadius: 20,
    marginVertical: 5,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  viewHeightBig: {
    height: 480,
  },
  viewCardToday: {
    alignSelf: "stretch",
    borderColor: "#283492",
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 20,
    marginVertical: 5,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    height: 100,
    paddingVertical: 20,
  },
  details: {
    height: 140,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: "stretch",
  },
  text: {
    color: "#283492",
    fontSize: 18,
    paddingVertical: 5,
  },
  date: {
    color: "#283492",
    fontWeight: "bold",
    fontSize: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
  },
  subtitle: {
    paddingBottom: 10,
    fontSize: 15,
  },
});

export default Card;
