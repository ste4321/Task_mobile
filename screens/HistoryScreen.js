import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TaskContext } from '../context/TaskContext';

export default function HistoryScreen() {
  const { doneTasks, undoneTasks } = useContext(TaskContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tâches faites ✅</Text>
      {doneTasks.map((task, index) => (
        <Text key={`done-${index}`} style={{ textDecorationLine: 'line-through', color: 'gray', fontSize:14}}>
          ✅ {task.taskName} - {task.taskTime}
        </Text>
      ))}

      <Text style={[styles.title, { marginTop: 20 }]}>Tâches non faites ❌</Text>
      {undoneTasks.map((task, index) => (
        <Text key={`undone-${index}`} style={{ color: 'red',fontSize:14}}>
          ❌ {task.taskName} - {task.taskTime}
        </Text>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft:10,
  },
});