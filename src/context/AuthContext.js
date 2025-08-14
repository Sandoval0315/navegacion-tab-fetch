import React, { createContext, useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid, Alert, Platform } from "react-native";

const AuthContext = createContext(null);

export { AuthContext };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Para desarrollo local, cambiar por tu IP
  const API_URL = "http://192.168.1.23:4000/api";

  // Mostrar mensaje multiplataforma
  const showMessage = (message, isError = false) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert(isError ? "Error" : "Éxito", message);
    }
  };

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          setAuthToken(token);
        }
      } catch (error) {
        console.error("Error loading token:", error);
      }
    };
    loadToken();
  }, []);

  const clearSession = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setUser(null);
      setAuthToken(null);
    } catch (error) {
      console.error("Error clearing session:", error);
    }
  };

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      
      // Intentar logout en el servidor
      await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      await clearSession();
      setLoading(false);
      showMessage("Sesión cerrada correctamente");
    }
  }, [API_URL]);

  const login = async (email, password) => {
    // Validaciones básicas
    if (!email || !password) {
      showMessage("Por favor completa todos los campos", true);
      return false;
    }

    if (!email.includes('@')) {
      showMessage("Por favor ingresa un email válido", true);
      return false;
    }

    try {
      setLoading(true);
      
      // Para desarrollo: credenciales de prueba
      if (email === "admin@test.com" && password === "123456") {
        const mockUserData = {
          token: "mock-token-123",
          userName: "Administrador",
          email: email
        };
        
        await AsyncStorage.setItem("token", mockUserData.token);
        setAuthToken(mockUserData.token);
        setUser(mockUserData.userName);
        showMessage("¡Bienvenido! Inicio de sesión exitoso");
        return true;
      }

      // Llamada real a la API
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem("token", data.token);
        setAuthToken(data.token);
        setUser(data.userName);
        showMessage(`¡Bienvenido ${data.userName}!`);
        return true;
      } else {
        showMessage(data.message || "Credenciales incorrectas", true);
        return false;
      }
    } catch (error) {
      console.error("Error during login:", error);
      showMessage("Error de conexión. Usando credenciales de prueba: admin@test.com / 123456", true);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      
      const response = await fetch(`${API_URL}/registerClients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      
      if (response.ok) {
        showMessage("Cuenta registrada correctamente");
        return true;
      } else {
        const data = await response.json();
        showMessage(data.message || "Error al registrar", true);
        return false;
      }
    } catch (error) {
      console.error("Error durante el registro:", error);
      showMessage("Error de conexión al registrar", true);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authToken,
        loading,
        login,
        logout,
        register,
        API: API_URL,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};