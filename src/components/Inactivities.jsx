import { useState } from "react";
import { useEffect } from "react";
import React from "react";
import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getInactivities } from "../state/inactivities";
import InactivitiesCard from "./InactivitiesCard";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from "axios";
import moment from "moment";

const Inactivities = () => {
  const dispatch = useDispatch();
  const { inactivities } = useSelector((state) => state.inactivities);
  const guard = useSelector((state) => state.guard);

  useEffect(() => {
    dispatch(getInactivities({ guardId: guard.id }));
  }, []);

  const onSubmit = async () => {
    const startDate = moment(new Date(startForBackend)).format("YYYY-MM-DD");
    const endDate = moment(new Date(endForBackend)).format("YYYY-MM-DD");

    const newInactivity = await axios.post(
      `http://192.168.0.77:3001/inactivities/guard/${guard.id}`,
      {
        startDate: startDate,
        endDate: endDate,
      }
    );
    dispatch(getInactivities({ guardId: guard.id }));
    // console.log("startDate:", startDate)
    // console.log("endDate:", endDate)
  };

  // For Calendar:
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [startForBackend, setStartForBackend] = useState("");
  const [endForBackend, setEndForBackend] = useState("");

  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      dispatch(getInactivities({ guardId: guard.id })).then(
        setRefreshing(false)
      );
    });
  }, []);

  const showDatePicker = (type) => {
    if (type === "start") setStartDatePickerVisibility(true);
    if (type === "end") setEndDatePickerVisibility(true);
  };
  const hideDatePicker = (type) => {
    if (type === "start") setStartDatePickerVisibility(false);
    if (type === "end") setEndDatePickerVisibility(false);
  };

  const handleConfirmStart = (date) => {
    let start = date.toString();
    setStartForBackend(start);
    start = start.split(" ");
    start.splice(-3);
    start.splice(0, 1);
    let startDate = start.join(" - ").substring(0, 15);
    setStart(startDate);
    hideDatePicker("start");
  };

  const handleConfirmEnd = (date) => {
    //console.warn("A date has been picked: ", date);
    let end = date.toString();
    setEndForBackend(end);
    end = end.split(" ");
    end.splice(-3);
    end.splice(0, 1);
    let endDate = end.join(" - ").substring(0, 15);
    setEnd(endDate);
    hideDatePicker("end");
  };

  // For setting a new Inactivity Card
  const [visible, setVisible] = useState(false);

  const handleTask = () => {
    setVisible(!visible);
  };

  return (
    <ScrollView
      style={styles.containter}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.Inactivity}>INACTIVIDADES: </Text>
      <>
        <DateTimePickerModal
          isVisible={isStartDatePickerVisible}
          mode="date"
          onConfirm={(date) => handleConfirmStart(date)}
          onCancel={hideDatePicker}
        />
      </>
      <>
        <DateTimePickerModal
          isVisible={isEndDatePickerVisible}
          mode="date"
          onConfirm={(date) => handleConfirmEnd(date)}
          onCancel={hideDatePicker}
        />
      </>

      <TouchableOpacity
        onPress={handleTask}
        style={[
          styles.viewCardToday,
          visible ? styles.viewHeightBig : styles.viewHeightSmall,
        ]}
      >
        {visible ? null : (
          <>
            <TouchableHighlight
              style={styles.inactivityButton}
              underlayColor={"#283492"}
              onPress={handleTask}
            >
              <Text style={styles.buttonText}>Reportar nueva inactividad</Text>
            </TouchableHighlight>
          </>
        )}
        {visible ? (
          <View style={styles.details}>
            <Text style={styles.text}>Inicio de Inactividad:</Text>

            {start ? ( // If startDate exists:
              <View>
                <Text style={styles.title}> {start} </Text>
                <View style={styles.button}>
                  <TouchableHighlight
                    style={styles.button}
                    underlayColor={"#283492"}
                    onPress={() => showDatePicker("start")}
                  >
                    <Text style={styles.buttonText}>Modificar inicio</Text>
                  </TouchableHighlight>
                </View>
              </View>
            ) : (
              // If startDate does not exists:
              <View>
                <Text style={styles.title}>--/--/----</Text>
                <View style={styles.button}>
                  <TouchableHighlight
                    style={styles.button}
                    underlayColor={"#283492"}
                    onPress={() => showDatePicker("start")}
                  >
                    <Text style={styles.buttonText}>Fecha de inicio</Text>
                  </TouchableHighlight>
                </View>
              </View>
            )}

            <Text style={styles.text}>Hasta:</Text>

            {end ? ( // If endDate exists:
              <View>
                <Text style={styles.title}> {end} </Text>
                <View style={styles.button}>
                  <TouchableHighlight
                    style={styles.button}
                    underlayColor={"#283492"}
                    onPress={() => showDatePicker("end")}
                  >
                    <Text style={styles.buttonText}>Modificar fin</Text>
                  </TouchableHighlight>
                </View>
              </View>
            ) : (
              // If endDate does not exists:
              <View>
                <Text style={styles.title}>--/--/----</Text>
                <View style={styles.button}>
                  <TouchableHighlight
                    style={styles.button}
                    underlayColor={"#283492"}
                    onPress={() => showDatePicker("end")}
                  >
                    <Text style={styles.buttonText}>Fecha de fin</Text>
                  </TouchableHighlight>
                </View>
              </View>
            )}
            <TouchableHighlight
              style={styles.buttonFinished}
              underlayColor={"#283492"}
              onPress={onSubmit}
            >
              <Text style={styles.buttonText}>Solicitar Permiso</Text>
            </TouchableHighlight>
          </View>
        ) : null}
      </TouchableOpacity>

      {inactivities?.map((Inactivity) => {
        return <InactivitiesCard Inactivity={Inactivity} key={Math.random()} />;
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Inactivity: {
    fontWeight: "bold",
    fontSize: 23,
    paddingLeft: 25,
    paddingTop: 25,
    paddingBottom: 0,
    color: "#B9158F",
  },
  inactivityButton: {
    backgroundColor: "rgba(65,122,251,0.9)",
    width: 220,
    height: 45,
    justifyContent: "center",
    alignSelf: "center",
    marginHorizontal: 120,
    marginVertical: 0,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 14.3,
  },
  button: {
    width: 140,
    backgroundColor: "rgba(65,122,251,0.9)",
    height: 40,
    justifyContent: "center",
    alignSelf: "center",
    marginHorizontal: 120,
    marginVertical: 10,
    borderRadius: 19,
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
    width: 200,
    backgroundColor: "green",
    height: 44,
    justifyContent: "center",
    alignSelf: "center",
    marginHorizontal: 120,
    marginTop: 15,
    borderRadius: 20,
  },
  viewCard: {
    alignSelf: "stretch",
    backgroundColor: "#DAE8FF",
    borderRadius: 20,
    marginVertical: 20,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  viewHeightSmall: {
    height: 130,
    paddingTop: 40,
  },
  viewHeightBig: {
    height: 338,
  },
  viewCardToday: {
    alignSelf: "stretch",
    borderColor: "#6197EE",
    backgroundColor: "#EEF4FC",
    borderWidth: 2,
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    height: 100,
    paddingVertical: 20,
  },
  details: {
    height: 200,
    borderRadius: 20,
    marginTop: 0,
    alignSelf: "stretch",
  },
  text: {
    color: "#283492",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  date: {
    color: "#283492",
    fontWeight: "bold",
    fontSize: 15,
  },
  title: {
    fontSize: 15.5,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 7,
  },
  subtitle: {
    paddingBottom: 10,
  },
});

export default Inactivities;
