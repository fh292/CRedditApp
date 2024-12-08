import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Comment from "./Comment";

const Post = ({
  post,
  onDelete,
  onAddComment,
  onDeleteComment,
  navigation,
}) => {
  return (
    <View style={styles.postContainer}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.description}>{post.description}</Text>
      <TouchableOpacity
        onPress={() => onDelete(post.id)} // Trigger the delete function
        style={styles.deleteButton}
      >
        <Text style={styles.buttonText}>Delete Post</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("AddComment", { postId: post.id })}
        style={styles.addCommentButton}
      >
        <Text style={styles.buttonText}>Add Comment</Text>
      </TouchableOpacity>
      {post.comments &&
        post.comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onDelete={() => onDeleteComment(comment.id)}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: "#ff4444",
    padding: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
  addCommentButton: {
    backgroundColor: "#4444ff",
    padding: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default Post;
