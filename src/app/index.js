import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native";

import Aide from "../components/Aide";
import PokemonCard from "../components/PokemonCard";
import Titre from "../components/Titre";

const POKEMONS = [
  { number: 1, name: "Bulbizarre", type: "Plante" },
  { number: 4, name: "Salamèche", type: "Feu" },
  { number: 7, name: "Carapuce", type: "Eau" },
  { number: 25, name: "Pikachu", type: "Électrik" },
  { number: 37, name: "Goupix", type: "Feu" },
  { number: 43, name: "Mystherbe", type: "Plante" },
];

export default function Index() {
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const [feuUniquement, setFeuUniquement] = useState(false);
  const pokemonsAffiches = feuUniquement
    ? POKEMONS.filter((pokemon) => pokemon.type === "Feu")
    : POKEMONS;
  const visibles = pokemonsAffiches.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <Titre />

      <Text style={styles.count}>
        Vous avez : {count} Poké Ball{count > 1 ? "s" : ""}
      </Text>

      <View style={styles.buttonsContainer}>
        <Pressable style={styles.button} onPress={() => setCount(count + 1)}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => setCount(Math.max(0, count - 1))}>
          <Text style={styles.buttonText}>-</Text>
        </Pressable>

        <Pressable style={[styles.button, styles.resetButton]} onPress={() => setCount(0)}>
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>
      </View>

      <Text style={styles.count}>
        Nombre de Pokémon : {POKEMONS.length}
      </Text>

      <Aide />

      <Pressable style={styles.button} onPress={() => setFeuUniquement(!feuUniquement)}>
        <Text style={styles.buttonText}>
          {feuUniquement ? "Tout afficher" : "Seulement le type Feu"}
        </Text>
      </Pressable>

      <TextInput
        style={styles.input}
        placeholder="Rechercher un Pokémon"
        value={search}
        onChangeText={setSearch}
      />

      {visibles.length === 0 ? (
        <Text style={styles.count}>Aucun Pokémon trouvé</Text>
      ) : (
        visibles.map((pokemon) => (
        <PokemonCard
          key={pokemon.number}
          number={pokemon.number}
          name={pokemon.name}
          type={pokemon.type}
        />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
  },

  count: {
    textAlign: "center",
    marginBottom: 15,
    fontSize: 18,
    color: "#555",
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#E53935",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },

  resetButton: {
    backgroundColor: "#555",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },

  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#000e38",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    margin: 15,
    fontSize: 16,
  },
});