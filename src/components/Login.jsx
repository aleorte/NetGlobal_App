import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-native";
import { getGuard } from "../state/guards";


const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const onSubmit = ()=>{
    dispatch(getGuard({email:email,password:password}))
  }
  const handleRecoverPassword = ()=>{
    navigate("/recover")
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput 
        style={styles.input}
        value = {email} 
        onChangeText = {(e)=>setEmail(e)}
        placeholder="email" 
      />
      <TextInput
        style={styles.input}
        placeholder="contraseña"
        secureTextEntry={true}
        value = {password} 
        onChangeText = {(e)=>setPassword(e)}
      />
      <TouchableWithoutFeedback>
        <Text onPress={handleRecoverPassword} style={styles.text}>¿Olvidaste tu contraseña?</Text>
      </TouchableWithoutFeedback>
      <TouchableHighlight underlayColor={"#1976D2"} onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableHighlight>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    paddingBottom: 20,
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
  button: {
    alignSelf: "stretch",
    backgroundColor: "#9C27B0",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 120,
    marginTop: 50,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  text: {
    color: "#1976D2",
    paddingTop: 10,
    paddingLeft: 110,
    textDecorationLine: "underline"

  },
});

export default Login;
