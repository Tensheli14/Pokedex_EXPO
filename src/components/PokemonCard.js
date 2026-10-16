import { Image, StyleSheet, Text, View } from "react-native";

const ARTWORK =
  "https://raw.githubusercontent.com/PokeAPI/sprites" +
  "/master/sprites/pokemon/other/official-artwork/";

export default function PokemonCard({ number, name, type }) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: `${ARTWORK}${number}.png` }}
        style={styles.image}
      />

      <Text style={styles.number}>#{number}</Text>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.type}>{type}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 8,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 5,
  },

  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },

  badge: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    color: "white",
    fontWeight: "bold",
  },

  number: {
    color: "#888",
    fontSize: 14,
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
  },

  type: {
    marginTop: 5,
    color: "#666",
    fontSize: 16,
  },
});