// screens/RegisterScreen.js
import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);

  const handleRegister = async () => {
    const response = await register(email, password);
    if (response) {
      alert('Un email de confirmation vous a été envoyé.');
      navigation.navigate('Confirm', { email });
    } else {
      alert('Erreur lors de l’inscription.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email :</Text>
      <TextInput value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" />
      <Text>Mot de passe :</Text>
      <TextInput secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
      <Button title="S'inscrire" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { borderWidth: 1, padding: 8, marginVertical: 10 }
});

export default RegisterScreen;
