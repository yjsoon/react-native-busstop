import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=83139";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(BUSSTOP_URL)
      .then((response) => response.json())
      .then((responseData) => console.log(responseData));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus arrival time:</Text>
      <Text style={styles.arrivalTime}>
        {loading ? <ActivityIndicator size="large" color="#aa8" /> : "Loaded!"}
      </Text>
      <TouchableOpacity onPress={null} style={styles.button}>
        <Text style={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  arrivalTime: {
    fontSize: 36,
    marginBottom: 24,
  },
  button: {
    backgroundColor: "green",
    padding: 24,
    borderRadius: 6,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
