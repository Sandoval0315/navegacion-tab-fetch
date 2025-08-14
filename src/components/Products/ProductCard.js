import { View, Text, StyleSheet, Image } from 'react-native';

export default function ProductCard({ item }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.name}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <Text style={styles.productPrice}>Precio: ${item.price}</Text>
      <Text style={styles.productStock}>Stock: {item.stock}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 12,
    marginHorizontal: 20,
    borderRadius: 16,
    elevation: 4,
    width: 350,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    borderTopWidth: 3,
    borderTopColor: '#F59E0B', // Ámbar vibrante
  },
  productImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    borderRadius: 12,
    marginBottom: 12,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  productDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    textAlign: 'center',
    lineHeight: 20,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669', // Verde
    marginBottom: 4,
  },
  productStock: {
    fontSize: 14,
    color: '#9CA3AF',
  }
});