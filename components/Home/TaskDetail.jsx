import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { Menu, Provider } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import axios from 'axios';
const TaskDetail = ({ route }) => {
  const { task } = route.params;
  const [visible, setVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(task.status);
  const [newComment, setNewComment] = useState('');
  const [email, setEmail] = useState('');
  const [comments, setComments] = useState([]);

  // Charger les commentaires pour la tâche
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupération des tâches
        const taskResponse = await axios.get(
          `https://c7e6-102-159-106-119.ngrok-free.app/project/task/${task.id}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log("Statut de la tâche :", taskResponse.data);
  
        if (taskResponse.data) {
          console.log("Statut de la tâche :", taskResponse.data.status);
          setSelectedStatus(taskResponse.data.status);
        } else {
          console.error("Erreur : La réponse de l'API pour la tâche n'est pas valide.");
        }
  
        // Récupération des commentaires
        const commentResponse = await axios.get(
          `https://c7e6-102-159-106-119.ngrok-free.app/project/comment/task/${task.id}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
        if (Array.isArray(commentResponse.data.comment)) {
          setComments(commentResponse.data.comment);
        } 
        else if(commentResponse.status == 200){
          if (commentResponse.data.comment)
            setComments([commentResponse.data.comment]);
        }
        else {
          console.error("Erreur : La réponse de l'API pour les commentaires n'est pas un tableau.");
        }

        const response= await axios.get(`https://c7e6-102-159-106-119.ngrok-free.app/project/user/by/${taskResponse.data.assignedTo}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log("eeeeeeeeeeee",response.data);
        if (response.status === 200) {
          setEmail(response.data.email);
        }
      } catch (error) {
        console.log(error);
      }

    };
  
    fetchData();
  }, [task]);
  
  const onPress2 = async () => {
    try {
      const response= await axios.get(`https://c7e6-102-159-106-119.ngrok-free.app/project/user/'${email}'`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const amal = response.data;
        console.log("aaaaa",amal)
      if (response.status === 200) {
        navigation.navigate('Project', { utilisateur: amal.id });
        alert("Utilisateur trouvé : " + response.data.email);
      } else {
        alert("Utilisateur non trouvé. Veuillez vérifier l'email.");
      }
    } catch (err) {
      console.error("Erreur lors de la vérification de l'utilisateur", err);
      alert("Erreur : " + err.response?.data?.message || "Une erreur inconnue est survenue.");
    }
  };
const addComment = async () => {
  if (!newComment) return;

  try {
    const response = await axios.post(
      `https://c7e6-102-159-106-119.ngrok-free.app/project/comment/create`,
      {
        taskId: task.id,
        content: newComment,
        userId: 7,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (response.status === 200) {
      const newCommentData = response.data;
      setComments([...comments, newCommentData]);
      setNewComment('');
    } else {
      console.error("Failed to add comment:", response.status);
    }
  } catch (error) {
    console.error("Error adding comment:", error.message);
  }
};




  const deleteComment = async (id) => {
    try {
      const response = await fetch(`https://c7e6-102-159-106-119.ngrok-free.app/project/comment/delete/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setComments(comments.filter((comment) => comment.id !== id));
      } else {
        console.error("Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleStatusChange = async (newStatus) => {
    try {
      const response = await fetch(`https://c7e6-102-159-106-119.ngrok-free.app/project/task/update2?id=${task.id}&etat=${newStatus}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        setSelectedStatus(newStatus);
        closeMenu();
      } else {
        console.error("Failed to update task status");
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <Provider>
      <FlatList
        style={styles.container}
        data={comments}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <>
          <View style={styles.taskDetail}>
        <Text style={styles.title}>Détails de la Tâche</Text>
        <View style={styles.etat2}>
        <Text style={styles.label}>Nom : </Text>
        <Text style={styles.label3}> {task.name}</Text>
        </View>
        <View style={styles.etat2}>
        <Text style={styles.label}>Assigné à :</Text>
        <Text style={styles.label3}>{email}</Text>
        </View>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <View style={styles.etat2}>
              <Text style={styles.label2}>État :</Text>
              <TouchableOpacity style={styles.etat} onPress={openMenu}>
                <MaterialCommunityIcons name="menu-down" size={30} color="black" />
                <Text style={styles.label2}>{selectedStatus}</Text>
              </TouchableOpacity>
            </View>
          }
        >
          <Menu.Item onPress={() => handleStatusChange('TODO')} title="TODO" />
          <Menu.Item onPress={() => handleStatusChange('INPROGRESS')} title="INPROGRESS" />
          <Menu.Item onPress={() => handleStatusChange('DONE')} title="DONE" />
        </Menu>
            <Text style={styles.label}>Description : {task.description || 'Aucune description'}</Text>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.comment}>
            <Text>{item.content}</Text>
            <TouchableOpacity onPress={() => deleteComment(item.id)}>
              <MaterialCommunityIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={
          <View>
            <TextInput
              style={styles.commentInput}
              placeholder="Ajouter un commentaire"
              value={newComment}
              onChangeText={setNewComment}
            />
            <TouchableOpacity style={styles.submitButton} onPress={addComment}>
              <Text style={styles.submitText}>Ajouter</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 ,textAlign: 'center' },
  label: { fontSize: 16, marginBottom: 10 ,fontWeight: 'bold'},
  label2: { fontSize: 16, marginBottom: 10, paddingTop: 5, fontWeight: 'bold' },
  label3: {fontSize: 16, marginBottom: 10 ,fontWeight: 'bold', color:"#87CEEF"},
  commentInput: {
    borderWidth: 2,
    borderColor: '#000',
    shadowColor: '#ccc',
    shadowRadius: 2,
    borderRadius: 20,
    padding: 20,
    marginTop: 30,
    marginBottom: 30,
    borderColor: "#87CEEF",
  },
  etat2: {flexDirection: 'row',},
  etat: {flexDirection: 'row', borderColor: '#000000',borderRadius: 2,marginLeft: 10,paddingRight: 10, backgroundColor:"#87CEEF" },
  submitButton:{
    borderRadius: 20,
    padding:10,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    backgroundColor: "#87CEEF",
  },
  comment:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  taskDetail:{
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    borderRadius: 20,
    borderWidth: 1
  },
  commentContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, },
  
});

export default TaskDetail;
