import { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { IAuthor } from "../../types/type";
import { GlobalContext } from "../helper/context";
import { createAuthor } from "../../apis/Author/api";

export default function AddAuthor({ navigation }: any) {
  const { state, dispatch } = useContext(GlobalContext);
  const [author, setAuthor] = useState<IAuthor>({
    name: "",
    phone: "",
    email: "",
  });

  const onSubmit = async () => {
    const res = await createAuthor(author);
    if (res) {
      const arr = [...state.authors, res]
      dispatch({type:"SET_AUTHORS", payload:arr})
      
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView>
      <Text style={styles.headerText}></Text>
      <TextInput
        value={author.name}
        style={styles.input}
        placeholder="Name"
        onChangeText={(text: string) => setAuthor({ ...author, name: text })}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={author.email}
        onChangeText={(text: string) => setAuthor({ ...author, email: text })}
      />
      <TextInput
        placeholder="Phone"
        style={styles.input}
        value={author.phone}
        onChangeText={(text: string) => setAuthor({ ...author, phone: text })}
      />
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
});
