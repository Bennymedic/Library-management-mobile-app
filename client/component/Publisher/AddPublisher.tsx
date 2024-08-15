import { useContext, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { IAuthor, IPublisher } from "../../types/type";
import { GlobalContext } from "../helper/context";
import { createAuthor } from "../../apis/Author/api";
import { createPublisher } from "../../apis/Publisher/api";

export default function AddPublisher({navigation}:any){
    const {state, dispatch} = useContext(GlobalContext);
    const [publisher, setPublisher] = useState<IPublisher>(
        {
            name:'',
            phone:'',
            email:'',
            address:''
        }
    )

    const onSubmit = async ()=>{
        const res = await createPublisher(publisher);
        if(res){
            const arr = [...state.publishers, res];
            dispatch({type:"SET_PUBLISHERS", payload:arr})
            navigation.goBack();
        }
    }
    
  return (
    <View>
        <Text style={styles.headerText}></Text>
      <TextInput
        value={publisher.name}
        style={styles.input}
        placeholder="Name"
        onChangeText={(text: string) => setPublisher({ ...publisher, name: text })}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={publisher.email}
        onChangeText={(text: string) => setPublisher({ ...publisher, email: text })}
      />
      <TextInput
        placeholder="Phone"
        style={styles.input}
        value={publisher.phone}
        onChangeText={(text: string) => setPublisher({ ...publisher, phone: text })}
      />
      <TextInput
        placeholder="Address"
        style={styles.input}
        value={publisher.address}
        onChangeText={(text: string) => setPublisher({ ...publisher, address: text })}
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
