import {
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { useNavigate, useParams } from "react-router-native";
import { useState } from "react";
import axios from "axios";
import AppLoader from "./AppLoader";

const ConfirmCode = () => {
  const navigate = useNavigate();
  const {email} = useParams()
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");
  const [fourth, setFourth] = useState("");
  const [visible, setVisible] = useState(false);
  const [loaderVisible,setLoaderVisible] = useState(false)


  const handlePrevious = () => {
    navigate("/recover");
  };
  const handleNext = async () => {
    setLoaderVisible(true)
    const token = first.toString() + second + third + fourth;
    try{
      await axios.post ("http://localhost:3001/token",{recoveryKey:token,email:email})
      navigate(`/confirm/${email.toLowerCase()}`)
    }catch(err)
    {
      setLoaderVisible(false)
      setVisible(true);
    }
  };
  return (
    <>
    <View style={styles.container}>
      <Text style={styles.title}>Ingrese el código enviado a su email:</Text>
      <View style={styles.codeContainer}>
        <TextInput
          value={first}
          onChangeText={(e) => setFirst(e)}
          maxLength={1}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          value={second}
          onChangeText={(e) => setSecond(e)}
          maxLength={1}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          value={third}
          onChangeText={(e) => setThird(e)}
          maxLength={1}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          value={fourth}
          onChangeText={(e) => setFourth(e)}
          maxLength={1}
          style={styles.input}
          keyboardType="numeric"
        />
      </View>
      {visible ? (
        <Text style={styles.error}>
          Código inválido. Inténtelo de nuevo.
        </Text>
      ) : null}
      <View style={styles.buttons}>
        <TouchableWithoutFeedback onPress={handlePrevious}>
          <Text style={styles.previous}>Anterior</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={handleNext}>
          <Text style={styles.next}>Siguiente</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
    { loaderVisible ? <AppLoader />:null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  codeContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  input: {
    borderColor: "#808080",
    borderWidth: 2,
    height: 50,
    width: 50,
    borderRadius: 15,
    marginVertical: 5,
    marginHorizontal: 5,
    textAlign: "center",
    color: "#B9158F",
    fontWeight: "bold",
    fontSize: 20,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 70,
  },
  previous: {
    color: "#283492",
    fontWeight: "bold",
    paddingRight: 90,
    textDecorationLine: "underline",
  },
  next: {
    color: "#283492",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },

  title: {
    fontSize: 15,
    paddingBottom: 20,
  },
  error: {
    fontSize: 12,
    paddingTop: 20,
    color: "red",
    width: 200,
  },
  
});

export default ConfirmCode;
