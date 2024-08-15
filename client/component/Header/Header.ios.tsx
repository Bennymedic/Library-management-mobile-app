import React, { useContext } from "react";
import {
  Text,
  View,
  Platform,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { GlobalContext } from "../helper/context";
import { ASYNC_STORAGE } from "../helper/ASYNC_STORAGE";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LibraryImg from "../../images/library.jpg";
import Logout from "../User/Logout";


const Header = () => {
  return (
    <SafeAreaView style={HeaderStyles.container}>
      <ImageBackground
        source={LibraryImg}
        resizeMode="cover"
        style={HeaderStyles.imageBackground}
      >
        <View style={HeaderStyles.overlay}>
          <Text style={HeaderStyles.welcomeText}>
            Welcome to MIU Library
          </Text>
          <Logout/>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const HeaderStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackground: {
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
    position: "relative",
  },
  welcomeText: {
    fontSize: 24,
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 10,
  },
  logoutButton: {
    position: "absolute",
    top: 10,
    right: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#0066cc",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  logoutButtonText: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
  },
});

export default Header;
