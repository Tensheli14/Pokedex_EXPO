import { Image, StyleSheet, Text, View } from "react-native";

const DRACAUFEU_ARTWORK =
  "https://raw.githubusercontent.com/PokeAPI/sprites" +
  "/master/sprites/pokemon/other/official-artwork/6.png";

export default function Profil() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MILLOT Elisa</Text>
      <Text style={styles.pseudo}>Tenshi</Text>
      <Text style={styles.label}>Pokémon préféré: </Text>
      <Image
        source={{ uri: DRACAUFEU_ARTWORK }}
        style={styles.image}
        accessibilityLabel="Dracaufeu, Pokémon numéro 6"
      />
      <Text style={styles.pokemon}>Dracaufeu</Text>
      <Text style={styles.number}>#6</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  pseudo: {
    marginTop: 4,
    marginBottom: 28,
    color: "#555",
    fontSize: 18,
  },
  label: {
    color: "#555",
    fontSize: 16,
  },
  image: {
    width: 220,
    height: 220,
    marginTop: 8,
  },
  pokemon: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: "bold",
  },
  number: {
    marginTop: 4,
    color: "#777",
    fontSize: 18,
    textAlign: "center",
  },
});
