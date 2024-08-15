import { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalContext } from "../helper/context";
import { Picker } from "@react-native-picker/picker";
import { IBook, ICatalog, IMember, ITransaction } from "../../types/type";
import { updateCatalog } from "../../apis/Catalog/api";
import { createTransaction } from "../../apis/Transaction/api";
import { format, addDays } from "date-fns";

export default function BorrowBook({ navigation }: any) {
  const {state, dispatch} = useContext(GlobalContext);

  const [transaction, setTransaction] = useState<ITransaction>({
    bookId: "",
    memberId: "",
    borrowedDate: "",
    returnedDate: "",
  });
  const [updateDate, setUpdateDate] = useState(true);

  useEffect(() => {
    setUpdateDate(false);
    const currentDate = new Date();

    const format = (num:number) => num.toString().padStart(2, "0");
    const borrowedDate = `${currentDate.getFullYear()}-${format(
      currentDate.getMonth() + 1
    )}-${format(currentDate.getDate())}`;

    const returnDate = new Date(currentDate);
    returnDate.setDate(returnDate.getDate() + 14);

    const returnedDate = `${returnDate.getFullYear()}-${format(
      returnDate.getMonth() + 1
    )}-${format(returnDate.getDate())}`;

    setTransaction((prev) => ({
      ...prev,
      borrowedDate,
      returnedDate,
    }));
  }, [updateDate]);
  
  const onSubmit = async () => {
    setUpdateDate(true);
    const index = state.catalogs.findIndex(
      (catalog: ICatalog) => catalog.bookId === transaction.bookId
    );

    if (index !== -1) {
      const selectedCatalog = state.catalogs[index];
      const avaliable = selectedCatalog.availableCopies;
     
      if (avaliable > 0) {
        const modifiedCatalog: ICatalog = state.catalogs[index];
        modifiedCatalog.availableCopies -= 1;
        await putCatalog(modifiedCatalog, index);
      } else {
        alert("No avaliable copies");
      }
    }
  };

  async function putCatalog(modifiedCatalog: ICatalog, index: number) {
    try {
      const res = await updateCatalog(modifiedCatalog.id!, modifiedCatalog);
      if (res) {
        const arr = [...state.catalogs];
        arr[index] = res;
        dispatch({type:"SET_CATALOGS", payload:arr})
        await postTransaction();
      }
    } catch (error) {}
  }

  async function postTransaction() {
    try {
      const res = await createTransaction(transaction);
      if (res) {
        const arr = [...state.transactions, res]

        dispatch({type:'SET_TRANSACTIONS', payload:arr})
        alert("successfull");
        navigation.goBack();
      }
    } catch (error) {}
  }

  return (
    <View style={styles.container}>
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
    fontWeight:'bold',
    marginBottom: 10,
  },
});
