import React from 'react';
import Main from "./pages/main.js";
import Product from './pages/product.js';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Routes = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Main" 
          component={Main}
          options={{ 
            title: 'JSHunt',
            headerStyle: {
              backgroundColor: '#DA552F',
            },
            headerTintColor: '#FFF',
          }}
        />
        <Stack.Screen 
          name="Product"
          component={Product}
          options={{ 
            headerStyle: {
              backgroundColor: '#DA552F',
            },
            headerTintColor: '#FFF',
          }}          
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes;