import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { Navigate } from "react-router-native";
import { useNavigate } from "react-router-native";

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate("/")
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
      <TouchableHighlight underlayColor={"#1976D2"} onPress={onSubmit} style={styles.button}>
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
    color: "#1976D2",
    paddingTop: 10,
    paddingLeft: 110,
    textDecorationLine: "underline",
  },
  button: {
    alignSelf: "stretch",
    backgroundColor: "#9C27B0",
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
});

export default NewPassword;
