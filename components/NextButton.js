// components/NextButton.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

// Reçoit onNextQuestion et onFinishQuiz au lieu de dispatch
function NextButton({
  onNextQuestion,
  onFinishQuiz,
  answer,
  index,
  numQuestions,
}) {
  if (answer === null) return null;

  const isLastQuestion = index === numQuestions - 1;

  // Détermine quelle fonction appeler au clic
  const handlePress = isLastQuestion ? onFinishQuiz : onNextQuestion;
  const buttonText = isLastQuestion ? "Finish" : "Next";

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handlePress} // Appelle la fonction appropriée
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
}

// Styles (inchangés)
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#1AB6CF",
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 100,
    alignSelf: "flex-end",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NextButton;
