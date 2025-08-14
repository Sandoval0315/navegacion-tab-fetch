
// src/screens/Products.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import Buttons from '../components/Buttons';
import { AuthContext } from "../context/AuthContext"; 
import useFetchProducts from '../hooks/useFetchProducts';
import ProductCard from '../components/Products/ProductCard'

export default function Products({ navigation }) {
  const { user } = useContext(AuthContext);
  const { productos, loading, fetchProductos } = useFetchProducts();

  const goBackHome = () => {
    navigation.navigate('TabNavigator');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/user.jpeg')}
          style={styles.image}
        />
        <Text style={styles.title}>
          Productos Destacados
        </Text>
        <Text style={styles.subtitle}>
          Descubre nuestra colección especial de productos seleccionados
        </Text>
      </View>
      
      <Buttons text='← Regresar' action={goBackHome} />
  
      <FlatList
        data={productos}
        keyExtractor={(item) => item._id}
        renderItem={ProductCard}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 15,
    borderRadius: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1E293B',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#64748B',
    lineHeight: 22,
  },
});