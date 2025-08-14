import { StyleSheet, Text, View } from "react-native";
import Buttons from "../Buttons";

const CardUser = ({ user, deleteUser, irEditar }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{user.nombre}</Text>
      <Text style={styles.cardText}>Edad: {user.edad}</Text>
      <Text style={styles.cardText}>Correo: {user.correo}</Text>
      <Buttons text="Eliminar" action={() => deleteUser(user.id)} />
      <Buttons text="Editar usuario" action={() => irEditar(user)} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: "#10B981", // Verde esmeralda
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937", // Gris oscuro
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    color: "#6B7280", // Gris medio
    marginBottom: 4,
  },
});

export default CardUser;