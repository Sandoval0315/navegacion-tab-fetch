// src/components/Buttons.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Buttons = ({ text, action }) => {
  return (
    <TouchableOpacity onPress={action} style={styles.boton}>
      <Text style={styles.texto}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boton: {
    backgroundColor: "#6366F1", // Indigo vibrante
    padding: 15,
    borderRadius: 15,
    marginVertical: 8,
    marginHorizontal: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  texto: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Buttons;