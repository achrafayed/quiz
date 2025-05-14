import React, { useEffect, useRef } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

const Loader = () => {
  return (
    <View>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    width: 120,
    height: 20,
    backgroundColor: "#ddd",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
  },
});

export default Loader;
