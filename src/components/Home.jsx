import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./Tabs";
import { StyleSheet, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

const Home = () => {
  const MyTheme = {
    dark: false,
    colors: {
      primary: "#ffffff",
      background: "white",
      card: "#283492",
      text: "rgb(242, 242, 242)",
      border: "rgb(199, 199, 204)",
    },
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <NavigationContainer theme={MyTheme}>
        <Tabs />
      </NavigationContainer>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default Home;
