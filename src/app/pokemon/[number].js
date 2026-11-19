import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

const API = "https://pokeapi.co/api/v2/pokemon/";
const API_ESPECE = "https://pokeapi.co/api/v2/pokemon-species/";

export default function FichePokemon() {
  const { number } = useLocalSearchParams();
  const numero = Array.isArray(number) ? number[0] : number;
  const identifiant = Number(numero);
  const [pokemon, setPokemon] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    let actif = true;

    async function charger() {
      try {
        if (!Number.isInteger(identifiant) || identifiant < 1) {
          throw new Error("Le numéro du Pokémon est invalide.");
        }

        const [reponse, reponseEspece] = await Promise.all([
          fetch(`${API}${identifiant}`),
          fetch(`${API_ESPECE}${identifiant}`),
        ]);
        if (!reponse.ok || !reponseEspece.ok) {
          const statut = !reponse.ok ? reponse.status : reponseEspece.status;
          throw new Error(`La PokéAPI a répondu avec le statut ${statut}.`);
        }

        const [donnees, donneesEspece] = await Promise.all([
          reponse.json(),
          reponseEspece.json(),
        ]);
        if (
          !Array.isArray(donneesEspece.names) ||
          !Array.isArray(donnees.types) ||
          donnees.types.length === 0
        ) {
          throw new Error("Les informations du Pokémon sont incomplètes.");
        }

        const nomFrancais = donneesEspece.names.find(
          (nom) => nom.language.name === "fr"
        )?.name;
        if (typeof nomFrancais !== "string") {
          throw new Error("Le nom français du Pokémon est indisponible.");
        }

        if (actif) {
          setPokemon({ ...donnees, frenchName: nomFrancais });
        }
      } catch (error) {
        if (actif) {
          setErreur(
            error instanceof Error
              ? `Impossible de charger le Pokémon : ${error.message}`
              : "Impossible de charger le Pokémon."
          );
        }
      } finally {
        if (actif) {
          setChargement(false);
        }
      }
    }

    charger();
    return () => {
      actif = false;
    };
  }, [identifiant]);

  const nom = pokemon
    ? pokemon.frenchName.charAt(0).toUpperCase() + pokemon.frenchName.slice(1)
    : "";
  const image =
    pokemon?.sprites?.other?.["official-artwork"]?.front_default ??
    pokemon?.sprites?.front_default;
  const type = pokemon?.types?.[0]?.type?.name;
  const taille = pokemon
    ? `${(pokemon.height / 10).toLocaleString("fr-FR")} m`
    : "";
  const poids = pokemon
    ? `${(pokemon.weight / 10).toLocaleString("fr-FR")} kg`
    : "";

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: nom || (chargement ? "Chargement..." : "Pokémon"),
        }}
      />
      {chargement ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#E53935" />
          <Text style={styles.loadingText}>Chargement du Pokémon...</Text>
        </View>
      ) : pokemon ? (
        <>
          {image ? (
            <Image
              source={{ uri: image }}
              style={styles.image}
              accessibilityLabel={`Illustration de ${nom}`}
            />
          ) : (
            <Text style={styles.notFound}>Image indisponible.</Text>
          )}
          <Text style={styles.number}>#{pokemon.id}</Text>
          <Text style={styles.name}>{nom}</Text>
          <Text style={styles.type}>{type}</Text>
          <Text style={styles.measure}>Taille : {taille}</Text>
          <Text style={styles.measure}>Poids : {poids}</Text>
        </>
      ) : (
        <Text style={styles.notFound}>
          {erreur || "Ce Pokémon n'a pas été trouvé."}
        </Text>
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
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 12,
    color: "#555",
    fontSize: 16,
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
    textTransform: "capitalize",
  },
  measure: {
    marginTop: 12,
    color: "#555",
    fontSize: 18,
  },
  notFound: {
    marginTop: 32,
    color: "#555",
    fontSize: 16,
    textAlign: "center",
  },
});
