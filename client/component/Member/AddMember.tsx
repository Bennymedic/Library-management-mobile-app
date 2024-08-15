import { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {  IMember, } from "../../types/type";
import { GlobalContext } from "../helper/context";


import { v4 as uuidv4 } from "uuid";
import { createMember } from "../../apis/Member/api";

export default function AddMember({ navigation }: any) {
  const { state, dispatch } = useContext(GlobalContext);
  const [member, setMember] = useState<IMember>({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    address: "",
    residentID: uuidv4().toString(),
  });

  const onSubmit = async () => {
    const res = await createMember(member);
    if (res) {
      const arr = [...state.members, res]
      dispatch({type:'SET_MEMBERS', payload:arr})
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView>
      <Text style={styles.headerText}></Text>
      <TextInput
        value={member.firstname}
        style={styles.input}
        placeholder="First Name"
        onChangeText={(text: string) =>
          setMember({ ...member, firstname: text })
        }
      />
      <TextInput
        value={member.lastname}
        style={styles.input}
        placeholder="Last Name"
        onChangeText={(text: string) =>
          setMember({ ...member, lastname: text })
        }
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={member.email}
        onChangeText={(text: string) => setMember({ ...member, email: text })}
      />
      <TextInput
        placeholder="Phone"
        style={styles.input}
        value={member.phone}
        onChangeText={(text: string) => setMember({ ...member, phone: text })}
      />
      <TextInput
        placeholder="Address"
        style={styles.input}
        value={member.address}
        onChangeText={(text: string) => setMember({ ...member, address: text })}
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
