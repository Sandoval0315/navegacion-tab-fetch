import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import useFetchUser from "../hooks/useFetchUser";

const AddUser = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const {
    nombre,
    edad,
    correo,
    setNombre,
    setEdad,
    setCorreo,
    handleGuardar,
    cleanState,
  } = useFetchUser();

  const route = useRoute();

  useEffect(() => {
    const userFromParams = route.params?.user;

    if (userFromParams) {
      console.log("✅ Usuario recibido:", userFromParams);
      setNombre(userFromParams.nombre || "");
      setEdad(String(userFromParams.edad || ""));
      setCorreo(userFromParams.correo || "");
      setEditingUser(userFromParams);
      setIsEditing(true);
    } else {
      console.log("⚠️ No se recibió el usuario desde la navegación");
      setEditingUser(null);
      setIsEditing(false);
    }
  }, [route.params]);

  const irShowUser = () => {
    navigation.navigate("ShowUser");
  };

  const cleanForm = () => {
    cleanState();
    setEditingUser(null);
    setIsEditing(false);
    irShowUser();
  };

  const handleSaveform = async () => {
    await handleGuardar(editingUser);
    setIsEditing(false);
    irShowUser();
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons 
              name={isEditing ? "create" : "person-add"} 
              size={40} 
              color="#6366F1" 
            />
          </View>
          <Text style={styles.title}>
            {isEditing ? "Editar Usuario" : "Agregar Usuario"}
          </Text>
          <Text style={styles.subtitle}>
            {isEditing
              ? "Modifica la información del usuario seleccionado"
              : "Ingresa la información del nuevo usuario"}
          </Text>
        </View>

        {/* Formulario */}
        <View style={styles.formCard}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nombre completo</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="person" size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Ingresa el nombre"
                value={nombre}
                onChangeText={setNombre}
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Edad</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="calendar" size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Ingresa la edad"
                value={edad}
                onChangeText={setEdad}
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Correo electrónico</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="mail" size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Ingresa el correo"
                value={correo}
                onChangeText={setCorreo}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* Botones */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.primaryButton} onPress={handleSaveform}>
              <Ionicons 
                name={isEditing ? "checkmark" : "save"} 
                size={20} 
                color="#FFF" 
                style={styles.buttonIcon}
              />
              <Text style={styles.primaryButtonText}>
                {isEditing ? "Actualizar" : "Guardar"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton} onPress={cleanForm}>
              <Ionicons 
                name="close" 
                size={20} 
                color="#6B7280" 
                style={styles.buttonIcon}
              />
              <Text style={styles.secondaryButtonText}>
                {isEditing ? "Cancelar" : "Limpiar"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Información adicional */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Ionicons name="information-circle" size={24} color="#10B981" />
            <Text style={styles.infoTitle}>Información</Text>
          </View>
          <Text style={styles.infoText}>
            • Todos los campos son obligatorios{'\n'}
            • El correo debe tener un formato válido{'\n'}
            • La edad debe ser un número válido{'\n'}
            • Los cambios se guardan automáticamente
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    backgroundColor: '#EEF2FF',
    padding: 15,
    borderRadius: 50,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 22,
  },
  formCard: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 25,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#1E293B",
  },
  buttonContainer: {
    marginTop: 10,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: "#6366F1",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  secondaryButton: {
    backgroundColor: "#F8FAFC",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  buttonIcon: {
    marginRight: 8,
  },
  primaryButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  secondaryButtonText: {
    color: "#6B7280",
    fontWeight: "600",
    fontSize: 16,
  },
  infoCard: {
    backgroundColor: "#ECFDF5",
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#10B981",
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#065F46",
    marginLeft: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#047857",
    lineHeight: 20,
  },
});

export default AddUser;