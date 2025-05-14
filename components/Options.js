// components/Options.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// Reçoit onSelectAnswer au lieu de dispatch
function Options({ question, onSelectAnswer, answer }) {
  const hasAnswered = answer !== null;

  return (
    <View style={styles.optionsContainer}>
      {question.options.map((option, index) => {
        const isSelected = index === answer;
        const isCorrect = index === question.correctOption;
        const isWrong = isSelected && !isCorrect;

        const buttonStyle = [
          styles.optionButton,
          hasAnswered && isCorrect && styles.correctOption,
          hasAnswered && isWrong && styles.incorrectOption,
        ];

        const textStyle = [
          styles.optionText,
          hasAnswered && (isCorrect || isWrong) && styles.optionTextAnswered,
        ];

        return (
          <TouchableOpacity
            key={option}
            style={buttonStyle}
            disabled={hasAnswered}
            // Appelle onSelectAnswer avec l'index cliqué
            onPress={() => onSelectAnswer(index)}
            activeOpacity={0.7}
          >
            <Text style={textStyle}>{option}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  optionsContainer: {
    width: "100%",
    marginTop: 20,
  },
  optionButton: {
    backgroundColor: "#FF9F43",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 100,
    marginBottom: 12,
    alignItems: "center",
  },
  optionText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "500",
  },
  optionTextAnswered: {
    fontWeight: "bold",
  },
  correctOption: {
    backgroundColor: "#1dd1a1",
    borderColor: "#1dd1a1",
    borderWidth: 2,
  },
  incorrectOption: {
    backgroundColor: "#ff6b6b",
    borderColor: "#ff6b6b",
    borderWidth: 2,
  },
});

export default Options;
