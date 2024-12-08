import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/HomeScreen";
import AddPostScreen from "../../screens/AddPostScreen";
import AddCommentScreen from "../../screens/AddCommentScreen";

const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Reddit" }}
      />
      <Stack.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{ title: "Add New Post" }}
      />
      <Stack.Screen
        name="AddComment"
        component={AddCommentScreen}
        options={{ title: "Add Comment" }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;

const styles = StyleSheet.create({});
