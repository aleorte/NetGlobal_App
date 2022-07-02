import { Text, View ,TextInput,StyleSheet,TouchableWithoutFeedback} from "react-native";
import { useState } from "react";
import { useNavigate } from "react-router-native";

const ForgotPassword = () => {
  const [email,setEmail] = useState();
  const navigate = useNavigate();

  const handlePrevious=()=>{
    navigate("/")
  }
  const handleNext=()=>{
    navigate("/code")
  }

  return (
    <View style= {styles.container}>
        <Text style= {styles.title}>
        Ingrese el mail de la cuenta a recuperar:
        </Text>
        <TextInput
          style = {styles.input}
          placeholder="email"
          value={email} 
          onChangeText = {(e)=>setEmail(e)}
        />
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
  )
}

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

export default ForgotPassword