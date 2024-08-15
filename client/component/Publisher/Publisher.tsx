import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { IPublisher } from "../../types/type";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "../helper/context";
import { deletePublisher } from "../../apis/Publisher/api";
import { useContext } from "react";

interface PublisherProps {
  data: IPublisher;
}

export default function Publisher({ data }: PublisherProps) {
  const navigation = useNavigation<any>();
  const { state, dispatch } = useContext(GlobalContext);

  const goToUpdatePublisher = () => {
    navigation.navigate("update-publisher", data);
  };

  async function deleteHandler() {
    try {
      const res = await deletePublisher(data.id!);
      if (res) {
        const filteredPublishers = state.publishers.filter(
          (publisher: IPublisher) => publisher.id !== data.id
        );
        dispatch({type:"SET_PUBLISHERS", payload:filteredPublishers})
        Alert.alert("Deleted sucessfuly");
      }
    } catch (error) {
      console.error(error);
    }
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
    <View style={styles.container}>
      <View style={styles.details}>
        <Text style={styles.text}>{data.name}</Text>
        <Text style={styles.text}>{data.phone}</Text>
        <Text style={styles.text}>{data.email}</Text>
        <Text style={styles.text}>{data.address}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          onPress={goToUpdatePublisher}
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
  container: {
    flexDirection: "row",
    padding: 20,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  details: {
    flex: 3,
  },
  text: {
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
