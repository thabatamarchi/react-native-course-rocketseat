import React, { useEffect, useCallback, useState } from 'react';
import api from '../services/api';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const Main = ({navigation}) => {
  const [ products, setProducts] = useState([]);
  const [ info, setInfo ] = useState({});
  const [page, setPage] = useState(1)

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = useCallback(async (page = 1) => {
    try {
      const response = await api.get(`/products?page=${page}`);
      const { docs, ...productInfo } = response.data;

      setInfo(productInfo);
      setProducts([...products, ...docs]);
      setPage(parseInt(productInfo.page, 10))
    } catch (err) {
      console.error(err)
    }
  }, [products]);

  const loadMore = useCallback(() => {
    if(page === info.pages) return
    const pageNumber = page + 1;
    loadProducts(pageNumber);
  }, [info, loadProducts, page]);

  const renderItem = ({item}) => (
    <View style={styles.productContainer}>
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <TouchableOpacity 
        style={styles.productButton} 
        onPress={() => {
          navigation.navigate("Product", { product: item });
        }}>
        <Text style={styles.productButtonText}>Acessar</Text>
      </TouchableOpacity>
    </View> 
  ); 

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={products}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa"
  }, 

  list: {
    padding: 20
  },

  productContainer : {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5, 
    padding: 20, 
    marginBottom: 20,
  },

  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  }, 

  productDescription: {
    fontSize: 16,
    color: "#999",
    marginTop: 5,
    lineHeight: 24,     
  },

  productButton: {
    height: 42, 
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#DA552F',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center', 
    marginTop: 10,
  },

  productButtonText: {
    fontSize: 16, 
    color: '#DA552F',
    fontWeight: 'bold',
  }

});

export default Main;