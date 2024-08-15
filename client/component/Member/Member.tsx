import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { IMember } from "../../types/type";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { GlobalContext } from "../helper/context";
import { deleteMember } from "../../apis/Member/api";

interface MemberProps {
  data: IMember;
}

export default function Member({ data }: MemberProps) {
  const navigation = useNavigation<any>();
  const { state, dispatch } = useContext(GlobalContext);

  const goToUpdateMember = () => {
    navigation.navigate("update-member", data);
  };


  async function deleteHandler() {
    try {
      const res = await deleteMember(data.id!);
      if (res) {
        const filteredMembers = state.members.filter(
          (member: IMember) => member.id !== data.id
        );

        dispatch({type:'SET_MEMBERS', payload:filteredMembers})
        Alert.alert("Deleted succussfully")
      }
    } catch (error) {}
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
    <View style={styles.memberContainer}>
      <View style={styles.memberDetails}>
        <Text style={styles.memberText}>
          Name: {data.firstname} {data.lastname}
        </Text>
        <Text style={styles.memberText}>Phone: {data.phone}</Text>
        <Text style={styles.memberText}>Email: {data.email}</Text>
        <Text style={styles.memberText}>Address: {data.address}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          onPress={goToUpdateMember}
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
  memberContainer: {
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
  memberDetails: {
    flex: 3,
  },
  memberText: {
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
