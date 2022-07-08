import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-native";
import axios from "axios";

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { email } = useParams();
  const navigate = useNavigate();

  const onSubmit = async () => {
    const result = await axios.put("http://localhost:3001/new-password", {
      password: newPassword,
      email: email,
    });
    if (result.status == 200) navigate("/");
    else console.log("error");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingresar nueva contraseña:</Text>
      <TextInput
        style={styles.input}
        placeholder="contraseña"
        secureTextEntry={true}
        value={newPassword}
        onChangeText={(e) => setNewPassword(e)}
      />
      <Text style={styles.title}>Confirmar nueva contraseña:</Text>
      <TextInput
        style={styles.input}
        placeholder="confirmar contraseña"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={(e) => setConfirmPassword(e)}
      />
      {newPassword === confirmPassword && newPassword !== "" ? (
        <Text style={styles.errorOk}>Las contraseñas deben ser iguales.</Text>
      ) : (
        <Text style={styles.error}>Las contraseñas deben ser iguales.</Text>
      )}
      {/\d/.test(newPassword) ? (
        <Text style={styles.errorOk}>Al menos 1 número.</Text>
      ) : (
        <Text style={styles.error}>Al menos 1 número.</Text>
      )}
      {/[A-Z]/.test(newPassword) ? (
        <Text style={styles.errorOk}>Al menos 1 letra mayúscula.</Text>
      ) : (
        <Text style={styles.error}>Al menos 1 letra mayúscula.</Text>
      )}
      {newPassword.length >= 8 ? (
        <Text style={styles.errorOk}>Al menos 8 caracteres.</Text>
      ) : (
        <Text style={styles.error}>Al menos 8 caracteres.</Text>
      )}
      <TouchableHighlight
        disabled={
          !(
            newPassword.length >= 8 &&
            /[A-Z]/.test(newPassword) &&
            /\d/.test(newPassword) &&
            newPassword === confirmPassword
          )
        }
        underlayColor={"#283492"}
        onPress={onSubmit}
        style={ 
          !(
            newPassword.length >= 8 &&
            /[A-Z]/.test(newPassword) &&
            /\d/.test(newPassword) &&
            newPassword === confirmPassword
          )
          ? styles.buttonDisabled : styles.button }      >
        <Text style={styles.buttonText}>Cambiar Contraseña</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
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
    marginBottom: 30,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  text: {
    color: "#283492",
    paddingTop: 10,
    paddingLeft: 110,
    textDecorationLine: "underline",
  },
  button: {
    alignSelf: "stretch",
    backgroundColor: "#B9158F",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 80,
    marginTop: 50,
    borderRadius: 20,
  },

  buttonDisabled: {
    alignSelf: "stretch",
    backgroundColor: "grey",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 80,
    marginTop: 50,
    borderRadius: 20,
  },

  title: {
    fontSize: 15,
    paddingRight: 100,
    paddingBottom: 10,
  },
  error: {
    fontSize: 12,
    paddingTop: 20,
    color: "red",
    width: 200,
  },
  errorOk: {
    fontSize: 12,
    paddingTop: 20,
    color: "green",
    width: 200,
  },
});

export default NewPassword;
