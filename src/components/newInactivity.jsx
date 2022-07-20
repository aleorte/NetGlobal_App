import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import {
  Text,
  View,
  Button,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getInactivities } from "../state/inactivities";
import InactivitiesCard from "./InactivitiesCard";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Inactivities = () => {
  const dispatch = useDispatch();
  const Inactivities = useSelector((state) => state.inactivities);
  const guard = useSelector((state) => state.guard);

  useEffect(() => {
    dispatch(getInactivities({ guardId: guard.id }));
  }, []);

  // const onSubmit = async()=>{
  //   const newInactivity = await axios.post('http://localhost:3001/inactivities/guard/1', {
  //     startDate,
  //     endDate
  //   })
  // }

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [text, setText] = useState([]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    setText([date]);
    hideDatePicker();
  };

  return (
    <ScrollView style={styles.containter}>
      <Text style={styles.text}>PRÓXIMAS TAREAS: </Text>
      {Inactivities?.map((Inactivity) => {
        return <InactivitiesCard Inactivity={Inactivity} key={Math.random()} />;
      })}
      {console.log("Inicio de Inactividad: ", text)}
      {/* <Text> Inicio de Inactividad: {text}</Text>  */}
      <View>
        <Button title="Show Date Picker" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </ScrollView>
  );
};
export default Inactivities;
