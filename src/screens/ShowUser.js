
// src/screens/ShowUser.js
import React, { useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import CardUser from "../components/Users/CardUser";
import useFetchUser from "../hooks/useFetchUser";
import { useFocusEffect } from "@react-navigation/native";

const ShowUser = ({ navigation }) => {
  const { usuarios, loading, fetchUsuarios, deleteUser } = useFetchUser();

  useFocusEffect(
    useCallback(() => {
      fetchUsuarios();
    }, [])
  );
  
  const irEditar = (user) => {
    navigation.navigate("AddUser", { user });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lista de Usuarios</Text>
        <Text style={styles.subtitle}>
          Gestiona los usuarios registrados en el sistema
        </Text>
        {!loading && (
          <Text style={styles.counterText}>
            Total: {usuarios.length} usuarios
          </Text>
        )}
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#6366F1"
          style={{ marginTop: 50 }}
        />
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(user) => user.id.toString()}
          renderItem={({ item }) => (
            <CardUser user={item} irEditar={irEditar} deleteUser={deleteUser} />
          )}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },
  header: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 10,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E293B",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 15,
    lineHeight: 22,
  },
  counterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6366F1",
    textAlign: "center",
    backgroundColor: '#EEF2FF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'center',
  },
});

export default ShowUser;