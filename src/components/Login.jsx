import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Image
} from "react-native";
import { useState } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-native";
import{ getGuard } from "../state/guards";
import AppLoader from "./AppLoader";


const Login = () => {
  const [email,setEmail] = useState("");
  const [error,setError] = useState(false);

  const [password,setPassword] = useState("");
  const [loaderVisible,setLoaderVisible] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const onSubmit = async()=>{
    setLoaderVisible(true)
    const result = await dispatch(getGuard({email:email.toLowerCase(),password:password}))
    if(!result.payload.id){
      setLoaderVisible(false)
      setError(true)
    }

  }
  
  const handleRecoverPassword = ()=>{
    navigate("/recover")
  }
  return (
    <>
    <View style={styles.container}>
    <View>
    <Image 
        source={require('../../assets/logo.png')}
        style={styles.image}
      />
    </View>

      
      <Text style={styles.title}>Iniciar Sesión</Text>
      <View style= {styles.viewInput}>
      
      <TextInput 
        style={styles.input}
        value = {email} 
        onChangeText = {(e)=>setEmail(e)}
        placeholder="email" 
      />
            {/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) || email === "" ? (
       null
      ) : (
        <Text style={styles.error}>El campo debe ser un email</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="contraseña"
        secureTextEntry={true}
        value = {password} 
        onChangeText = {(e)=>setPassword(e)}
      />
      {error ? <Text style={styles.error} >Email o contraseña inválidos. </Text> : null}

      <TouchableWithoutFeedback>
        <Text onPress={handleRecoverPassword} style={styles.text}>¿Olvidaste tu contraseña?</Text>
      </TouchableWithoutFeedback>
      </View>

      <TouchableHighlight disabled = {
        !(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) && password)
       } underlayColor={"#283492"} onPress={onSubmit} style={ !(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) && password) ? styles.buttonDisabled : styles.button } >
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableHighlight>
    </View>
    { loaderVisible ? <AppLoader />:null}
    </>
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
  viewInput: {
    alignSelf: "stretch",
    alignItems: "center",
    height: 150,
  },
  input: {
    borderColor: "#808080",
    borderWidth: 2,
    height: 40,
    marginVertical: 5,
    alignSelf: "stretch",
    paddingHorizontal: 30,
    marginHorizontal: 40,
    marginBottom:22,
    borderRadius: 15,
  },
  button: {
    alignSelf: "stretch",
    backgroundColor: "#B9158F",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 120,
    marginTop: 80,
    borderRadius: 20,
  },
  buttonDisabled: {
    alignSelf: "stretch",
    backgroundColor: "grey",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 120,
    marginTop: 80,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  text: {
    color: "#283492",
    paddingTop: 30,
    paddingLeft: 110,
    textDecorationLine: "underline"

  },
  image: {
    height: 100,
    width: 100,
    marginBottom: 20,
    tintColor: "#283492",
  },
  error: {
    fontSize: 12,
    color: "red",
    width: 200,
    position: "absolute",
    top : 50,
  },
});

export default Login;
