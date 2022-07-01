import React, { useEffect, useState } from "react";
import Home from "./Home";
import Login from "./Login";
import { Text, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setGuard } from "../state/guards";
import { getData } from "../utils/asyncStorage";

const Options = () => {


  const [notShow, setNotShow] = useState(true);
  const dispatch = useDispatch();
  const guard = useSelector(state=>state.guard);
  console.log(guard,"esto sale del store")

  useEffect(() => {
    getData("guard").then((data) => {
      if(data.id) dispatch(setGuard(data))
    }).catch(e=>console.log(e));
    setTimeout(() => {
      setNotShow(false);
    }, 3000);
  }, []);

  if (notShow) {
    return (
      <View style={styles.loading}>
        <Text style={styles.text}>Cargando...</Text>
      </View>
    );
  } else if (guard.id) {
    return (
        <Home/>
    );
  } else {
    return (
        <Login/>
    );
  }
};
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
export default Options;
