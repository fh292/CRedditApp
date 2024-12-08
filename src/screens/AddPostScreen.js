import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query"; // Import useMutation hook
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { addPost } from "../api/posts"; // Correct import path

const AddPostScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Use useMutation hook to handle post submission
  const { mutate, isLoading, isSuccess, isError, error } = useMutation({
    mutationKey: ["addPost"],
    mutationFn: () => addPost(title, description), // Use local state for title and description
    onSuccess: () => {
      console.log("Post added successfully");
      navigation.goBack(); // Go back after successful submission
    },
    onError: (error) => {
      console.error("Error adding post:", error);
    },
  });

  // Handle submit logic
  const handleSubmit = () => {
    if (!title || !description) {
      alert("Please fill in both fields.");
      return;
    }

    mutate(); // Trigger the mutation
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity
        onPress={handleSubmit}
        style={styles.submitButton}
        disabled={isLoading} // Disable button while loading
      >
        {isLoading ? (
          <Text style={styles.buttonText}>Submitting...</Text>
        ) : (
          <Text style={styles.buttonText}>Submit Post</Text>
        )}
      </TouchableOpacity>

      {isError && <Text style={styles.errorText}>Error: {error.message}</Text>}
      {isSuccess && (
        <Text style={styles.successText}>Post successfully added!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
  successText: {
    color: "green",
    textAlign: "center",
    marginTop: 10,
  },
});

export default AddPostScreen;
