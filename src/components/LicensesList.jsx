import React from "react";
import { Text, StyleSheet } from "react-native";

const LicensesList = ({ license }) => {
  return <Text style={styles.license}>{license.name}</Text>;
};

const styles = StyleSheet.create({
  license: {
    fontSize: 15,
    alignSelf: "center",
  },
});

export default LicensesList;
