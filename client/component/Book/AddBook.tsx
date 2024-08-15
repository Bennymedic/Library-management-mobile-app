import { useContext, useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { IAuthor, IBook, ICatalog, IPublisher } from "../../types/type";
import { GlobalContext } from "../helper/context";
import { Picker } from "@react-native-picker/picker";
import { createBook } from "../../apis/Book/api";
import { createCatalog } from "../../apis/Catalog/api";

export default function AddBook({ navigation }: any) {
  const { state, dispatch } = useContext(GlobalContext);
  const [book, setBook] = useState<IBook>({
    title: "",
    genre: "",
    category: "",
    authorIDs: [],
    publisherId: "",
  });
  const [catalog, setCatalog] = useState<ICatalog>({
    bookId: "",
    numberOfCopies: 0,
    availableCopies: 0,
  });
  const [authorId, setAuthorId] = useState("");

  const onAuthorPicker = (itemValue: string) => {
    setAuthorId(itemValue);
    if (!book.authorIDs.includes(itemValue)) {
      setBook({ ...book, authorIDs: [...book.authorIDs, itemValue] });
    }
  };

  const onSubmit = async () => {
    const res = await createBook(book);
    if (res) {
      const arrBook = [...state.books, res]
      dispatch({type:'SET_BOOKS', payload:arrBook})

      const arrCatalog = { ...catalog, bookId: res.id };
      const catalogRes = await createCatalog(arrCatalog);
      if (catalogRes) {
        const arr = [...state.catalogs, catalogRes]
  
        dispatch({type:'SET_CATALOGS', payload:arr})
        navigation.goBack();
      }
    }
  };

  return (
    <KeyboardAvoidingView>
      <Text style={styles.headerText}>Add a New Book</Text>
      <TextInput
        value={book.title}
        style={styles.input}
        placeholder="Title"
        onChangeText={(text: string) => setBook({ ...book, title: text })}
      />
      <TextInput
        value={book.genre}
        style={styles.input}
        placeholder="Genre"
        onChangeText={(text: string) => setBook({ ...book, genre: text })}
      />
      <TextInput
        value={book.category}
        style={styles.input}
        placeholder="Category"
        onChangeText={(text: string) => setBook({ ...book, category: text })}
      />
      <TextInput
        value={catalog.numberOfCopies.toString()}
        style={styles.input}
        placeholder="Number of copies"
        onChangeText={(text: string) =>
          setCatalog({ ...catalog, numberOfCopies: +text })
        }
      />
      <TextInput
        value={catalog.availableCopies.toString()}
        style={styles.input}
        placeholder="Avaliable copies"
        onChangeText={(text: string) =>
          setCatalog({ ...catalog, availableCopies: +text })
        }
      />
      <View style={styles.pickerContainer}>
        <Text style={styles.PickerText}>Pick an author</Text>
        <Picker
          selectedValue={authorId}
          onValueChange={(itemValue) => onAuthorPicker(itemValue)}
        >
          {state.authors.map((author: IAuthor) => (
            <Picker.Item
              key={author.id}
              label={author.name}
              value={author.id}
            />
          ))}
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.PickerText}>Pick a Publisher</Text>
        <Picker
          selectedValue={book.publisherId}
          onValueChange={(itemValue) =>
            setBook({ ...book, publisherId: itemValue })
          }
        >
          {state.publishers.map((publisher: IPublisher) => (
            <Picker.Item
              key={publisher.id}
              label={publisher.name}
              value={publisher.id}
            />
          ))}
        </Picker>
      </View>

      <Pressable style={styles.submitButton} onPress={onSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  button: {
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 25,
    color: "#444",
    textAlign: "center",
    margin: 20,
  },
  input: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 3,
    fontSize: 24,
  },

  submitButtonText: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
  },
  submitButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#0066cc",
    borderRadius: 4,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  pickerContainer: {
    marginBottom: 20,
    width: "80%",
    alignSelf: "center",
  },
  PickerText: {
    fontSize: 20,
    marginBottom: 10,
  },
});
