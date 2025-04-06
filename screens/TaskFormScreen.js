// screens/TaskFormScreen.js
import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';


export default function TaskFormScreen({ navigation, route }) {
  const [taskName, setTaskName] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  // Fonction pour ajouter la tâche et revenir à l'écran précédent
  const addTask = () => {
    if (taskName && taskTime && taskDescription) {
      // On passe les données à l'écran précédent en utilisant navigation
      route.params.addTask({ taskName, taskTime, taskDescription });
      navigation.goBack();
    } else {
      alert('Veuillez remplir tous les champs!');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
      label="Tâche"
      // placeholder="ex:Ménage"
      value={taskName}
      onChangeText={setTaskName}
    />
      <TextInput
        label="Heure de réalisation"
        // placeholder="ex:8:00"
        value={taskTime}
        onChangeText={setTaskTime}
      />
      <TextInput
        label="Description"
        value={taskDescription}
        onChangeText={setTaskDescription}
      />
      <Button title="Enregistrer" onPress={addTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
});
