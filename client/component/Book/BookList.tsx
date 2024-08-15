import { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { GlobalContext } from "../helper/context";
import { IBook } from "../../types/type";
import Book from "./Book";
import Header from "../Header/Header.ios";

export default function BookList({ navigation }: any) {
  const { state } = useContext(GlobalContext);
  const [displayList, setDisplayList] = useState<IBook[]>(state.books);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setDisplayList(state.books);
  }, [state.books]);

  const goToAddBook = () => {
    navigation.navigate("add-book");
  };

  const goToBorrowBook = () => {
    navigation.navigate('borrow-book');
  };

  const goToReturnBook = () => {
    navigation.navigate('return-book');
  };

  const onSearch = (text: string) => {
    const filteredBooks = state.books.filter((book: IBook) =>
      book.title.toLowerCase().includes(text.trim().toLowerCase())
    );
    setDisplayList(filteredBooks);
    setSearchText(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.contentContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by title"
            value={searchText}
            onChangeText={(text: string) => onSearch(text)}
          />
        </View>
        
        <View style={styles.buttonsContainer}>
          <Pressable style={styles.button} onPress={goToAddBook}>
            <Text style={styles.buttonText}>Add Book</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={goToBorrowBook}>
            <Text style={styles.buttonText}>Borrow Book</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={goToReturnBook}>
            <Text style={styles.buttonText}>Return Book</Text>
          </Pressable>
        </View>
        <FlatList
          style={styles.bookList}
          data={displayList}
          renderItem={({ item }) => <Book data={item} />}
          keyExtractor={item => item.id!}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  searchContainer: {
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  searchInput: {
    width: "90%",
    height: 45,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: "grey",
    fontSize: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "darkblue",
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#003366",
    borderRadius: 10,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    alignItems: 'center',
    width: "30%",
  },
  buttonText: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
  },
  bookList: {
    width: "100%",
  },
});
