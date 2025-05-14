// components/Question.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Options from "./Options";

// Reçoit onSelectAnswer au lieu de dispatch
function Question({ question, onSelectAnswer, answer }) {
  return (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{question.question}</Text>

      <Options
        question={question}
        onSelectAnswer={onSelectAnswer}
        answer={answer}
      />
    </View>
  );
}

// Styles (inchangés)
const styles = StyleSheet.create({
  questionContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  questionText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
});

export default Question;
