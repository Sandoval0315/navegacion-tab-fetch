
// src/hooks/useFetchUser.js
import { useState, useEffect } from "react";
import { Alert } from "react-native";

const useFetchUser = () => {
  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [correo, setCorreo] = useState("");
  
  // Estados para la lista de usuarios
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const cleanState = () => {
    setNombre("");
    setEdad("");
    setCorreo("");
  }

  // Obtener usuarios desde la API
  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://retoolapi.dev/zZhXYF/movil");
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      Alert.alert("Error", "No se pudieron cargar los usuarios");
    } finally {
      setLoading(false);
    }
  };

  // Guardar nuevo usuario en la API o editar 
  const handleGuardar = async (user) => {
    if (!nombre || !edad || !correo) {
      Alert.alert("Error", "Por favor, completa todos los campos");
      return;
    }

    const usuarioData = {
      nombre,
      edad: parseInt(edad),
      correo,
    };

    try {
      let response;
      if (user?.id) {
        // Editar usuario
        response = await fetch(
          `https://retoolapi.dev/zZhXYF/movil/${user.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(usuarioData),
          }
        );
        if (response.ok) {
          Alert.alert("✅ Éxito", "Usuario actualizado correctamente");
        } else {
          Alert.alert("❌ Error", "No se pudo actualizar el usuario");
        }
      } else {
        // Crear nuevo usuario
        response = await fetch("https://retoolapi.dev/zZhXYF/movil", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(usuarioData),
        });
        if (response.ok) {
          Alert.alert("✅ Éxito", "Usuario creado correctamente");
        } else {
          Alert.alert("❌ Error", "No se pudo crear el usuario");
        }
      }
      
      // Limpiar campos y recargar lista
      cleanState();
      fetchUsuarios();
    } catch (error) {
      console.error(error);
      Alert.alert("❌ Error", "Ocurrió un error al guardar el usuario");
    }
  };

  const deleteUser = async (id) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que quieres eliminar este usuario?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              const response = await fetch(`https://retoolapi.dev/zZhXYF/movil/${id}`, {
                method: "DELETE",
              });
              if (!response.ok) {
                Alert.alert("❌ Error", "Error al eliminar usuario");
                return;
              }
              Alert.alert("✅ Éxito", "Usuario eliminado correctamente");
              fetchUsuarios();
            } catch (error) {
              console.log("Error al eliminar:", error);
              Alert.alert("❌ Error", "Hubo un error al eliminar el usuario");
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  // Ejecutar al cargar componente
  useEffect(() => {
    fetchUsuarios();
  }, []);

  return {
    nombre,
    setNombre,
    edad,
    setEdad,
    correo,
    setCorreo,
    handleGuardar,
    usuarios,
    loading,
    fetchUsuarios,
    deleteUser,
    cleanState
  };
};

export default useFetchUser;