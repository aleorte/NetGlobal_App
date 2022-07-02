import {
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { useNavigate } from "react-router-native";

const ConfirmCode = () => {
  const navigate = useNavigate();

  const handlePrevious = () => {
    navigate("/recover");
  };
  const handleNext = () => {
    navigate("/confirm");
  };
  return (
    <View style = {styles.container}>
      <Text  style = {styles.title}>Ingrese el código enviado a su email:</Text>
      <View style = {styles.codeContainer}>
      <TextInput maxLength={1} style = {styles.input} keyboardType="numeric"/>
      <TextInput maxLength={1} style = {styles.input} keyboardType="numeric" />
      <TextInput maxLength={1} style = {styles.input} keyboardType="numeric" />
      <TextInput maxLength={1} style = {styles.input}  keyboardType="numeric" />
      </View>
      <View style = {styles.buttons}>
        <TouchableWithoutFeedback onPress={handlePrevious}>
        <Text style = {styles.previous}>
          Anterior
        </Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={handleNext}>
        <Text style = {styles.next}>
          Siguiente
        </Text>
        </TouchableWithoutFeedback>
        </View>
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
    codeContainer: {
        flexDirection: "row",
        marginTop:10,
      },
    input: {
      borderColor: "#808080",
      borderWidth: 2,
      height: 50,
      width: 50,
      borderRadius:15,
      marginVertical: 5,
      marginHorizontal: 5,
      textAlign: "center",
      color: "#9C27B0",
      fontWeight:"bold",
      fontSize: 20,
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
      textDecorationLine: "underline"
    },
    next: {
      color: "#1976D2",
      fontWeight: "bold",
      textDecorationLine: "underline"
  
    },
  
    title: {
      fontSize: 15,
      paddingBottom: 20,
    },
  });

export default ConfirmCode;
