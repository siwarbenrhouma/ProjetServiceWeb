import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { Text, View, TouchableOpacity, StyleSheet, TextInput, ImageBackground } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import axios from "axios";
import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
WebBrowser.maybeCompleteAuthSession();

export default function SignInWithOAuth({ navigation }) {
  const router = useRouter();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useUser();
  // Fonction pour créer un utilisateur
  const onPress = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      if (createdSessionId) {
        await setActive?.({ session: createdSessionId });
      }
  
      const userEmail = user?.primaryEmailAddress?.emailAddress;
      if (!userEmail) {
        throw new Error("Impossible de récupérer l'email utilisateur. Vérifiez les paramètres Clerk.");
      }
  
      const response = await axios.post("https://c7e6-102-159-106-119.ngrok-free.app/project/user/create", { email: userEmail });
  
      if (response.status === 201) {
        alert("Utilisateur créé avec succès !");
        setEmail(userEmail);
      } else {
        alert("Une erreur est survenue lors de la création de l'utilisateur.");
      }
    } catch (err) {
      console.error("Erreur OAuth ou création utilisateur", err);
      alert("Erreur : " + (err.message || "Erreur inconnue"));
    }
  };

  // Fonction pour vérifier si un utilisateur existe
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

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./../assets/images/appimage.jpg')} style={styles.backImage}></ImageBackground>
      <View style={styles.card}>
        <Ionicons name="people-circle" size={80} color="black" style={styles.icon} />
        <Text style={styles.title}> Welcome</Text>
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
        <TouchableOpacity style={styles.btn} onPress={onPress2}>
          <Text style={styles.btnText}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSignUp} onPress={()=>{onPress();
          onPress2();
        }}>
          <Text style={styles.btnText}>Sign in with (Google)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.text} onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.textebas}>Not yet registered? Sign Up Now</Text>
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
    flexDirection: 'row'
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
  btnSignUp: {
    backgroundColor: '#fff', 
    borderRadius: 99,
    padding: 10,
    marginBottom: 20,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#48D1CC',
    borderWidth: 2,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row'
  },
  btnText: {
    color: '#000', 
    fontSize: 16,
  },
  backImage: {
    width: '100%',     
    height: '100%', 
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'cover'
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
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#000'
  }, 
  icon: {
    marginBottom: 20,
    alignSelf: 'center',
  },
  textebas: {
    textAlign: 'center',
    color: '#40B7B4',
    fontSize: 12,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#40B7B4',
    textShadowColor: '#fff',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  text: {
    paddingTop: 10,
  }
});
