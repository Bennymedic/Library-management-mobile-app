import { Pressable, StyleSheet, Text, View } from "react-native";
import { IBook, ICatalog } from "../../types/type";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useContext } from "react";
import { GlobalContext } from "../helper/context";

export default function BookDetails({navigation,route}:any) {

  const data = route.params;
  const { state } = useContext(GlobalContext);
  const found = state.catalogs.find((cat: ICatalog) => cat.bookId === data.id);

  const goToUpdateBook = () => {
    navigation.navigate("update-book", data); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update a Book</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Title:</Text>
          <Text style={styles.value}>{data.title}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.label}>Genre:</Text>
          <Text style={styles.value}>{data.genre}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.label}>Category:</Text>
          <Text style={styles.value}>{data.category}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.label}>Available Copies:</Text>
          <Text style={styles.value}>{found?.availableCopies ?? 'N/A'}</Text>
        </View>
      </View>
      <TouchableHighlight
        onPress={goToUpdateBook}
        style={styles.button}
        underlayColor="#5398DC"
      >
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  detailsContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  value: {
    flex: 2,
    fontSize: 16,
    color: "#555",
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#003366",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#ffffff",
  },
});
