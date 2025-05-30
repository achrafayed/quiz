import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView, Platform } from "react-native";

import Header from "./components/Header";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";

export default function App() {
  useEffect(() => {
    fetch("http://10.0.2.2:9000/questions")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setQuestions(data);
        setStatus("ready");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setStatus("error");
      });
  }, []);

  const [questions, setQuestions] = useState([]);
  const [status, setStatus] = useState("loading"); // 'loading', 'error', 'ready', 'active', 'finished'
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState(null); // Index de la réponse choisie
  const [points, setPoints] = useState(0);

  // --- Variables dérivées ---
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((sum, q) => sum + q.points, 0);

  // --- Fonctions de gestion d'état ---
  function handleStartQuiz() {
    setStatus("active");
    // setSecondsRemaining(numQuestions * SECS_PER_QUESTION); // Pour Séance 2
  }

  function handleSelectAnswer(selectedIndex) {
    if (answer !== null) return; // Empêche de répondre plusieurs fois

    const question = questions[index]; // Obtient la question actuelle
    setAnswer(selectedIndex); // Met à jour la réponse sélectionnée

    // Met à jour les points en fonction de la réponse
    if (selectedIndex === question.correctOption) {
      setPoints((currentPoints) => currentPoints + question.points);
    }
  }

  function handleNextQuestion() {
    setIndex((currentIndex) => currentIndex + 1); // Passe à l'index suivant
    setAnswer(null); // Réinitialise la réponse pour la nouvelle question
  }

  function handleFinishQuiz() {
    // Sera appelée par NextButton sur la dernière question
    setStatus("finished");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.mainContent}>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          // Passe numQuestions et la fonction handleStartQuiz
          <StartScreen
            numQuestions={numQuestions}
            onStartQuiz={handleStartQuiz}
          />
        )}
        {status === "active" && (
          <>
            <Question
              question={questions[index]}
              // Passe la fonction handleSelectAnswer et l'état 'answer'
              onSelectAnswer={handleSelectAnswer}
              answer={answer}
            />

            <View style={styles.buttonContainer}>
              <NextButton
                // Passe les fonctions pour 'suivant' et 'terminer'
                onNextQuestion={handleNextQuestion}
                onFinishQuiz={handleFinishQuiz} // Nouvelle prop
                // Passe les états nécessaires pour la logique du bouton
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D2D2D",
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  buttonContainer: {
    width: "80%",
    alignSelf: "center",
    marginTop: 20,
    alignItems: "flex-end",
  },
});
