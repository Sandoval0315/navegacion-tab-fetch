// src/hooks/useFetchProducts.js
import { useState, useEffect } from "react";
import { Alert } from "react-native";

const useFetchProducts = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProductos = async () => {
    setLoading(true);
    try {
      // Cambia esta URL por la de tu API local si tienes una
      const response = await fetch("https://retoolapi.dev/zZhXYF/movil");
      const data = await response.json();
      
      // Simulamos productos si la API no tiene productos
      const productosSimulados = [
        {
          _id: 1,
          name: "iPhone 14 Pro",
          description: "El smartphone más avanzado con chip A16 Bionic",
          price: 999,
          stock: 25,
          image: "https://via.placeholder.com/300x300/6366F1/white?text=iPhone+14"
        },
        {
          _id: 2,
          name: "MacBook Air M2",
          description: "Laptop ultradelgada con chip M2 de Apple",
          price: 1199,
          stock: 15,
          image: "https://via.placeholder.com/300x300/10B981/white?text=MacBook+Air"
        },
        {
          _id: 3,
          name: "AirPods Pro",
          description: "Auriculares inalámbricos con cancelación de ruido",
          price: 249,
          stock: 50,
          image: "https://via.placeholder.com/300x300/F59E0B/white?text=AirPods+Pro"
        },
        {
          _id: 4,
          name: "iPad Pro 12.9",
          description: "Tablet profesional con pantalla Liquid Retina XDR",
          price: 1099,
          stock: 20,
          image: "https://via.placeholder.com/300x300/8B5CF6/white?text=iPad+Pro"
        },
        {
          _id: 5,
          name: "Apple Watch Series 8",
          description: "Smartwatch con sensor de temperatura y GPS",
          price: 399,
          stock: 30,
          image: "https://via.placeholder.com/300x300/EF4444/white?text=Apple+Watch"
        }
      ];
      
      setProductos(productosSimulados);
    } catch (error) {
      console.error("Error al cargar productos:", error);
      Alert.alert("Error", "No se pudieron cargar los productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return {
    productos,
    loading,
    fetchProductos,
  };
};

export default useFetchProducts;