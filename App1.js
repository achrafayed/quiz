// App.js
import React, { useEffect, useState } from "react"; // Import useState instead of useReducer
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";

import Header from "./components/Header";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
// Importez les autres composants si nécessaire

// Données JSON (inchangées)
const questionsData = [
  // ... (collez TOUTES vos questions JSON ici) ...
  {
    question: "When will an effect run if it doesn't have a dependency array?",
    options: [
      "Only when the component mounts",
      "Only when the component unmounts",
      "The first time the component re-renders",
      "Each time the component is re-rendered",
    ],
    correctOption: 3,
    points: 20,
  },
];

// SECS_PER_QUESTION sera utile en Séance 2
// const SECS_PER_QUESTION = 30;

export default function App() {
  // --- State Management avec useState ---
  const [questions, setQuestions] = useState([]);
  const [status, setStatus] = useState("loading"); // 'loading', 'error', 'ready', 'active', 'finished'
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState(null); // Index de la réponse choisie
  const [points, setPoints] = useState(0);
  // const [highscore, setHighscore] = useState(0); // Futur
  // const [secondsRemaining, setSecondsRemaining] = useState(null); // Séance 2

  // --- Variables dérivées ---
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((sum, q) => sum + q.points, 0);

  // --- Effet pour charger les données ---
  useEffect(function () {
    const timer = setTimeout(() => {
      try {
        if (questionsData && questionsData.length > 0) {
          setQuestions(questionsData); // Mise à jour de l'état questions
          setStatus("ready"); // Mise à jour de l'état status
        } else {
          throw new Error("No questions data provided");
        }
      } catch (err) {
        setStatus("error"); // Mise à jour de l'état status en cas d'erreur
        console.error("Data loading error:", err);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []); // Le tableau de dépendances vide assure que l'effet ne s'exécute qu'une fois

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

  // --- Rendu ---
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

// --- Styles (inchangés par rapport à la version useReducer) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D2D2D",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
