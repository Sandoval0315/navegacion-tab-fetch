// src/screens/Home.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Buttons from '../components/Buttons';
import { AuthContext } from "../context/AuthContext"; 

export default function Home({ navigation }) {
  const { user, logout } = useContext(AuthContext);

  const irShowUsers = () => {
    navigation.navigate('ShowUser');
  };

  const irProducts = () => {
    navigation.navigate('Products');
  };

  const handleLogOut = async () => {
    await logout(); 
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/user.jpeg')}
        style={styles.image}
      />
      <Text style={styles.title}>
        Bienvenido{user ? `, ${user}` : ''}
      </Text>
      <Text style={styles.subtitle}>
        Explora nuestra aplicación móvil con navegación moderna y diseño atractivo
      </Text>
      <Buttons
        text='Ver todos los usuarios'
        action={irShowUsers}
      />
      <Buttons
        text='Ver productos de la tienda'
        action={irProducts}
      />
      <Buttons
        text='Cerrar Sesión'
        action={handleLogOut}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9', // Gris claro azulado
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#1E293B', // Azul oscuro
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    marginVertical: 10,
    marginBottom: 30,
    color: '#64748B', // Gris azulado
    lineHeight: 24,
  },
});