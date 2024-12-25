import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, TextInput, ImageBackground } from "react-native";
import axios from "axios";  // Importer axios pour faire des requêtes HTTP
import { Ionicons } from '@expo/vector-icons';

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Fonction pour envoyer les données à l'API
  const signUpUser = async () => {
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    const user = { email };  // Créer l'objet utilisateur avec l'email

    try {
      const response = await axios.post('https://c7e6-102-159-106-119.ngrok-free.app/project/user/create', user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const response2= await axios.get(`https://c7e6-102-159-106-119.ngrok-free.app/project/user/'${email}'`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("Utilisateur récupéré :", response2.data);

      const admin ={ id:response2.data.id,password}
      const response3 = await axios.post('https://c7e6-102-159-106-119.ngrok-free.app/project/admin/create', admin, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response3.status === 200) {
        alert("Utilisateur créé avec succès!");
        // Rediriger l'utilisateur vers la page de connexion ou une autre page après l'inscription
        navigation.navigate("SignIn");
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur : ", error);
      alert("Erreur lors de la création de l'utilisateur.");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./../assets/images/appimage.jpg')} style={styles.backImage}></ImageBackground>
      <View style={styles.card}>
        <Ionicons name="people-circle" size={80} color="black" style={styles.icon} />
        <Text style={styles.title}>Welcome</Text>

        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.btn} onPress={signUpUser}>
          <Text style={styles.btnText}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.text} onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.textebas}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#40B7B4',
    borderRadius: 99,
    padding: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#40B7B4',
    borderWidth: 2,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  btnText: {
    color: '#000',
    fontSize: 16,
  },
  card: {
    margin: 20,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    padding: 20,
    marginHorizontal: 40,
  },
  backImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'cover',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
    paddingBottom: 10,
  },
  icon: {
    marginBottom: 20,
    alignSelf: 'center',
  },
  textebas: {
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
    color: '#40B7B4',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#40B7B4',
    textShadowColor: '#fff',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
    lineHeight: 20,
  },
  text: {
    paddingTop: 10,
  },
});
