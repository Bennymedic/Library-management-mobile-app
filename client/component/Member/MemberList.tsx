import { useContext, useEffect } from "react";
import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GlobalContext } from "../helper/context";
import { getAllMembers } from "../../apis/Member/api";
import { IMember } from "../../types/type";
import Member from "./Member";
import Logout from "../User/Logout";



export default function MemberList({ navigation }: any) {
  const { state } = useContext(GlobalContext);

  const goToAddMember = () => {
    navigation.navigate("add-member");
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Members List</Text>
      </View>
         <ScrollView>
        {state.members.map((member: IMember) => (
          <Member key={member.id} data={member} />
        ))}
      </ScrollView>  
      <Pressable style={styles.submitButton} onPress={goToAddMember}>
        <Text style={styles.submitButtonText}>Add Member</Text>
      </Pressable>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === "android" ? 30 : 0,
    paddingBottom: 10,
  },
  input: {
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#F5F5F5",
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    alignItems:'center'
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  review: {
    flex: 1,

    fontSize: 30,
    color: "ligtblue",
  },
  submitButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: "#0066cc",
    borderRadius: 25,
    alignSelf: "center",
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  submitButtonText: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
