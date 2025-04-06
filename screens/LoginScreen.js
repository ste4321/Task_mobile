// screens/LoginScreen.js
import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    const success = await login(email, password);
    if (!success) {
      alert('Erreur de connexion. Vérifiez vos identifiants.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email :</Text>
      <TextInput value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" />
      <Text>Mot de passe :</Text>
      <TextInput secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
      <Button title="Se connecter" onPress={handleLogin} />
      <Button title="Créer un compte" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { borderWidth: 1, padding: 8, marginVertical: 10 }
});

export default LoginScreen;
