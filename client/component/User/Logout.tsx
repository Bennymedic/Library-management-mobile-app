import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pressable, StyleSheet, Text } from "react-native";
import { ASYNC_STORAGE } from "../helper/ASYNC_STORAGE";
import { useContext } from "react";
import { GlobalContext } from "../helper/context";

function Logout() {
  const { dispatch } = useContext(GlobalContext);
  const onLogout = async () => {
    try {
      await AsyncStorage.removeItem(ASYNC_STORAGE);
      dispatch({type:'SET_IS_LOGGED_IN', payload:false})
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Pressable style={HeaderStyles.logoutButton} onPress={onLogout}>
      <Text style={HeaderStyles.logoutButtonText}>Logout</Text>
    </Pressable>
  );
}

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
    top: 40,
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

export default Logout;
