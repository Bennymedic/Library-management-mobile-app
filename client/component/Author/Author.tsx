import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { IAuthor } from "../../types/type";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { GlobalContext } from "../helper/context";
import { deleteAuthor } from "../../apis/Author/api";

interface AuthorProps {
  data: IAuthor;
}

export default function Author({ data }: AuthorProps) {
  const navigation = useNavigation<any>();
  const { state, dispatch } = useContext(GlobalContext);

  const goToUpdateAuthor = () => {
    navigation.navigate("update-author", data);
  };

  async function deleteHandler() {
    try {
      const res = await deleteAuthor(data.id!);
      if (res) {
        const filteredAuthors = state.authors.filter(
          (author: IAuthor) => author.id !== data.id
        );
        dispatch({type:'SET_AUTHORS', payload:filteredAuthors})
      }
    } catch (error) {}
  }


  const onDelete = async () => {
    Alert.alert("Information", "Do you want to delte this course", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
      },
      {
        text: "OK",
        onPress: () => deleteHandler(),
      },
    ]);

    // if (confirm("Do you want to delete this author?")) {
    //   await deleteHandler();
    // }
  };


  return (
    <View style={styles.authorContainer}>
      <View style={styles.authorDetails}>
        <Text style={styles.authorText}>Name: {data.name}</Text>
        <Text style={styles.authorText}>Phone: {data.phone}</Text>
        <Text style={styles.authorText}>Email: {data.email}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          onPress={goToUpdateAuthor}
          style={[styles.button, styles.editButton]}
          underlayColor="#0066CC"
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={onDelete}
          style={[styles.button, styles.deleteButton]}
          underlayColor="#CC0000"
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  authorContainer: {
    flexDirection: "row",
    padding: 20,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "red",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  authorDetails: {
    flex: 3,
  },
  authorText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
    marginBottom: 5,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  editButton: {
    backgroundColor: "#0066cc",
  },
  deleteButton: {
    backgroundColor: "#cc0000",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
  },
});
