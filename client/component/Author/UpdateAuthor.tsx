import { useContext, useState } from "react";
import { KeyboardAvoidingView, Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalContext } from "../helper/context";
import { IAuthor } from "../../types/type";
import { TextInput } from "react-native-gesture-handler";
import { updateAuthor } from "../../apis/Author/api";

export default function UpdateAuthor({ route, navigation }: any) {
  const { state, dispatch } = useContext(GlobalContext);
  const data = route.params;
  const [author, setAuthor] = useState<IAuthor>({
    name: data.name,
    phone: data.phone,
    email: data.email,
  });

  const onSubmit = async () => {
    try {
      const index = state.authors.findIndex((auth: IAuthor) => auth.id === data.id);

      if (index !== -1) {
        const res = await updateAuthor(data.id, author);
        if (res) {
          const arr = [...state.authors];
          arr[index] = res;
          dispatch({type:'SET_AUTHORS', payload:arr})

          navigation.goBack();
        }
      }
    } catch (error) {
      console.log(error);
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
  ratingText: {
    fontSize: 20,
    color: "grey",
    textAlign: "center",
    marginVertical: 40,
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
