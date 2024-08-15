import { useContext, useState } from "react";
import { KeyboardAvoidingView, Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalContext } from "../helper/context";
import { IAuthor, IBook, IMember, IPublisher } from "../../types/type";
import { TextInput } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import { updateBook } from "../../apis/Book/api";

export default function UpdateBook({ route, navigation }: any) {
  const {state, dispatch} = useContext(GlobalContext);
  const data:IBook = route.params;

  const [book, setBook] = useState<IBook>({
    title: data.title,
    genre: data.genre,
    category: data.category,
    authorIDs: data.authorIDs,
    publisherId: data.publisherId,
  });

  const [authorId, setAuthorId] = useState("");

  const onAuthorPicker = (itemValue: string) => {
    setAuthorId(itemValue);
    console.log(book)
    if (!book.authorIDs.includes(itemValue)) {
      setBook({ ...book, authorIDs: [...book.authorIDs, itemValue] });
    }
  };

  const onSubmit = async () => {
    const index = state.books.findIndex((book: IBook) => book.id === data.id);
    try {
      if (index !== -1) {
        const res = await updateBook(data.id!, book);
        if (res) {
          const arr = [...state.books];
          arr[index] = res;
          dispatch({type:"SET_BOOKS", payload:arr})
          navigation.navigate('book-list');
        }
      }
    } catch (error) {}
  };

  return (
    <KeyboardAvoidingView>
      <Text style={styles.headerText}>Update a Book</Text>
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
