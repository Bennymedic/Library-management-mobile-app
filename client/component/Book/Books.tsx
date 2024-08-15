import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BookList from "./BookList";
import AddBook from "./AddBook";
import UpdateBook from "./UpdateBook";
import BorrowBook from "./BorrowBook";
import ReturnBook from "./ReturnBook";
import BookDeatils from "./BookDetails";


const { Screen, Navigator } = createNativeStackNavigator();
export default function Books() {
  return (
    <Navigator initialRouteName="books-list">
      <Screen
        name="book-list"
        component={BookList}
        options={{headerShown:false }}
      />
      <Screen name="add-book" component={AddBook} options={{headerShown:false }}/>
      <Screen name="update-book" component={UpdateBook} options={{headerShown:false }}/>
      <Screen name="detail-book" component={BookDeatils} options={{headerShown:false }}/>
      <Screen name="borrow-book" component={BorrowBook} options={{headerShown:false }}/>
      <Screen name="return-book" component={ReturnBook} options={{headerShown:false }}/>
    </Navigator>
  );
}
