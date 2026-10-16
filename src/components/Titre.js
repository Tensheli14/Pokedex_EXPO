import { StyleSheet, Text } from "react-native";

export default function Titre() {
  return (
    <Text style={styles.titre}>Mon POKEDEX</Text>
  );
}

const styles = StyleSheet.create({
  titre: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
});
``