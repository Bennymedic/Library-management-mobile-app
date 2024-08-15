import { Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MemberList from "./MemberList";
import AddMember from "./AddMember";
import { updateMember } from "../../apis/Member/api";
import UpdateMember from "./UpdateMember";
const { Screen, Navigator } = createNativeStackNavigator();
export default function Members() {
  return (
    <Navigator initialRouteName="members-list">
      <Screen
        name="member-list"
        component={MemberList}
        options={{headerShown:false}}
      />
      <Screen name="add-member" component={AddMember} options={{headerShown:false}}/>
      <Screen name="update-member" component={UpdateMember} options={{headerShown:false}}/>
    </Navigator>
  );
}
