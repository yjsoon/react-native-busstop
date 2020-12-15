import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const BUSSTOP_NUMBER = "83139";
const BUS_NUMBER = "155";
const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=" + BUSSTOP_NUMBER;
const LOADING_INTERVAL = 60000;

export default function App() {
  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState("");

  function loadBusStopData() {
    setLoading(true);

    fetch(BUSSTOP_URL)
      .then((response) => response.json())
      .then((responseData) => {
        //console.log(responseData)
        const myBus = responseData.services.filter(
          (item) => item.no === BUS_NUMBER
        )[0];
        console.log(myBus);
        const duration_s = Math.floor(myBus.next["duration_ms"] / 1000); // same as myBus.next.duration_ms
        const minutes = Math.floor(duration_s / 60);
        const seconds = duration_s % 60;
        if (duration_s < 0) {
          setArrival(`Bus has arrived`);
        } else {
          setArrival(`${minutes} minutes and ${seconds} seconds`);
        }
        setLoading(false);
      });
  }

  useEffect(() => {
    const interval = setInterval(loadBusStopData, LOADING_INTERVAL);
    loadBusStopData(); // need to call it once at the start

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus arrival time:</Text>
      <Text style={styles.arrivalTime}>
        {loading ? <ActivityIndicator size="large" color="#aa8" /> : arrival}
      </Text>
      <TouchableOpacity onPress={loadBusStopData} style={styles.button}>
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
    textAlign: "center",
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
