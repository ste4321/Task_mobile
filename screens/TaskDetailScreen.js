// screens/TaskDetailScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function TaskDetailScreen({ route, navigation }) {
  const { task, onMark } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.taskName}</Text>
      <Text>🕒 Heure : {task.taskTime}</Text>
      <Text>📝 Description : {task.taskDescription}</Text>

      <View style={styles.buttons}>
        <Button
          title="✅ Marquer comme faite"
          onPress={() => {
            onMark(true);
            navigation.goBack();
          }}
        />
        <View style={{ height: 10 }} />
        <Button
          title="❌ Marquer comme non faite"
          color="red"
          onPress={() => {
            onMark(false);
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  buttons: { marginTop: 30 },
});
