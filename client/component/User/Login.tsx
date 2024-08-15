import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import LibraryImg from "../../images/libraryBackground.jpg";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ASYNC_STORAGE } from "../helper/ASYNC_STORAGE";
import { isElegibleUser } from "../../apis/Author/api";
import HeaderStyles from "../../styles/HeaderStyles";

interface Props {
  setIsLoggedIn: (login: boolean) => void;
}

export default function Login({ setIsLoggedIn }: Props) {
  const [email, setEmail] = useState("");

  const onLogin = async () => {
    try {
      if (email.trim() === "") {
        alert("Please enter email");
        return;
      }
      const res = await isElegibleUser(email);
      if (res) {
        await AsyncStorage.setItem(ASYNC_STORAGE, JSON.stringify({ isLoggedIn: true }));
        setIsLoggedIn(true);
      }else{
        alert('Wrong Email')
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={LibraryImg}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardView}>
          <View style={styles.overlay}>
            <Text style={styles.welcomeText}>Welcome to MIU Library</Text>
            <TextInput
              placeholder="Email"
              style={styles.input}
              autoCapitalize="none"
              value={email}
              onChangeText={(text: string) => setEmail(text.trim())}
            />
            <Pressable style={styles.button} onPress={onLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    width: '100%',
    height: '100%',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    borderRadius: 10,
    alignItems: "center",
    width: '90%',
  },
  keyboardView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 28,
    color: "white",
    marginBottom: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    width: "100%",
    fontSize: 18,
    padding: 15,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "white",
    color: "black",
  },
  button: {
    backgroundColor: "dodgerblue",
    borderRadius: 10,
    width: "100%",
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: 'bold',
  },
});
