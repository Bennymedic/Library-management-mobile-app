import { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalContext } from "../helper/context";
import { IMember} from "../../types/type";
import { TextInput } from "react-native-gesture-handler";
import { updateMember } from "../../apis/Member/api";

export default function UpdateMember({ route, navigation }: any) {
  const { state, dispatch } = useContext(GlobalContext);
  const data = route.params;
  const [member, setMember] = useState<IMember>({
    firstname: data.firstname,
    lastname: data.lastname,
    phone: data.phone,
    email: data.email,
    address:data.address,
    residentID:data.residentID
  });

  const onSubmit = async () => {
    try {
      const index = state.members.findIndex((mem:IMember) => mem.id === data.id);

      const res = await updateMember(data.id, member);
      if(res){
        const arr = [...state.members]
        arr[index] = res;
        dispatch({type:'SET_MEMBERS', payload:arr})
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
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
  </View>
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
