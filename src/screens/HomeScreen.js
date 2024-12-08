import React, { useState } from "react";
import {
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query"; // Import useQuery and useQueryClient
import api from "../api/posts"; // Assuming you have the api setup
import Post from "../components/Post";

const HomeScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const queryClient = useQueryClient(); // Create a query client instance to invalidate queries

  // Fetch posts with useQuery
  const {
    data: posts = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts", searchTerm], // Query key, used to uniquely identify the query
    queryFn: async () => {
      const fetchedPosts = await api.getPosts(); // Fetch all posts
      if (searchTerm) {
        // If there's a search term, filter the posts by title
        return fetchedPosts.filter((post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      return fetchedPosts; // Return all posts if no search term
    },
    onError: (err) => {
      console.error("Error fetching posts:", err);
    },
  });

  const handleDeletePost = async (id) => {
    try {
      await api.deletePost(id); // Delete post from API
      queryClient.invalidateQueries(["posts"]); // Invalidate the "posts" query to trigger a refetch
      console.log("Post deleted successfully");
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await api.deleteComment(commentId); // Delete comment from API
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  if (isLoading) {
    return <Text>Loading posts...</Text>;
  }

  if (isError) {
    return <Text>Error loading posts: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search posts..."
        value={searchTerm}
        onChangeText={setSearchTerm} // Update search term state
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("AddPost")}
        style={styles.addButton}
      >
        <Text style={styles.buttonText}>Add New Post</Text>
      </TouchableOpacity>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <Post
            post={item}
            onDelete={handleDeletePost} // Pass handleDeletePost function
            onDeleteComment={handleDeleteComment}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default HomeScreen;
