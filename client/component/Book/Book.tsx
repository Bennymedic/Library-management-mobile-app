import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { IBook, ICatalog } from "../../types/type";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../helper/context";
import { deleteBook } from "../../apis/Book/api";
import { deleteCatalog } from "../../apis/Catalog/api";

interface BookProps {
  data: IBook;
}

export default function Book({ data }: BookProps) {
  const navigation = useNavigation<any>();
  const { state, dispatch } = useContext(GlobalContext);
  const [update, setUpdate] = useState(true);
  const goToDetailBook = () => {
    navigation.navigate("detail-book", data);
  };

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

  async function deleteHandler() {
    try {
      const res = await deleteBook(data.id!);
      if (res) {
        const filteredBooks = state.books.filter(
          (book: IBook) => book.id !== data.id
        );
        dispatch({ type: "SET_BOOKS", payload: filteredBooks });
        const foundCatlog = state.catalogs.find(
          (cat: ICatalog) => cat.bookId === data.id
        );
        if (foundCatlog) {
          const res = await deleteCatalog(foundCatlog.id);
          if (res) {
            const filteredCatalog = state.catalogs.filter(
              (cat: ICatalog) => cat.id === foundCatlog.id
            );
            dispatch({ type: "SET_CATALOGS", payload: filteredCatalog });
          }
        }
        Alert.alert("Deleted succussfully");
      }
    } catch (error) {
      console.error(error);
    }
  }
  const randomImage = useRef<any>();
  useEffect(() => {
    setUpdate(false);
    randomImage.current = `https://picsum.photos/seed/${Math.floor(
      Math.random() * 1000
    )}/100/100`;
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image source={{ uri: randomImage.current }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.title}>{data.title}</Text>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={goToDetailBook}>
              <Text style={styles.buttonText}>Details</Text>
            </Pressable>
            <Pressable
              style={[styles.button, { backgroundColor: "red" }]}
              onPress={onDelete}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#003366",
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
});
