import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthorList from "./AuthorList";
import AddAuthor from "./AddAuthor";
import UpdateAuthor from "./UpdateAuthor";

const {Screen, Navigator} = createNativeStackNavigator();

export default function Authors(){
    return (
        <Navigator initialRouteName="auhtor-list">
            <Screen name="author-list" component={AuthorList} options={{headerShown:false}}/>
            <Screen name="add-author" component={AddAuthor} options={{headerShown:false}}/>
            <Screen name="update-author" component={UpdateAuthor} options={{headerShown:false}}/>
        </Navigator>
    )

}