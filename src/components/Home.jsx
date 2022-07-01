import { NavigationContainer } from "@react-navigation/native";
import Tabs from './Tabs';
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";


const Home = () => {
  const MyTheme = {
    dark: false,
    colors: {
      primary: "#ffffff",
      background: "rgb(242, 242, 242)",
      card: "#1976D2",
      text: "rgb(242, 242, 242)",
      border: "rgb(199, 199, 204)",
      // notification: 'rgb(255, 69, 58)',
    },
  };

  return (
    <View style={styles.container}>
    <StatusBar style="light" />

    <NavigationContainer theme={MyTheme}>
    <Tabs/>
   </NavigationContainer>
   </View>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default Home