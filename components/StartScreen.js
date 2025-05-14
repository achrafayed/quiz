// components/StartScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

function StartScreen({ numQuestions, onStartQuiz }) {
  return (
    <View style={styles.startContainer}>
      <Text style={styles.title}>Bienvenue au quiz React !</Text>
      <Text style={styles.subtitle}>
        {numQuestions} questions pour tester votre maîtrise de React Native
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={onStartQuiz} // Appelle la fonction passée en prop
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Commencer</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles (inchangés)
const styles = StyleSheet.create({
  startContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#E0E0E0",
    marginBottom: 15,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#B0B0B0",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FF9F43",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 100,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "500",
  },
});

export default StartScreen;
