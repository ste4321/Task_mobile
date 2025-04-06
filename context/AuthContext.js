// context/AuthContext.js
import React, { createContext, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext();

const API_URL = 'http://192.168.197.221:8000/api'; // Remplacez par l'URL de votre backend

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      // En cas de succès, on stocke le token et les infos utilisateur
      const { token, user: userData } = response.data;
      setUser(userData);
      // Stocker le token en toute sécurité
      await SecureStore.setItemAsync('userToken', token);
      return true;
    } catch (error) {
      console.error('Erreur lors de la connexion : ', error.response?.data || error.message);
      return false;
    }
  };

  const register = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/register`, { email, password });
      // Le backend envoie un email avec un code de confirmation à 5 chiffres
      return response.data; // Vous pouvez retourner des infos pour guider l'utilisateur vers la confirmation
    } catch (error) {
      console.error('Erreur lors de l’inscription : ', error.response?.data || error.message);
      return false;
    }
  };

  const confirmCode = async (email, code) => {
    try {
      const response = await axios.post(`${API_URL}/confirm`, { email, code });
      // Si le code est correct, on authentifie l’utilisateur et stocke le token
      const { token, user: userData } = response.data;
      setUser(userData);
      await SecureStore.setItemAsync('userToken', token);
      return true;
    } catch (error) {
      console.error('Erreur lors de la confirmation : ', error.response?.data || error.message);
      return false;
    }
  };

  const logout = async () => {
    setUser(null);
    await SecureStore.deleteItemAsync('userToken');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, confirmCode, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
