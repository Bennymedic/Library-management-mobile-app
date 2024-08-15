import { Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PublisherList from "./PublisherList";
import AddPublisher from "./AddPublisher";
import UpdatePublisher from "./UpdatePublisher";
const { Screen, Navigator } = createNativeStackNavigator();
export default function Publishers() {
  return (
    <Navigator initialRouteName="publisher-list">
      <Screen
        name="publisher-list"
        component={PublisherList}
        options={{headerShown:false}}
      />
      <Screen name="add-publisher" component={AddPublisher} options={{headerShown:false}}/>
      <Screen name="update-publisher" component={UpdatePublisher} options={{headerShown:false}}/>
    </Navigator>
  );
}
