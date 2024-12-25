import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
const ProjectList = ({ navigation }) => {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const route = useRoute();
  // Récupération de l'ID de l'utilisateur passé dans la navigation
  const { utilisateur } = route.params;

  useEffect(() => {
    fetchProjects();
  }, [utilisateur]); // Ajouter 'utilisateur' comme dépendance
  
  
  const addProject = async () => {
    const projectData = { name: newProjectName, cheff: utilisateur };
  
    try {
      const response = await axios.post('https://c7e6-102-159-106-119.ngrok-free.app/project/project/create', projectData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.data && response.data.id) {
        // Si la création est réussie, récupère la liste complète des projets
        await fetchProjects(); // Appel pour synchroniser les données
        setNewProjectName('');
        setModalVisible(false);
      }
    } catch (error) {
      console.error('Erreur lors de la création du projet :', error);
      alert('Erreur lors de la création du projet.');
    }
  };
  
  const updateProject = async () => {
    try {
      const response = await axios.put(
        `https://c7e6-102-159-106-119.ngrok-free.app/project/project/update`,
        null,
        {
          params: {
            id: currentProject.id,
            name: newProjectName,
          },
          headers: { 'Content-Type': 'application/json' },
        }
      );
  
      if (response.status === 200) { // Appel pour synchroniser les données
        setNewProjectName(''); // Réinitialise le champ de texte
        setEditModalVisible(false); // Ferme le modal après la mise à jour
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du projet :', error);
      alert('Erreur lors de la mise à jour du projet.');
    }
  };
  
  
  const fetchProjects = async () => {
    try {
      setProjects([]); // Initialiser la liste à vide avant de récupérer
      // Récupérer la liste des projets depuis l'API
      const response = await axios.get(
        `https://c7e6-102-159-106-119.ngrok-free.app/project/project/${utilisateur}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (Array.isArray(response.data.project)) {
        setProjects(response.data.project); // Remplir la liste directement
      }else if(response.status == 200){
        if (response.data.project)
          setProjects([response.data.project]);
      }
      else {
        console.error('Erreur : La réponse de l\'API n\'est pas un tableau !');
      }
    } catch (error) {
      alert('Pas des projets.');
    }
  };
  

  // Afficher les informations du projet à modifier
  const openEditModal = (project) => {
    setCurrentProject(project);
    setNewProjectName(project.name);
    setEditModalVisible(true);
  };

  // Supprimer un projet
  const deleteProject = (id) => {
    axios.delete(`https://c7e6-102-159-106-119.ngrok-free.app/project/project/delete?id=${id}`)
      .then(() => {
        setProjects((prevProjects) => prevProjects.filter(project => project.id !== id)); // Retirer le projet de la liste
      })
      .catch(error => {
        console.error('Erreur lors de la suppression du projet!', error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.title2} >
      <Text style={styles.title}>Project List</Text>
      <TouchableOpacity onPress={() => fetchProjects()} style={styles.reload}>
      <Ionicons name="reload" size={26} color="blue" />
      </TouchableOpacity>
      </View>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.projectContainer}>
            <TouchableOpacity
              style={styles.project}
              onPress={() => navigation.navigate('Tasks', { project: item.id })}
            >
              <Text style={styles.projectName}>{item.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteProject(item.id)} style={styles.deleteButton}>
              <Icon name="delete" size={24} color="red" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openEditModal(item)} style={styles.editButton}>
              <Icon name="edit" size={24} color="blue" />
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
        <Icon name="add" size={30} color="blue" />
      </TouchableOpacity>
      {/* Modal pour l'ajout de projet */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Icon name="close" size={30} color="black" />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Nom du projet"
              value={newProjectName}
              onChangeText={setNewProjectName}
            />
            <Button title="Ajouter le projet" onPress={() => {
                    addProject();  // Appeler la fonction de mise à jour
                    setEditModalVisible(false);  // Fermer le modal après la mise à jour
                  }} /> 
          </View>
        </View>
      </Modal>

      {/* Modal pour la modification de projet */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setEditModalVisible(false)} style={styles.closeButton}>
              <Icon name="close" size={30} color="black" />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Nom du projet"
              value={newProjectName}
              onChangeText={setNewProjectName}
            />
            <Button
                title="Mettre à jour le projet"
                onPress={() => {
                  updateProject();
                  fetchProjects();  // Appeler la fonction de mise à jour
                  setEditModalVisible(false);  // Fermer le modal après la mise à jour
                }}
              />

          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  title2:{flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',},
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  projectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  project: { flex: 1 },
  projectName: { fontSize: 18, fontWeight: 'bold' },
  deleteButton: { marginLeft: 10 },
  addButton: { alignSelf: 'flex-start', marginTop: 20 },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  reload:{
    alignSelf: 'flex-start', marginTop: 20 
  }
});

export default ProjectList;
