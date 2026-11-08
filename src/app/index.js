import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import Aide from "../components/Aide";
import PokemonCard from "../components/PokemonCard";
import Titre from "../components/Titre";
import POKEMONS from "../data/pokemons";

export default function Index() {
  const [count, setCount] = useState(0);
  const [captured, setCaptured] = useState([]);
  const [capturesSeulement, setCapturesSeulement] = useState(false);
  const [search, setSearch] = useState("");
  const visibles = POKEMONS.filter((pokemon) =>
    (!capturesSeulement || captured.includes(pokemon.number)) &&
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );
  const basculerCapture = (numero) => {
    setCaptured((actuels) =>
      actuels.includes(numero)
        ? actuels.filter((n) => n !== numero)
        : [...actuels, numero]
    );
  };

  return (
    //<ScrollView style={styles.container}>
    <View style={styles.container}>
      <Titre />

      <Text style={styles.count}>
        Vous avez : {count} Poké Ball{count > 1 ? "s" : ""} ; {captured.length} capture{captured.length > 1 ? "s" : ""}
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

      <Pressable
        style={styles.button}
        onPress={() => setCapturesSeulement(!capturesSeulement)}
      >
        <Text style={styles.buttonText}>
          {capturesSeulement ? "Tout afficher" : "Mes captures"}
        </Text>
      </Pressable>

      <TextInput
        style={styles.input}
        placeholder="Rechercher un Pokémon"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={visibles}
        extraData={captured}
        keyExtractor={(pokemon) => pokemon.number.toString()}
        numColumns={2}
        contentContainerStyle={{ padding: 8, gap: 6  }}
        columnWrapperStyle={{ gap: 12 }}
        renderItem={({ item: pokemon }) => (
          <PokemonCard
            number={pokemon.number}
            name={pokemon.name}
            type={pokemon.type}
            captured={captured.includes(pokemon.number)}
            onCapture={() => basculerCapture(pokemon.number)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.count}>
            {capturesSeulement
              ? "Vous n'avez encore rien capturé"
              : "Aucun Pokémon trouvé"}
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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