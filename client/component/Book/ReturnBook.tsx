import { useContext, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { GlobalContext } from "../helper/context";
import { Picker } from "@react-native-picker/picker";
import { IBook, ICatalog, IMember, ITransaction } from "../../types/type";
import { updateCatalog } from "../../apis/Catalog/api";
import { updateTransaction } from "../../apis/Transaction/api";

export default function ReturnBook({ navigation }: any) {
  const {state, dispatch} = useContext(GlobalContext);

  const [transaction, setTransaction] = useState<ITransaction>({
    bookId: "",
    memberId: "",
    borrowedDate: "",
    returnedDate: "",
  });

  const onSubmit = async () => {
    const index = state.catalogs.findIndex(
      (catalog: ICatalog) => catalog.bookId === transaction.bookId
    );

    if (index !== -1) {
      const found = state.transactions.find(
        (ele: ITransaction) =>
          ele.bookId === transaction.bookId &&
          ele.memberId === transaction.memberId
      );

      if (found) {
        const updatedTransaction = newReturnDate(found);
        await putTransaction(updatedTransaction);
        const modifiedCatalog: ICatalog = { ...state.catalogs[index] };
        modifiedCatalog.availableCopies += 1;

        await putCatalog(modifiedCatalog, index);
      } else {
        alert("Transaction not found to return a book");
      }
    } else {
      alert('Book is not found in the catalog');
    }
  };

  async function putCatalog(modifiedCatalog: ICatalog, index: number) {
    try {
      const res = await updateCatalog(modifiedCatalog.id!, modifiedCatalog);
      if (res) {
        const arr = [...state.catalogs];
        arr[index] = res;
        dispatch({type:"SET_CATALOGS", payload:arr})
        alert("successfully returned");
        navigation.goBack();
      }
    } catch (error) {
      console.error(error);
    }
  }

  function newReturnDate(found: ITransaction) {
    const currentDate = new Date();
    const format = (num: number) => num.toString().padStart(2, "0");
    const returnDate = new Date(currentDate);

    const returnedDate = `${returnDate.getFullYear()}-${format(
      returnDate.getMonth() + 1
    )}-${format(returnDate.getDate())}`;

    return {
      ...found,
      returnedDate,
    };
  }

  async function putTransaction(updatedTransaction: ITransaction) {
    try {
      const res = await updateTransaction(updatedTransaction.id!, updatedTransaction);
      if (res) {
        const updatedTransactions = state.transactions.map((trans:ITransaction) =>
          trans.id === updatedTransaction.id ? res : trans
        );
        dispatch({type:'SET_TRANSACTIONS', payload:updatedTransactions})
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pickerContainer}>
        <Text style={styles.PickerText}>Pick a Book</Text>
        <Picker
          selectedValue={transaction.bookId}
          onValueChange={(itemValue) =>
            setTransaction({ ...transaction, bookId: itemValue })
          }
        >
          {state.books.map((book: IBook) => (
            <Picker.Item key={book.id} label={book.title} value={book.id} />
          ))}
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.PickerText}>Pick a Member</Text>
        <Picker
          selectedValue={transaction.memberId}
          onValueChange={(itemValue) =>
            setTransaction({ ...transaction, memberId: itemValue })
          }
        >
          {state.members.map((member: IMember) => (
            <Picker.Item
              key={member.id}
              label={`${member.firstname} ${member.lastname}`}
              value={member.id}
            />
          ))}
        </Picker>
      </View>
      <Pressable style={styles.submitButton} onPress={onSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </Pressable>
    </SafeAreaView>
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
    marginTop:30,
    width: "80%",
    alignSelf: "center",
  },
  PickerText: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight:'bold'
  },
});
