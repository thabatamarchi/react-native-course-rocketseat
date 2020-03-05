import React, { useEffect } from 'react';
import { WebView } from 'react-native-webview';

const Product = ({navigation, route}) => {
  const {product} = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: product.title
    })
  }, [])
 
  return(
    <WebView
      source={{ uri: product.url }}
    />    
  )
};


export default Product; 