import {View,Text,StyleSheet,Image,TouchableHighlight} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../state/guards';

const Profile = () => {
  const dispatch = useDispatch();
  const guard = useSelector(state=>state.guard)
  const onSubmit = ()=>{
    dispatch(logout())
  }

  return guard.id ? (
    <View style ={styles.container}>
  
      <Image style ={styles.image} source={{
          url: 'https://www.depo.com.ar/__export/1594732735391/sites/cronica/img/2020/07/14/messi_crop1594732203781.png_792575817.png',
        }}/>
      
      <View>
        <Text style={styles.name}>{guard.name.toUpperCase()} {guard.lastName.toUpperCase()}</Text>
        <Text>HORAS TRABAJADAS</Text>
      </View>
      <TouchableHighlight  style={styles.button}>
        <Text style={styles.buttonText} onPress={onSubmit}>Cerrar Sesión</Text>
      </TouchableHighlight>
    </View>
  ) : null
}

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
  image: {
    height:250,
    width:250,
    borderRadius: 250/2,
    marginTop:70,
    borderColor:"#1976D2",
    borderWidth: 5,

  },
});

export default Profile
