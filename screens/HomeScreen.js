// screens/HomeScreen.js
import React, { useState, useEffect,useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';
import { DataTable } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([
    { taskName: 'Réunion projet', taskTime: '09:00', taskDescription: 'Réunion avec l’équipe pour discuter de l’avancement' },
    { taskName: 'Rédiger rapport', taskTime: '10:30', taskDescription: 'Finaliser le rapport hebdomadaire' },
    { taskName: 'Appel client', taskTime: '11:15', taskDescription: 'Appeler le client pour valider les exigences' },
    { taskName: 'Pause café', taskTime: '11:45', taskDescription: 'Petite pause bien méritée ☕' },
    { taskName: 'Développement', taskTime: '12:00', taskDescription: 'Coder les fonctionnalités de la page d’accueil' },
    { taskName: 'Déjeuner', taskTime: '13:00', taskDescription: 'Pause déjeuner' },
    { taskName: 'Tests unitaires', taskTime: '14:00', taskDescription: 'Écrire des tests pour les nouveaux composants' },
    { taskName: 'Correction bugs', taskTime: '15:00', taskDescription: 'Corriger les bugs rapportés' },
    { taskName: 'Révision code', taskTime: '16:00', taskDescription: 'Faire une revue du code des collègues' },
    { taskName: 'Documentation', taskTime: '17:00', taskDescription: 'Mettre à jour la documentation technique' },
    { taskName: 'Préparer présentation', taskTime: '18:00', taskDescription: 'Créer les slides pour la démo de demain' },
    { taskName: 'Email récapitulatif', taskTime: '18:30', taskDescription: 'Envoyer un email avec les points clés de la journée' },
    { taskName: 'Planification', taskTime: '19:00', taskDescription: 'Préparer les tâches du lendemain' },
    { taskName: 'Lecture technique', taskTime: '20:00', taskDescription: 'Lire un article sur React Native' },
    { taskName: 'Détente', taskTime: '21:00', taskDescription: 'Regarder une série ou lire un livre 📚' },
  ]);

  const [page, setPage] = useState(0);
  const [itemsPerPage] = useState(14);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // const [history, setHistory] = useState([]);
  const { markTask } = useContext(TaskContext);


  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, tasks.length);

  useEffect(() => {
    setPage(0);
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks([newTask,...tasks]);
  };

  const handleTaskPress = (task, index) => {
    setSelectedTask({ ...task, index });
    setModalVisible(true);
  };

  const handleMarkAsDone = () => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(selectedTask.index, 1);
    setTasks(updatedTasks);
    markTask({ ...selectedTask, done: true }, true);
    setModalVisible(false);
  };
  
  const handleMarkAsNotDone = () => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(selectedTask.index, 1);
    setTasks(updatedTasks);
    markTask({ ...selectedTask, done: false }, false);
    setModalVisible(false);
  };
  
  const filteredTasks = tasks.filter(task =>
    task.taskName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.taskDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.taskTime.includes(searchQuery)
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.searchAndAdd}>
        <TextInput
          placeholder="Rechercher..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('TaskForm', { addTask })}
        >
          <Text style={styles.addButtonText}>+ Tâche</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tableWrapper}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Tâche</DataTable.Title>
            <DataTable.Title>Heure</DataTable.Title>
            <DataTable.Title>Description</DataTable.Title>
          </DataTable.Header>

          <ScrollView style={{ maxHeight: 500 }}>
            {filteredTasks.slice(from, to).map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleTaskPress(item, index + from)}
              >
                <DataTable.Row>
                  <DataTable.Cell>{item.taskName}</DataTable.Cell>
                  <DataTable.Cell>{item.taskTime}</DataTable.Cell>
                  <DataTable.Cell>{item.taskDescription}</DataTable.Cell>
                </DataTable.Row>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(tasks.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} sur ${tasks.length}`}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={() => {}}
            showFastPaginationControls
            selectPageDropdownLabel={'Lignes par page'}
          />
        </DataTable>
      </View>

      {/* Modal de détail */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline', marginBottom: 10 }}>Détail </Text>
            <Text>Tâche : {selectedTask?.taskName}</Text>
            <Text>Heure : {selectedTask?.taskTime}</Text>
            <Text>Description : {selectedTask?.taskDescription}</Text>

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton]}
                onPress={handleMarkAsDone}
              >
                <Text style={{ color: 'green' }}>Fait ✅</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton]}
                onPress={handleMarkAsNotDone}
              >
                <Text style={{ color: 'red' }}>Non fait ❌</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  addButton: {
    padding: 10,
    backgroundColor: '#00adb5',
    borderRadius: 5,
    alignSelf: 'flex-end',
    // marginBottom: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  tableWrapper: {
    // flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  searchAndAdd: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
    // backgroundColor:"red"
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    height: 40,
  },
  
});
