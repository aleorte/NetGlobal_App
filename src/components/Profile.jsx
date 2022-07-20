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
import { useState, useEffect } from "react";
import { setLicenses } from "../state/licenses";
import LicensesList from "./LicensesList";

const Profile = () => {
  const dispatch = useDispatch();
  const guard = useSelector((state) => state.guard);
  const licenses = useSelector((state) => state.license);
  const [modalVisible, setModalVisible] = useState(false);
  const onSubmit = () => {
    dispatch(logout());
  };
  const modalHandle = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    console.log(guard);
    dispatch(setLicenses(guard.id));
  }, []);

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
            <View style={styles.licensesView}>
              {licenses?.map((license) => {
                return <LicensesList key={license.id} license={license} />;
              })}
            </View>
            <Pressable
              style={[styles.buttonModal, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>CERRAR</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {guard.image !== "" ? (
        <Image
          style={styles.image}
          source={{
            uri: guard.image,
          }}
        />
      ) : (
        <Image
          style={styles.image}
          source={require("../../assets/guardia.png")}
        />
      )}

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
          Mis licencias
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
  licensesView: {
    width: 250,
    marginVertical: 30,
  },
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
    color: "#B9158F",
  },
  modalText: {
    fontWeight: "bold",
  },
  button: {
    alignSelf: "stretch",
    backgroundColor: "#B9158F",
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
    elevation: 2,
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
    backgroundColor: "#B9158F",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 20,
    fontWeight: "bold",
  },
  logout: {
    alignSelf: "stretch",
    backgroundColor: "#B9158F",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 120,
    marginTop: 10,
    borderRadius: 20,
  },
});

export default Profile;
