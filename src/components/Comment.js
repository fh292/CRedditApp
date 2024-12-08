import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Comment = ({ comment, onDelete }) => {
  return (
    <View style={styles.commentContainer}>
      <Text style={styles.username}>{comment.username}</Text>
      <Text style={styles.commentText}>{comment.comment}</Text>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    backgroundColor: "#e0e0e0",
    padding: 5,
    marginTop: 5,
    borderRadius: 3,
  },
  username: {
    fontWeight: "bold",
  },
  commentText: {
    marginTop: 2,
  },
  deleteButton: {
    backgroundColor: "#ff4444",
    padding: 3,
    borderRadius: 3,
    marginTop: 3,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default Comment;
