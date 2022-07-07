import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  Modal,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../state/guards";
import { useState,useEffect } from "react";
import { setLicenses } from "../state/licenses";

const Profile = () => {
  const dispatch = useDispatch();
  const guard = useSelector((state) => state.guard);
  const [modalVisible, setModalVisible] = useState(false);
  const onSubmit = () => {
    dispatch(logout());
  };
  const modalHandle = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(()=>{

    dispatch(setLicenses(guard.id))    
  },[])

  return guard.id ? (
    <View style={styles.container}>
      <Modal
        style={styles.container}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>LICENCIAS</Text>
            <Pressable
              style={[styles.buttonModal, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>CERRAR</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Image
        style={styles.image}
        source={{
          url: "https://www.depo.com.ar/__export/1594732735391/sites/cronica/img/2020/07/14/messi_crop1594732203781.png_792575817.png",
        }}
      />

      <View>
        <Text style={styles.name}>
          {guard.name.toUpperCase()} {guard.lastName.toUpperCase()}
        </Text>
        <Text style={styles.subtitle}>Email:</Text>
        <Text>{guard.email}</Text>
        <Text style={styles.subtitle}>Dirección:</Text>
        <Text>
          {guard.street.toUpperCase()} {guard.number}, 
          {guard.province.toUpperCase()}
        </Text>
      </View>
      <TouchableHighlight style={styles.button}>
        <Text style={styles.buttonText} onPress={modalHandle}>
          Ver licencias
        </Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.logout}>
        <Text style={styles.buttonText} onPress={onSubmit}>
          Cerrar Sesión
        </Text>
      </TouchableHighlight>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 40,
    color: "#9C27B0",
  },
  modalText: {
    fontWeight:"bold",
  },
  button: {
    alignSelf: "stretch",
    backgroundColor: "#9C27B0",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 120,
    marginTop: 40,
    borderRadius: 20,
  },
  buttonModal: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  image: {
    height: 250,
    width: 250,
    borderRadius: 250 / 2,
    marginTop: 70,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  subtitle:{
    marginTop:20,
    fontWeight: "bold"
  },
  logout: {
    alignSelf: "stretch",
    backgroundColor: "#9C27B0",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 120,
    marginTop: 10,
    borderRadius: 20,
  },
});

export default Profile;
