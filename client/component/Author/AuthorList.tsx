import { useContext, useEffect } from "react";
import {
  FlatList,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GlobalContext } from "../helper/context";
import Author from "./Author";

export default function AuthorList({ navigation }: any) {
  const { state, dispatch } = useContext(GlobalContext);

  const goToAddAuthor = () => {
    navigation.navigate("add-author");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Authors List</Text>
      </View>
      <FlatList
          style={styles.scrollContainer}
          data={state.authors}
          renderItem={({ item }) => <Author data={item} />}
          keyExtractor={item => item.id!}
        />
      <Pressable style={styles.submitButton} onPress={goToAddAuthor}>
        <Text style={styles.submitButtonText}>Add Author</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingTop: Platform.OS === "android" ? 30 : 0,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
  submitButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: "#0066cc",
    borderRadius: 25,
    alignSelf: "center",
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  submitButtonText: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
