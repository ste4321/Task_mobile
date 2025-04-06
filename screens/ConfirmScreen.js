// screens/ConfirmScreen.js
import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const ConfirmScreen = ({ route, navigation }) => {
  const { email } = route.params;
  const [code, setCode] = useState('');
  const { confirmCode } = useContext(AuthContext);

  const handleConfirm = async () => {
    const success = await confirmCode(email, code);
    if (success) {
      alert('Confirmation réussie');
    } else {
      alert('Code invalide');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Entrez le code de confirmation envoyé à {email}</Text>
      <TextInput
        value={code}
        onChangeText={setCode}
        style={styles.input}
        keyboardType="numeric"
      />
      <Button title="Confirmer" onPress={handleConfirm} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { borderWidth: 1, padding: 8, marginVertical: 10 }
});

export default ConfirmScreen;
