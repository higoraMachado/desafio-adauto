import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import FeedScreen from '../screens/FeedScreen';
import NovoPostScreen from '../screens/NovoPostScreen';
import PerfilScreen from '../screens/PerfilScreen';
import RegistroScreen from '../screens/RegistroScreen';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#7C3AED',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          backgroundColor: '#F3F4F6',
        },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'DevGram' }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
      <Stack.Screen name="Feed" component={FeedScreen} options={{ title: 'Feed' }} />
      <Stack.Screen name="NovoPost" component={NovoPostScreen} options={{ title: 'Novo Post' }} />
      <Stack.Screen name="Perfil" component={PerfilScreen} options={{ title: 'Perfil' }} />
      <Stack.Screen
  name="Registro"
  component={RegistroScreen}
  options={{ title: 'Criar conta' }}
/>
      
    </Stack.Navigator>
  );
}
