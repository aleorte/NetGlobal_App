import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableHighlight
} from "react-native";
import { useState } from "react";
import { useNavigate } from "react-router-native";
import axios from "axios";
import AppLoader from "./AppLoader";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loaderVisible,setLoaderVisible] = useState(false)

  const navigate = useNavigate();

  const handlePrevious = () => {
    navigate("/");
  };
  const handleNext = async () => {
    setLoaderVisible(true)
    try{
      await axios.post("http://localhost:3001/forgot-password", {
        email: email.toLowerCase(),
      });
      navigate(`/code/${email.toLowerCase()}`);

    }catch(err)
    {
      setLoaderVisible(false)
      alert("El email ingresado no se encuentra registrado. Inténtelo nuevamente.")
    }
  };

  return (
    <>
    <View style={styles.container}>
      <Text style={styles.title}>
        Ingrese el mail de la cuenta a recuperar:
      </Text>
      <View style={styles.viewInput}>
      <TextInput
        style={styles.input}
        placeholder="email"
        value={email}
        onChangeText={(e) => setEmail(e)}
      />
      {/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) || email === "" ? (
       null
      ) : (
        <Text style={styles.error}>El campo debe ser un email</Text>
      )}
      </View>

      <View style={styles.buttons}>
        <TouchableHighlight  underlayColor={"#fff"} onPress={handlePrevious}>
          <Text style={styles.previous}>Anterior</Text>
        </TouchableHighlight>
        <TouchableHighlight  underlayColor={"#fff"} disabled = {
          !(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) && email !== "")
        } onPress={handleNext}>
          <Text style={styles.next}>Siguiente</Text>
        </TouchableHighlight>
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
  viewInput: {
    alignSelf: "stretch",
    alignItems: "center",
    height: 60,
  },
  input: {
    borderColor: "#808080",
    borderWidth: 2,
    height: 40,
    marginVertical: 5,
    alignSelf: "stretch",
    paddingHorizontal: 30,
    marginHorizontal: 40,
    borderRadius: 15,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 70,
  },
  previous: {
    color: "#1976D2",
    fontWeight: "bold",
    paddingRight: 90,
    textDecorationLine: "underline",
  },
  next: {
    color: "#1976D2",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },

  title: {
    fontSize: 15,
    paddingBottom: 20,
  },
  error: {
    fontSize: 12,
    paddingTop: 10,
    color: "red",
    width: 200,
  },
});

export default ForgotPassword;
