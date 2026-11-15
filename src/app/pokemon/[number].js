import { Image, StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import POKEMONS from "../../data/pokemons";

const ARTWORK =
  "https://raw.githubusercontent.com/PokeAPI/sprites" +
  "/master/sprites/pokemon/other/official-artwork/";

export default function FichePokemon() {
  const { number } = useLocalSearchParams();
  const numero = Array.isArray(number) ? number[0] : number;
  const pokemon = POKEMONS.find((item) => item.number === Number(numero));

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: pokemon?.name ?? "Pokémon introuvable" }} />
      {pokemon ? (
        <>
          <Image
            source={{ uri: `${ARTWORK}${pokemon.number}.png` }}
            style={styles.image}
            accessibilityLabel={`Illustration de ${pokemon.name}`}
          />
          <Text style={styles.number}>#{pokemon.number}</Text>
          <Text style={styles.name}>{pokemon.name}</Text>
          <Text style={styles.type}>{pokemon.type}</Text>
        </>
      ) : (
        <Text style={styles.notFound}>Ce Pokémon n'existe pas dans le Pokédex.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: 260,
    height: 260,
    marginTop: 32,
    marginBottom: 20,
  },
  number: {
    color: "#777",
    fontSize: 18,
  },
  name: {
    marginTop: 6,
    fontSize: 30,
    fontWeight: "bold",
  },
  type: {
    marginTop: 14,
    paddingHorizontal: 18,
    paddingVertical: 8,
    overflow: "hidden",
    borderRadius: 20,
    backgroundColor: "#e5e0d5",
    fontSize: 16,
    fontWeight: "600",
  },
  notFound: {
    marginTop: 32,
    color: "#555",
    fontSize: 16,
    textAlign: "center",
  },
});
