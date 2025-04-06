// screens/SettingsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

export default function SettingsScreen() {
  const [contacts, setContacts] = useState([]); 
  const [loading, setLoading] = useState(true);

  // Fonction pour récupérer les contacts depuis l'API
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setContacts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des contacts", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des Contacts</Text>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}  // Utilise l'ID pour la clé unique
        renderItem={({ item }) => (
          <View style={styles.contactItem}>
            <Text style={styles.contactText}>{item.title}</Text>
            <Text>{item.id}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 20
  },
  title: { 
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  contactItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    width: '100%',
  },
  contactText: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});
