import 'react-native-get-random-values';
import { useEffect, useReducer, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { GlobalContext } from "./component/helper/context";
import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Books from "./component/Book/Books";
import Publishers from "./component/Publisher/publishers";
import Memebrs from "./component/Member/Members";
import Authors from "./component/Author/Authors";
import { getAllAuthors } from "./apis/Author/api";
import { getAllBooks } from "./apis/Book/api";
import { getAllPublishers } from "./apis/Publisher/api";
import { getAllCatalogs } from "./apis/Catalog/api";
import { getAllMembers } from "./apis/Member/api";
import Login from "./component/User/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ASYNC_STORAGE } from "./component/helper/ASYNC_STORAGE";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { getAllTransaction } from "./apis/Transaction/api";
import { initialState, reducer } from "./component/helper/reducer";
const { Screen, Navigator } = createBottomTabNavigator();

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function loadCourses() {
      try {
        dispatch({type:'SET_LOADING', payload: true})
        
        const data = await AsyncStorage.getItem(ASYNC_STORAGE);
        if (data) {
          const obj = JSON.parse(data);
          dispatch({type:"SET_IS_LOGGED_IN", payload:obj.isLoggedIn})
        }
        const authors = await getAllAuthors();
        const books = await getAllBooks();
        const publishers = await getAllPublishers();
        const catalogs = await getAllCatalogs();
        const members = await getAllMembers();
        const transactions = await getAllTransaction();

        dispatch({ type: "SET_AUTHORS", payload: authors });
        dispatch({ type: "SET_BOOKS", payload: books });
        dispatch({ type: "SET_PUBLISHERS", payload: publishers });
        dispatch({ type: "SET_CATALOGS", payload: catalogs });
        dispatch({ type: "SET_MEMBERS", payload: members });
        dispatch({ type: "SET_TRANSACTIONS", payload: transactions });
      } catch (error) {}
      dispatch({ type: "SET_LOADING", payload: false });
    }
    loadCourses();
  }, []);

  if (state.loading) {
    return <ActivityIndicator size={"large"} />;
  }

  if (!state.isLoggedIn) {
    return <Login setIsLoggedIn={(value) => dispatch({ type: "SET_IS_LOGGED_IN", payload: value })} />;
  }
  

  return (
    <GestureHandlerRootView>
      <GlobalContext.Provider
      value={{state, dispatch}}
    >
      <NavigationContainer>
        <Navigator initialRouteName="Books">
          <Screen
            name="Books"
            component={Books}
            options={{
              title: "Books",
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="bookshelf"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
          <Screen
            name="Authors"
            component={Authors}
            options={{
              title: "Authors",
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
          <Screen
            name="Publishers"
            component={Publishers}
            options={{
              title: "Publishers",
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="publish"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
          <Screen
            name="Members"
            component={Memebrs}
            options={{
              title: "Memebers",
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="wallet-membership"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
        </Navigator>
      </NavigationContainer>
    </GlobalContext.Provider>
    </GestureHandlerRootView>
    
  );
}
