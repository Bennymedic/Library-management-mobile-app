import { useContext } from "react";
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
import { getAllPublishers } from "../../apis/Publisher/api";
import { IPublisher } from "../../types/type";
import Publisher from "./Publisher";
import Logout from "../User/Logout";

export default function PublisherList({ navigation }: any) {
  const { state, dispatch } = useContext(GlobalContext);

  const goToAddPublisher = () => {
    navigation.navigate("add-publisher");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Publishers List</Text>
      </View>
      <ScrollView>
        {state.publishers.map((publisher: IPublisher) => (
          <Publisher key={publisher.id} data={publisher} />
        ))}
      </ScrollView>
      <Pressable style={styles.submitButton} onPress={goToAddPublisher}>
        <Text style={styles.submitButtonText}>Add Publisher</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    alignItems: "center",
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
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
