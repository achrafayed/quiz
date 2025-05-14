import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

export default function Header() {
  return (
    <View style={styles.header}>
      <Image
        source={require("../assets/pngwing.com.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.headerTitle}>THE REACT NATIVE QUIZ</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Centre horizontalement
    paddingVertical: 20,
    marginBottom: 20,
    width: "100%",
  },
  logo: {
    width: 80,
    height: 80,
    marginRight: 15,
  },
  headerTitle: {
    color: "#e0e0e0",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 3, // Espace entre les lettres comme dans l'image
  },
});
