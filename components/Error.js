// components/Error.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Error() {
  return (
    // Conteneur qui centre le message d'erreur
    <View style={styles.errorContainer}>
      {/* Texte du message d'erreur */}
      <Text style={styles.errorText}>
        💥 There was an error fetching questions.{" "}
        {/* L'emoji ajoute un peu de visuel */}
      </Text>
      {/* On pourrait ajouter ici un bouton "Réessayer" plus tard */}
    </View>
  );
}

// Styles pour le composant d'erreur
const styles = StyleSheet.create({
  errorContainer: {
    flex: 1, // Prend l'espace disponible
    justifyContent: "center", // Centre verticalement
    alignItems: "center", // Centre horizontalement
    padding: 20, // Espace autour du texte
    width: "100%",
  },
  errorText: {
    color: "#FF6B6B", // Couleur rouge pour indiquer une erreur
    fontSize: 16, // Taille du texte
    textAlign: "center", // Centre le texte s'il prend plusieurs lignes
    fontWeight: "500", // Un peu plus gras
  },
});

// Exporte le composant
export default Error;
