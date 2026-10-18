import { ScrollView, Text, StyleSheet } from "react-native";
import PokemonCard from "../components/PokemonCard.js";
import Titre from "../components/Titre.js";

const POKEMONS = [
  { number: 1, name: "Bulbizarre", type: "Plante" },
  { number: 4, name: "Salamèche", type: "Feu" },
  { number: 7, name: "Carapuce", type: "Eau" },
  { number: 25, name: "Pikachu", type: "Électrik" },
  { number: 37, name: "Goupix", type: "Feu" },
  { number: 43, name: "Mystherbe", type: "Plante" },
];

//POKEMONS.map((pokemon) => console.log(pokemon.name));
//const feu = POKEMONS.filter((pokemon) => pokemon.type === "Feu");

//POKEMONS.map((pokemon) => console.log(`${pokemon.number} est de type ${pokemon.name}`));

export default function Index() {
  return (
  <ScrollView style={styles.container}>
    <Titre/>
    
    <Text style={styles.count}>
        Nombre de Pokémon : {POKEMONS.length}
      </Text>

      {POKEMONS.map((pokemon) => (
        <PokemonCard
          key={pokemon.number}
          number={pokemon.number}
          name={pokemon.name}
          type={pokemon.type}
        />
      ))}
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
  });
